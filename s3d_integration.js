

module.exports = function(s3d_model, analysis_results, solving) {

    let default_input = {
        'shape': "Rectangular",
        'L': null,
        'A': null,
        'B': null
    }

    let all_design_forces = StructureHelpers.getDesignForces(analysis_results);

    let design_members = [];
    var members = s3d_model.elements;
    for (var i =0; i < members.length; i++) {
        var this_member = members[i];
        if (!this_member) continue;

        let this_member_input = default_input; //start with this
        let span_L = StructureHelpers.getMemberLength(s3d_model, i)*1000;
        
        let section_id = this_member[2];
        let section_obj = s3d_model.sections[section_id];

        this_member_input.L = span_L;
        this_member_input.section_area = section_obj.area;

        design_members[i] = this_member_input; //add to array

    }



    return [
        {
            shape: "Rectangular",
            A: Math.random()*1000,
            B: Math.random()*500,
        },
        {
            shape: "Circular",
            d: Math.random()*1000
        }
    ];

    let result = {
        "report": "SUMMARY_REPORT",
        "members": {
            "1": {
                ratio: 0.459,
                capacity: 2464,
                pass: true,
                notes: "some other notes",
                report: "TODO"
            },
            "2": {
                ratio :1.23,
                capacity: 2543,
                pass: false,
                notes: "Some other notes, or status",
                report: "TODO"
            }
        }
    }




    return result;
}