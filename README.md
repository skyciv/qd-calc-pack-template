# Quick Design Calc Pack Template

## How to build your own calc pack!
This repo is a good starter template to build your own calc pack that can be read by the SkyCiv Quick Design framework.

Calc packs built using this framework cab be automatically:

- Integrated with S3D.
- Available via an API.
- Used as a standalone calculator with reporting.
- Create a UI and result displays.
- Used as a free tool.

Once you have got the `config.json` and `calculate.js` of your calc pack you can run them in the framework. To upload and run these scripts you must access the calculator in "dev mode".

## Quick Design Modes

Mode | Example Link | Notes
--- | --- | ---
Free Tool Mode | https://platform.skyciv.com/free-quick-design | Redirects to /quick-design if logged in.
Calculator Mode | https://platform.skyciv.com/quick-design | 
Dev Tool Mode | https://platform.skyciv.com/dev/quick-design | Editor tab will only appear in this mode.

## Components of the calc pack

File | Required | Description 
--- | --- | --- 
`calculate.js` | TRUE | This is where your calculation code goes. Program your design checks based off a few inputs (defined by the config.json) 
`config.json `| TRUE |This is the schema of your inputs, this will be read by the UI to generate the input form
`s3d_integration.js` | FALSE | If you want this calc pack to be available as an integrated module in S3D, you will need to write a function that compiles an array of input jsons
`ui.js` | FALSE | Want to run some custom code in the UI when your input changes (for instance changing some live graphics)
`test_files` | TRUE | These must be added if you want your calculations to be available in the platform! This is a QA process and makes testing a lot easier


