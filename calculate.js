module.exports = function (input_json) {

    let {A, B, shape, d} = input_json;
    ReportHelpers.printInputSummary(); //recommended, so you can confirm the input and units. This also sets up your REPORT and VARIABLES which you can use

    // ======== AREA CALCULATIONS
    ReportHelpers.heading("Let's do some Simple Calculations", 1);
    ReportHelpers.print("Ref 1.2.3", "Area Calculations");

   // ReportHelpers.print(null,JSON.stringify(VARIABLES));

    let area;
    if (shape == "Rectangular") {
        area = A*B;
        REPORT.block.new();
            REPORT.block.addCalculation('[math] Area = A * B [math]');
            REPORT.block.addCalculation('[math] = '+A+' * ' +  B + '[math]');
            REPORT.block.addCalculation('[math] = ' +area.toFixed(3) + "mm^2[math]");
        REPORT.block.finish();
    } if (shape == "Circular") {
        //option two is to do it all manually
        area = Math.PI* Math.pow(d/2, 2);
        REPORT.block.new();
            REPORT.block.addCalculation('[math] Area = \\pi r^2 [math]');
            REPORT.block.addCalculation('[math] = \\pi ('+(d/2)+')^2 [math]');
            REPORT.block.addCalculation('[math] = ' +area.toFixed(3) + "mm^2[math]");
        REPORT.block.finish();
    }
    
    //maybe we have a maximum area, and want to print a utility ratio?
    const max_area = 2000;
    ReportHelpers.print(null, "Maximum Area = "+ max_area);
    let utility_ratio = ReportHelpers.runFormula("Utility_{area} = "+area+" / "+max_area);
    ReportHelpers.printStatus(utility_ratio);


    //Display results in this format to display in the UI
    var output = {
        "pass": true,
        "notes": "some other notes or warnings",
        "report": REPORT,
        "results": {
            "Total Area": {
                "value": area,
                "units": "m^2",
                "info": "Give more details on your result"
            },
            "Bending Moment Utility": {
                "value": utility_ratio,
                "units": "utility",
                "info": "Give more details on your result"
            },
            "Shear Force Utility": {
                "value": utility_ratio,
                "units": "utility",
                "info": "Give more details on your result"
            },
            "Shear Force Capacity": {
                "value": 98,
                "units": "kN",
                "info": "Give more details on your result"
            }
        }
    }

    return output;

}