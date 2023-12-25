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

    let res2;
    console.log(res2);
});

function tiltNorth(rocks) {
    rocks.forEach((row, vindex) => {
        row.forEach((rock, hindex) => {
            if (rock == 'O'){
                moveNorth(rocks, vindex, hindex);
            }
        })
    });
}

function moveNorth(rocks, vindex, hindex){
    let [y, x] = [vindex, hindex];
    while (y != 0 && rocks[y - 1][x] != 'O' && rocks[y - 1][x] != '#'){
        y--;
    }
    rocks[vindex][hindex] = '.';
    rocks[y][x] = 'O';
};

function calculateWeight(rocks) {
    return rocks.reduce(
        (res, row, vindex) =>
            res + row.reduce((res, rock) => res + (rock == 'O' ? rocks.length - vindex : 0), 0),
        0
    );
}