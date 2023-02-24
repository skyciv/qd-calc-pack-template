import fs from "fs";
import url from "url";
import path from "path";
import chalk from "chalk";
import request from "request";
import logSymbols from "log-symbols";

// Globals
const log = console.log;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define test file
const test_file_arg = process.argv[2];
const test_file_name = test_file_arg != undefined ? test_file_arg : "aisc_example_1";

const checkOutputMatches = function (output) {
	let expectedOutputPath =
		__dirname + "/test_files/" + test_file_name + "/expected_return.json";
	if (fs.existsSync(expectedOutputPath)) {
		let expected_output = JSON.parse(
			fs.readFileSync(expectedOutputPath, "utf8")
		);
		let results_correct = true;

		Object.keys(expected_output).forEach((elem) => {
			let expected_value = expected_output[elem];
			let results_value = output[elem];
			if (output[elem] == undefined) {
				results_correct = false;
				log(logSymbols.warning, "Output missing key:", elem);
			} else if (output[elem].value == undefined) {
				results_correct = false;
				log(logSymbols.warning, "Output missing value for key:", elem);
			} else if (expected_value.value != results_value.value) {
				results_correct = false;
				log(
					logSymbols.warning,
					"Output value for key:",
					elem,
					"did not match expected result"
				);
			}
		});

		return results_correct;
	} else {
		log(
			logSymbols.warning,
			chalk.whiteBright("No expected_return.json provided.")
		);
		return false;
	}
};

const saveTempOutput = function (input, output) {
	let tempDir = __dirname + "/temp/";
	fs.mkdirSync(tempDir, { recursive: true });
	fs.writeFileSync(tempDir + "/input.json", input);
	if (output) fs.writeFileSync(tempDir + "/output.json", JSON.stringify(output));
	log(logSymbols.info, chalk.whiteBright("Saved latest output to temp directory"));
}

const handleSuccess = function (input, output) {

	log(logSymbols.success, chalk.greenBright("Test Script Ran Successfully"));
	let results = output.results;
	let results_correct = checkOutputMatches(results);

	if (results_correct) {
		log(logSymbols.success, chalk.greenBright("Results match return.json"));
	} else {
		log(logSymbols.error, chalk.redBright("Error: Results do not return.json, see warning above"));
	}

	saveTempOutput(input, results);
	return;
};

const handleError = function (input, output) {
	log(logSymbols.error, chalk.redBright("Test Script Failed"));
	let results = output.msg;
	saveTempOutput(input, results);
	return;
};

const runTest = function(test_file_name) {

	// Grab config.json, calculate.json and input
	const config_json = fs.readFileSync(__dirname + "/config.json", "utf8");
	const calculate_js = fs.readFileSync(__dirname + "/calculate.js", "utf8");
	const input = fs.readFileSync(__dirname + "/test_files/" + test_file_name + "/input.json", "utf8");
	const request_url = "https://platform.skyciv.com:8088/runTestScript";

	
	log(logSymbols.info, chalk.whiteBright("Running Test Script:"), chalk.blue(test_file_name));

	const payloadData = JSON.stringify({
		config_json: config_json,
		calculate_js: calculate_js,
		input_json: input,
	});

	return new Promise(function (resolve) {
		request.post(
			request_url,
			{ json: true, body: { payload: payloadData } },
			function (err, res, body) {
				if (!err && res.statusCode === 200) {
					log(chalk.greenBright(logSymbols.success, "Server Response Received"));
					if (body.status === 0) {
						handleSuccess(input, body);
					} else {
						handleError(input, body);
					}
					resolve();
				} else {
					log(chalk.redBright(logSymbols.error, "No Server Response"));
					log(err);
					resolve();
				}
			}
		);
	});
}

if (test_file_arg == "all") {
	fs.readdir(__dirname + "/test_files/", async function(err, filenames) {
		if (err) {
			log(
				logSymbols.error, 
				chalk.redBright("Failed to run all test files"), 
			);
			process.exit();
		} else {
			for (var test_file of filenames) {
				await runTest(test_file);
			}
		}
	});
} else if (fs.existsSync(__dirname + "/test_files/" + test_file_name)) {
	runTest(test_file_name);
} else {
	log(
		logSymbols.error, 
		chalk.redBright("File"), 
		chalk.whiteBright(test_file_name),
		chalk.redBright("does not exist in /test_files directory")
	);
	process.exit();
}
