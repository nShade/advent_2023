const { Console } = require('node:console');
const fs = require('node:fs');

fs.readFile('input_day_11.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let space = data.split('\r\n').map(x => x.split(''));

    let galaxies = findGalaxies(space);
    let empty_rows = findEmptyRows(space);
    let empty_cols = findEmptyColumns(space);
    let distances = 0;

    galaxies.forEach((start_galaxy, index) => {
        galaxies.slice(index + 1).forEach((finish_galaxy) => {
            distances += distance(start_galaxy, finish_galaxy, empty_cols, empty_rows, 1);
        })
    });  

    let res = distances;
    console.log(res);

    distances = 0;

    galaxies.forEach((start_galaxy, index) => {
        galaxies.slice(index + 1).forEach((finish_galaxy) => {
            distances += distance(start_galaxy, finish_galaxy, empty_cols, empty_rows, 1000000 - 1);
        })
    });      

    let res2 = distances;
    console.log(res2);
});


function findEmptyRows(space) {
    let result = [];
    space.forEach((line, index) => {
        if (line.every(el => el == '.')) {
            result.push(index);
        }
    });
    return result;
}

function findEmptyColumns(space) {
    let result = [];
    space[0].forEach((_, index) => {
        if (space.every(el => el[index] == '.')) {
            result.push(index);
        }
    });
    return result;
}

function findGalaxies(space) {
    let galaxies = [];
    space.forEach((line, vindex) => {
        line.forEach((element, hindex) => {
            if (element == '#') {
                galaxies.push([vindex, hindex]);
            }
        });
    });

    return galaxies;
}

function distance(galaxy_a, galaxy_b, empty_cols, empty_rows, expantion) {
    let [a_y, a_x] = galaxy_a;
    let [b_y, b_x] = galaxy_b;
    return Math.abs(b_x - a_x) + expantion * empty_spaces(a_x, b_x, empty_cols) + Math.abs(b_y - a_y) + expantion * empty_spaces(a_y, b_y, empty_rows);
}

function empty_spaces(a, b, spaces) {
    let res = 0;
    [a, b] = [a, b].sort((a, b) => a - b);
    spaces.forEach(space => {
        if (space > a && space < b) {
            res += 1;
        }
    })
    return res;
}
