
# How to build your own calc pack!
This repo is a good starter template to build your own calc pack that can be read by the Quick Design framework (dev.skyciv.com/quick-design). This calc pack will automatically function as:
- Build a standalone calculator really easily
- Integrate it with S3D
- Make it available via an API
- Automated UI and result displays
- Repurpose as a free tool


## Quick Start
To use this calc pack, clone the repo to your PC. Open the module and run `npm i` in your console. You can now run a sample calc by simply running the following command in the console:

`npm run verified_001`



## Components of the calc pack

File | Required | Description 
--- | --- | --- 
`calculate.js` | TRUE | This is where your calculation code goes. Program your design checks based off a few inputs (defined by the config.json) 
`config.json `| TRUE |This is the schema of your inputs, this will be read by the UI to generate the input form
`s3d_integration.js` | FALSE | If you want this calc pack to be available as an integrated module in S3D, you will need to write a function that compiles an array of input jsons
`ui.js` | FALSE | Want to run some custom code in the UI when your input changes (for instance changing some live graphics)
`test_files` | TRUE | These must be added if you want your calculations to be available in the platform! This is a QA process and makes testing a lot easier


