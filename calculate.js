module.exports = function (input_json) {

    let { a, b } = input_json;
    ReportHelpers.printInputSummary();

    ReportHelpers.heading("Hypotenuse Calculation", 2);
    ReportHelpers.print("By Pythagoras Theorem");

    let a_squared = Math.pow(a, 2);
    let b_squared = Math.pow(b, 2);
    let c = Math.sqrt(( a_squared + b_squared )).toFixed(2);

    REPORT.block.new();
        REPORT.block.addCalculation('[math] C^2 = A^2 + B^2    \\therefore C = \\sqrt{ A^2 + B^2 } [math]');
        REPORT.block.addCalculation('[math] C  = \\sqrt{ ' + a + '^2 + ' + b + '^2 } [math]');
        REPORT.block.addCalculation('[math] C  = \\sqrt{ ' + (a_squared + b_squared) + ' } = ' + (c) + '[math]');
    REPORT.block.finish();

    //Display results in this format to display in the UI
    var output = {
        "pass": true,
        "report": REPORT,
        "results": {
            "Missing Side (C)": {
                "value": c,
                "units": "m",
            },
        }
    }

    return output;

}