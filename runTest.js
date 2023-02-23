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
const test_file_arg = log(process.argv[2])
const test_file_name = test_file_arg != undefined ? test_file_arg : "aisc_example_1";

// Grab config.json, calculate.json and input
const config_json = fs.readFileSync(__dirname + "/config.json", "utf8");
const calculate_js = fs.readFileSync(__dirname + "/calculate.js", "utf8");
const input = fs.readFileSync(__dirname + "/test_files/" + test_file_name + "/input.json", "utf8");

const request_url = "https://platform.skyciv.com:8088/runTestScript";

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
			} else if (expected_value !== results_value) {
				results_correct = false;
				log(
					logSymbols.warning,
					"Output value for key:",
					elem,
					" did not match expected result"
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

const saveTempOutput = function (output) {

	let tempDir = __dirname + "/temp/";
	fs.mkdirSync(tempDir, { recursive: true });

	fs.writeFileSync(tempDir + "/input.json", input);
	fs.writeFileSync(tempDir + "/output.json", JSON.stringify(output));

	log(logSymbols.info, chalk.whiteBright("Saved latest output to temp directory"));

}

const handleSuccess = function (output) {

	log(logSymbols.success, chalk.greenBright("Test Script Ran Successfully"));
	let results = output.results;
	let results_correct = checkOutputMatches(results);

	if (results_correct) {
		log(logSymbols.success, chalk.greenBright("Results match return.json"));
	} else {
		log(logSymbols.error, chalk.redBright("Error: Results do not return.json, see warning above"));
	}

	saveTempOutput(results);
};

const handleError = function (output) {
	log(logSymbols.error, chalk.redBright("Test Script Failed to Run"));
	let results = output.results;
	saveTempOutput(results);
};

const runTest = function() {
	
	log(logSymbols.info, chalk.whiteBright("Running Test Script:"), chalk.blue(test_file_name));

	const payloadData = JSON.stringify({
		config_json: config_json,
		calculate_js: calculate_js,
		input_json: input,
	});

	request.post(
		request_url,
		{ json: true, body: {payloadData} },
		function (err, res, body) {
			if (!err && res.statusCode === 200) {
				
				log(chalk.greenBright(logSymbols.success, "Server Response Received"));
	
				if (body.status === 0) {
					handleSuccess(body);
				} else {
					handleError(body);
				}
			}
		}
	);

}

runTest();