const { Console } = require('node:console');
const fs = require('node:fs');

fs.readFile('input_day_12.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let springs_data = data.split('\r\n').map(line => {
        let [spring_map, damaged_groups] = line.split(' ');
        return [spring_map, damaged_groups.split(',').map(Number)];
    });

    let res = springs_data.map(spring_data => possibleArrangements(...spring_data)).reduce((a, b) => a + b);
    console.log(res);

    let unfolded_springs_data = springs_data.map(([spring_map, damaged_groups]) => {
        let resulting_spring_map = spring_map;
        let resulting_damaged_groups = damaged_groups;
        for (let i = 0; i < 4; i++) {
            resulting_spring_map = resulting_spring_map + '?' + spring_map;
            resulting_damaged_groups = resulting_damaged_groups.concat(damaged_groups);
        }
        return [resulting_spring_map, resulting_damaged_groups];
    });
    let startTime = performance.now();
    let res2 = 0;
    unfolded_springs_data.forEach((spring_data, index) => {
        res2 += possibleArrangements(...spring_data);
        console.log(index);
    });
    let endTime = performance.now();
    console.log(endTime - startTime);
    console.log(res2);
});

function possibleArrangements(springs_map, groups) {
    let arrangements = 0;
    let [group, ...remaining] = groups;
    let max_pos = springs_map.length - sum(groups) - groups.length + 1;

    for (let pos = 0; pos <= max_pos; pos++) {
        if (!operational(springs_map, 0, pos) ||
            !damaged(springs_map, pos, pos + group)) {
            continue;
        }

        if (remaining.length > 0) {
            if (!operational(springs_map, pos + group, pos + group + 1)){
                continue;
            };

            arrangements += possibleArrangements(springs_map.slice(pos + group + 1), remaining);
        } else {
            if (operational(springs_map, pos + group, springs_map.length)){
                arrangements += 1;
            };
        }
    }
    return arrangements;

};

let operational = (spring_map, start, end) => {
    for (let i = start; i < end; i++) {
        let spring = spring_map[i];
        if (spring != '.' && spring != '?') {
            return false;
        }
    }
    return true;
}
let damaged = (spring_map, start, end) => {
    for (let i = start; i < end; i++) {
        let spring = spring_map[i];
        if (spring != '#' && spring != '?') {
            return false;
        }
    }
    return true;
}

String.prototype.count = function (char) {
    let result = 0;
    for (let i = 0; i < this.length; i++){
        if (this[i] == char) {
            result++
        };
    }
    return result;
}

let sum = function (arr) {
    return arr.reduce((a, b) => a + b);
}
