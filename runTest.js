const https = require('https');
const fs = require('fs');
const test_file_name = "test_file_001";
	
var config_file = require(__dirname + "/config.json");
var calculate_js = require(__dirname + "/calculate.js");
var input = require(__dirname + "/"+test_file_name+'input.json');

var postData = JSON.stringify({
    config_file: config_file,
    calculate_js: calculate_js,
    input:input
});

var options = {
  hostname: 'https://dev.skyciv.com',
  port: 8088,
  path: '/run',
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
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(postData);
req.end();