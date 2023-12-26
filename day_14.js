const { Console } = require('node:console');
const fs = require('node:fs');

fs.readFile('input_day_14.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let rocks = data.split('\r\n').map(x => x.split(''));
    tiltNorth(rocks)
    let res = calculateWeight(rocks);
    console.log(res);

    tiltWest(rocks);
    tiltSouth(rocks);
    tiltEast(rocks);

    let configurations = [];
    let configuration, period_start, period;
    let round = 1;

    while (period == undefined){
        configuration = rocks.map(x => x.join('')).join('\n');
        for (let [stored_configuration_index, stored_configuration] of configurations.entries()){
            if (configuration == stored_configuration){
                period_start = stored_configuration_index + 1;
                period = round - period_start;
                break;
            }
        }
        configurations.push(configuration);
        tiltRound(rocks);
        round++;
    }

    let res2 = calculateWeight(configurations[period_start + (1000000000 - period_start - 1) % period].split('\n').map(x => x.split('')));
    console.log(res2);
});

function tiltRound(rocks){
    tiltNorth(rocks);
    tiltWest(rocks);
    tiltSouth(rocks);
    tiltEast(rocks);
}

function tiltNorth(rocks) {
    for (let vindex = 1; vindex < rocks.length; vindex++) {
        for (let hindex = 0; hindex < rocks[0].length; hindex++) {
            if (rocks[vindex][hindex] == 'O') {
                moveNorth(rocks, vindex, hindex);
            }
        }
    }
}

function moveNorth(rocks, vindex, hindex) {
    let [y, x] = [vindex, hindex];
    while (y != 0 && rocks[y - 1][x] != 'O' && rocks[y - 1][x] != '#') {
        y--;
    }
    rocks[vindex][hindex] = '.';
    rocks[y][x] = 'O';
}

function tiltEast(rocks) {
    for (let vindex = 0; vindex < rocks.length; vindex++) {
        for (let hindex = rocks[0].length - 2; hindex >= 0; hindex--) {
            if (rocks[vindex][hindex] == 'O') {
                moveEast(rocks, vindex, hindex);
            }
        }
    }
}

function moveEast(rocks, vindex, hindex) {
    let [y, x] = [vindex, hindex];
    while (x != rocks[0].length - 1 && rocks[y][x + 1] != 'O' && rocks[y][x + 1] != '#') {
        x++;
    }
    rocks[vindex][hindex] = '.';
    rocks[y][x] = 'O';
}

function tiltSouth(rocks) {
    for (let vindex = rocks.length - 2; vindex >= 0; vindex--) {
        for (let hindex = 0; hindex < rocks[0].length; hindex++) {
            if (rocks[vindex][hindex] == 'O') {
                moveSouth(rocks, vindex, hindex);
            }
        }
    }
}

function moveSouth(rocks, vindex, hindex) {
    let [y, x] = [vindex, hindex];
    while (y != rocks.length - 1 && rocks[y + 1][x] != 'O' && rocks[y + 1][x] != '#') {
        y++;
    }
    rocks[vindex][hindex] = '.';
    rocks[y][x] = 'O';
}

function tiltWest(rocks) {
    for (let vindex = 0; vindex < rocks.length; vindex++) {
        for (let hindex = 1; hindex < rocks[0].length; hindex++) {
            if (rocks[vindex][hindex] == 'O') {
                moveWest(rocks, vindex, hindex);
            }
        }
    }
}

function moveWest(rocks, vindex, hindex) {
    let [y, x] = [vindex, hindex];
    while (x != 0 && rocks[y][x - 1] != 'O' && rocks[y][x - 1] != '#') {
        x--;
    }
    rocks[vindex][hindex] = '.';
    rocks[y][x] = 'O';
}

function calculateWeight(rocks) {
    return rocks.reduce(
        (res, row, vindex) =>
            res + row.reduce((res, rock) => res + (rock == 'O' ? rocks.length - vindex : 0), 0),
        0
    );
}
