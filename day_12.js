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

    let res = sum(springs_data.map(spring_data => possibleArrangements(...spring_data)));
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
    let res2 = sum(unfolded_springs_data.map(spring_data => possibleArrangements(...spring_data)));
    console.log(res2);
});

function possibleArrangements(springs_map, groups) {
    let cache = [];

    for (let i = 0; i < groups.length + 1; i++) {
        cache.push([]);
        for (let j = 0; j < springs_map.length; j++) {
            cache[i].push(undefined);
        }
    }

    function pa(group_index, start) {
        let cached = cache[group_index][start];
        if (cached != undefined) {
            return cached;
        }

        let res = 0;

        if (group_index >= groups.length) {
            res = operational(springs_map, start, springs_map.length) ? 1 : 0;
        } else {
            let max_pos = springs_map.length - sum(groups.slice(group_index)) - groups.length + group_index + 1;
            let pos = start;
            let endpos = pos + groups[group_index];

            while (pos <= max_pos && springs_map[pos - 1] != '#') {
                if (damaged(springs_map, pos, endpos) && springs_map[endpos] != '#') {
                    res += pa(group_index + 1, endpos + 1);
                };

                pos++; endpos++;
            }
        }

        cache[group_index][start] = res;
        return res;
    }

    return pa(0, 0);
};

let operational = (spring_map, start, end) => {
    for (let i = start; i < end; i++) {
        if (spring_map[i] == '#') {
            return false;
        }
    }
    return true;
}
let damaged = (spring_map, start, end) => {
    for (let i = start; i < end; i++) {
        if (spring_map[i] == '.') {
            return false;
        }
    }
    return true;
}

let sum = function (arr) {
    return arr.reduce((a, b) => a + b);
}
