const { Console } = require('node:console');
const fs = require('node:fs');

fs.readFile('input_day_12.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let springs_data = data.split('\r\n').map(line => {
        let [spring_map, damaged_groups] = line.split(' ');
        return [spring_map.split(''), damaged_groups.split(',').map(Number)]; 
    });

    let res = springs_data.map(spring_data => findNumberArrangements(...spring_data)).reduce((a, b) => a + b);
    console.log(res);

    // let unfolded_springs_data = springs_data.map(([spring_map, damaged_groups]) => {
    //     let resulting_spring_map = spring_map;
    //     let resulting_damaged_groups = damaged_groups;
    //     for (let i=0; i< 4; i++){
    //         resulting_spring_map = resulting_spring_map.concat(['?']).concat(spring_map);
    //         resulting_damaged_groups = resulting_damaged_groups.concat(damaged_groups);
    //     }
    //     return [resulting_spring_map, resulting_damaged_groups];
    // });
    // let res2 = unfolded_springs_data.map(spring_data => findNumberArrangements(...spring_data)).reduce((a, b) => a + b);
    let res2 = 0;
    console.log(res2);
});

function findNumberArrangements(spring_map, damaged_groups){
    return possibleArrangements(damaged_groups, spring_map.length).filter(arrangement => fitsMap(arrangement, spring_map)).length
}

function fitsMap(arrangement, spring_map){
    for (let [index, spring] of arrangement.entries()) {
        if (spring_map[index] != '?' && spring_map[index] != spring){
            return false;
        }
    };
    return true;
}

function possibleArrangements(damaged_groups, map_length){
    let arrangements = [];
    let max_group_pos = map_length - damaged_groups.reduce((a, b) => a + b, 0) - damaged_groups.length + 1;
    for (let first_group_pos = 0; first_group_pos <= max_group_pos; first_group_pos++){
        let arrangement = [];
        for (let i=0; i< first_group_pos; i++){
            arrangement.push('.');
        }
        for (let i=first_group_pos; i< first_group_pos + damaged_groups[0]; i++){
            arrangement.push('#');
        }
        let remaining = damaged_groups.slice(1);

        if (remaining.length > 0){
            arrangement.push('.');
            for (const remaining_arrangement of possibleArrangements(damaged_groups.slice(1), map_length - arrangement.length)){
                arrangements.push(arrangement.concat(remaining_arrangement));
            }
        } else {
            for (let i=arrangement.length; i< map_length; i++){
                arrangement.push('.');
            }
            arrangements.push(arrangement);
        }
    }
    return arrangements;
}