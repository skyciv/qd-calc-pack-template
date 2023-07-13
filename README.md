# Quick Design Calc Pack Template
## Building your own calc pack
This repo is a good starter template to build your own calc pack that can be read by the SkyCiv Quick Design framework.

Calc packs built using this framework can be automatically:

- Integrated with S3D.
- Available via an API.
- Used as a standalone calculator with reporting.
- Create a UI and result displays.
- Used as a free tool.

Once you have got the `config.json` and `calculate.js` of your calc pack you can run them in the framework. To upload and run these scripts you must access the calculator in "dev mode".

## Setting up this repo

Please run `npm i`
Add your api credentials to config.json

## Components of the calc pack

File | Required | Description 
--- | --- | --- 
`calculate.js` | TRUE | This is where your calculation code goes. Program your design checks based off a few inputs (defined by the config.json) 
`config.json `| TRUE |This is the schema of your inputs, this will be read by the UI to generate the input form
`s3d_integration.js` | FALSE | If you want this calc pack to be available as an integrated module in S3D, you will need to write a function that compiles an array of input jsons
`ui.js` | FALSE | Want to run some custom code in the UI when your input changes (for instance changing some live graphics)
`test_files` | TRUE | These must be added if you want your calculations to be available in the platform! This is a QA process and makes testing a lot easier

## Running Test Files

You can build and run test files you create for your repo using the command: 

`npm run test your_test_file`

If running an old version of node:

`npm run test_basic your_test_file`

Test files must be located in the **/test_files/** directory.
Create a new directory for each test file. Each test file will need both a `input.json` and an `expected_return.json`.

When running test files the values returned will be validated against the ones listed in that files `expected_return.json`. When successful the output should look like this:

![](https://skyciv.com/wp-content/uploads/2023/02/SuccessfulTestExample.png)

To run all tests please run `npm run test all` or `npm run test_basic all`

## Support

If you need help developing your calc pack please reach out to support@slyciv.com.

![](https://platform.skyciv.com/storage/images/logo-pack/SkyCiv_Logo_Dark_Poweredby.png#gh-dark-mode-only)
