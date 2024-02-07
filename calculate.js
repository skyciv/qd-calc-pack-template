module.exports = function (input_json) {

	var h_unit = VARIABLES['h'].units_str; //they are also set as variables
	var b_unit = VARIABLES['b'].units_str;

	//do all calculations
	const max_moi = 2200000;
	var area = h * b;
	var moi = ReportHelpers.round(b * Math.pow(h, 3) / 12);
	var moi_in_inches = ReportHelpers.convert(moi, "mm4", "in4");
	var utility = moi / max_moi;
	utility = ReportHelpers.round(utility, 3);  //round to 3 dec. places

	//REPORTING
	REPORT.block.new("SkyCiv Basic Section Calculation", 2); // when creating a new block you can create an optional heading with a size (1-5 with 1 being the largest heading)
	REPORT.block.new("Area Calculations", 4);
	REPORT.block.addReference("<small>Table 8.6.1.1</small>");
	REPORT.block.addCalculation("[math]Area = h * b = " + h + " * " + b + "  = " + area + " " + h_unit + "mm^2[math]");

	REPORT.block.new("Moment of Inertia", 4);
	REPORT.block.addCalculation("[math]I_{y} = \\frac{ bh^3 }{ 12 } = \\frac{ (" + b + ")  " + h + "^3}{ 12 }[math]");
	REPORT.block.addCalculation("[math]I_{y} = " + moi + " " + h_unit + "^4[math]");
	REPORT.block.addCalculation("[math]Convert\\: to\\: inches \\: using\\: ReportHelpers.convert:[math]");
	REPORT.block.addCalculation("[math]I_{y} = " + ReportHelpers.round(moi_in_inches,4) + "in^4[math]");
	REPORT.block.addReference("<em>Tip: This is a really useful website for Latex: <a href='https://www.codecogs.com/latex/eqneditor.php' target='_blank'>Link</a></em>");

	//ANOTHER WAY TO DO IT
	REPORT.block.new("Another way is to use runFormula", 4);
	var moi = ReportHelpers.formula("I_y = b * Math.pow(h, 3) / 12", "mm^4", 2);

  //ANOTHER WAY TO DO IT
	REPORT.block.new("Do some easy unit converting", 4);
	ReportHelpers.print(null, "10 Inches is equal to " + ReportHelpers.convert(10, "in", "mm")+ " mm");
	ReportHelpers.print(null, "10 kN is equal to " + ReportHelpers.convert(10, "kN", "kip")+ " kip"); 
	ReportHelpers.print(null, "2352 kN is equal to " +ReportHelpers.convert(2352, "mm", "m")+  "m");

	REPORT.block.new("Utility Ratio", 4);
	REPORT.block.addCalculation("[math] Utility = \\frac{ I_y }{ I_{y,max}} =  \\frac{ " + moi + "}{ " + max_moi + "} = " + utility + "  [math]");
	ReportHelpers.printStatus(utility, true);

	REPORT.block.finish();

	//simplified reporting
	let max_def = 5;

	REPORT.block.new("Simplified Calculation Reporting");
	REPORT.block.addReference("<a href='https://skyciv.com/api/v3/docs/quick-design-calculate#reporting-functions' target='_blank'>ReportHelper Docs</a>")
	REPORT.block.addCalculation("Say you don't want to do the full calculation reporting, you can print a simplified version like so:<br><br>")
	ReportHelpers.lineResult("Max Shear force in  Member", "V_{y}", 22.43 + " kN")
	ReportHelpers.lineResult("Displacement Max", "\\gamma_y", max_def + " mm")
	ReportHelpers.lineResult("Design Load", "\\omega_x", 77.43 + " kNm")
	ReportHelpers.lineResult("Section Capacity", "\\gamma_{y2}", 123.43 + " kNm")
	ReportHelpers.lineResult("Remaining Capacity in Section", "\\gamma_{y3}", 46 + " kNm")
	ReportHelpers.lineResult("Design Load", "\\omega_x", 77.43 + " kNm")
	ReportHelpers.lineResult("Section Capacity", "\\gamma_{y2}", 123.43 + " kNm")
	ReportHelpers.lineResult("Remaining Capacity in Section", "\\gamma_{y3}", 46 + " kNm")
	REPORT.block.finish();


	// ---- SVG EXMAPLE ----- //
	let concrete_shape = [[b, h], [b, -h], [-b, -h], [-b, h]];
	let steel_profile = [];
	let rebar = [];
	let links = [];
	let axis = [[[-75, 0], [75, 0]], [[0, 75], [0, -75]]];
	let dims = [["left", 1, 0, h * 2, h], ["bottom", 1, 0, b * 2, b]];
	let steel_profile_color = "#66b3ff";
	let concrete_color = "#d9d9d9";
	let rebar_color = "#ff471a";
	let links_color = "#248f24";

	let sec_1 = new SectionSVG({
		height: 300,
		width: 300,
	});

	sec_1.drawData({
		type: "encased",
		concrete_shape: concrete_shape,
		steel_profile: steel_profile,
		links: links,
		rebar: rebar,
		concrete_color: concrete_color,
		steel_profile_color: steel_profile_color,
		rebar_color: rebar_color,
		links_color: links_color,
		axis: axis,
		dims: dims,
		reserve: true
	});

	REPORT.block.new("Let's print some SVG Section graphics", 2);
	REPORT.block.addReference("<a href='https://dev.skyciv.com/dev-docs/?=skyciv-utils/svg-graphics.md'  target='_blank'>Visit SVG Docs</a>");
	REPORT.block.addCalculation("<div style='text-align: center;'>" + sec_1.getHTML() + "</div>");
	REPORT.block.finish();

	const team_info = [
		{
			name: "Sam Carigliano",
			height: 1.62,
			age: 33
		},
		{
			name: "Paul Comino",
			height: 1.55,
			age: 31
		},
		{
			name: "Sergey",
			height: 1.92,
			age: 39
		},
		{
			name: "Jake",
			height: 1.90,
			age: 21
		},
	]

	//get tallest person
	var max_height = 0;
	var tallest_person;
	for (var i = 0; i < team_info.length; i++) {
		if (team_info[i].height > max_height) {
			max_height = team_info[i].height;
			tallest_person = team_info[i].name;
		}
	}


	REPORT.block.new("Let's print a table", 4);
	REPORT.block.addReference("<a href='https://dev.skyciv.com/dev-docs/' target='_blank'>Visit Docs</a>");
	REPORT.block.addCalculation("By printing a table, we can manage formatting and display information in a neat way");
	REPORT.block.finish();

	// ---- TABLE EXAMPLE ---- //
	var static_table = new ResultsTable(4); //number of rows

	static_table.addColumn({
		header: 'Name',
		width: "140px",
		data_function: function (i) {
			return team_info[i].name
		},
		text_align: 'left'
	});

	static_table.addColumn({
		header: 'Height',
		units: "m",
		width: "100px",
		data_function: function (i) {
			return (team_info[i].height + " m")
		},
		text_align: 'left'
	});

	static_table.addColumn({
		header: 'Age',
		data_function: function (i) {
			return team_info[i].age
		},
		text_align: 'left'
	});
	static_table.report(REPORT);

	REPORT.block.new();
	REPORT.block.addResult("Tallest person: <strong style='color:green'>" + tallest_person + "</strong>")
	REPORT.block.finish();

	// QUICK TABLS
	let table_data = [
		["Heading 1", "Heading 2", "Heading 3"],
		["Some Result", "1223", "kN"],
		["Some Other Result", "0.234", "MPa"],
		["Some Result", "1223", "kN"],
		["Some Other Result", "0.234", "MPa"],
		["Some Other Result", "0.234", "MPa"],
	]
	let options = {
		heading: "Simplified Table Method",
		widths: ["50%", "25%", "25%"]
	}
	ReportHelpers.quickTable(table_data, options);



	let graph = {
		scale: 0.75, // default to 1, 1 is the max width of the centre column in the calculation reports
		x_axis: {
		  title: 'x-axis', // OPTIONAL 
		  markers: 'auto', // OPTIONAL "auto" | "data" | "extremes"
		  include_0: false, // OPTIONAL by default it is false, but some graphs will want to see the axis line as a reference point
		},
		y_axis: {
		  title: 'y-axis', // OPTIONAL 
		  markers: 'auto', // OPTIONAL "auto" | "data" | "extremes"
		  include_0: true, // OPTIONAL by default it is false, but some graphs will want to see the axis line as a reference point
		},
		title: 'Graph Title', // OPTIONAL
		aspect_ratio: 0.5, // OPTIONAL "equal" or "flexible" or ratio as "number". Default is equal which doesn't scale the graph coordinates
		legend: 'top', // OPTIONAL "top" or "bottom"
		chart_grid: true, // OPTIONAL defaut false
		to_precision: 3, // OPTIONAL
		// to_fixed: 3, // OPTIONAL
		data: [
		  {
			type: 'line', // points, line, or polygon
			coordinates: [
			  [0, 0], [100, 50], [200, 50], [300, 0]
			],
			colour: 'red',
			name: 'points', // OPTIONAL
			data_labels: { // OPTIONAL
			  text_anchor: "start",
			  text_color: "blue",
			  circle_color: "#BE2525"
			},
			projection: {
			  point: [0, 30],
			  projection_color: ['orange'],// OPTIONAL. if not given green is the default
			  projection_labels_x: ['Mry'],
			  projection_labels_y: ['N*']
			}
		  },
		  {
			type: 'line', // points, line, or polygon
			coordinates: [
			  [0, 0], [200, 150], [250, 150], [350, 0]
			],
			colour: 'orange',
			name: 'straight line', // OPTIONAL
			data_labels: { // OPTIONAL
			  text_anchor: "start",
			  text_color: "black",
			  circle_color: "#BE2525"
			},
		  },
		  {
			type: 'line',
			spline: true, // OPTIONAL
			colour: 'darkred',
			name: 'spline line', // OPTIONAL
			coordinates: [
			  [0, 0], [100, 30], [200, 60], [300, 120]
			],
		  },
	  
		  {
			type: 'polygon',
			colour: 'green',
			name: 'polygon', // OPTIONAL
			coordinates: [
			  [100, 100], [200, 100], [200, 200], [100, 200]
			],
		  }
		]
	}
	let figure_html = new Graph(graph).output();
	ReportHelpers.print("", "<div style='width:50%'>"+figure_html+"</div>")


	//do some calcs
	var output = {
		"results": {
			"Sum": {
				"value": h + b,
				"info": "Simple summation "
			},
			"Area": { //old method, still works
				"value": area,
				"info": "Give more details on your result",
				"unit": "mm <sup>2</sup>",
			},
			"i_y": { //new method, makes it easier to use via the API
				"label": "I<sub>Y</sub>, Moment of Inertia",
				"value": moi,
				"unit": "mm <sup>4</sup>",
				"info": "Moment of Inertia of your Section"
			},
			"sub_heading_1": {
			  "unit": "heading",
			  "label": "UTILITY RATIOS"
		  },
			"utility_ratio_1": { //new method, makes it easier to use via the API
				"label": "Utility Ratio 1",
				"value": 0.555,
				"unit": "utility",
				"info": "If your type == utility, it will automatically display PASS/FAIL"
			},
			"Utility Ratio 2": {
				"value": 1.555,
				"unit": "utility",
				"info": "If your type == utility, it will automatically display PASS/FAIL"
			}
		},
		"report": REPORT
	}

	return output;

}
