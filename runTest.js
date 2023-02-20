//const https = require('https');
const fs = require('fs');
const request = require('request');


const test_file_name = "verified_001";


var config_file = fs.readFileSync(__dirname + "/config.json", 'utf8');
var calculate_js = fs.readFileSync(__dirname + "/calculate.js", 'utf8');
var input = fs.readFileSync(__dirname + "/test_files/"+test_file_name+'/input.json', 'utf8');
var s3d_model;
try {
  s3d_model = fs.readFileSync(__dirname + "/test_files/"+test_file_name+'/s3d_model.json', 'utf8');
} catch(e) {
  
}

var url = "https://dev.skyciv.com:8088/runTestScript";
//url = "https://skyciv.test:8087/runTestScript";
var postData = {
  config_file: config_file,
  calculate_js: calculate_js,
  input: input
};


request.post(url, {json: true, body: postData}, function(err, res, body) {
  console.log(err)
    if (!err && res.statusCode === 200) {
        funcTwo(body, function(err, output) {
            console.log(err, output);
        });
    }
});


function funcTwo(input, callback) {
    // process input
    console.log(input)
    callback(null, input);
}

/*
var postData = JSON.stringify({
    config_file: config_file,
    calculate_js: calculate_js,
    input:input
});

var options = {
  hostname: 'https://dev.skyciv.com',
  port: 8088,
  path: '/runTestScript',
  method: 'POST',
  headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       'Content-Length': postData.length
     }
};

var req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write("data",d);
  });
});

req.on('error', (e) => {
  console.error("error",e);
});

req.write(postData);
req.end();
*/