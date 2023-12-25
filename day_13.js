const { Console } = require('node:console');
const fs = require('node:fs');

fs.readFile('input_day_13.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let patterns = data.split('\r\n\r\n').map(x => x.split('\r\n').map(x => x.split('')));
    // console.log(patterns);

    // pat = [[".", "#", "#"], ["#", "#", "#"]];

    // console.log(mirror(pat))
    // patterns.reduce((res, pat) => res + mirror(pat), 0);
    // patterns.reduce((res, pat) => res + 100 * mirror(transpose(pat)), 0)

    let res =
        patterns.reduce((res, pat) => res + mirror(pat), 0) +
        patterns.reduce((res, pat) => res + 100 * mirror(transpose(pat)), 0);
    console.log(res);

    let res2;
    console.log(res2);
});


function mirror(pattern) {
    for (let i = 1; i < pattern[0].length; i++) {
        if (symmetrical(pattern, i)) {
            return i;
        }
    }
    return 0;
}

let symmetrical = (pattern, line_of_symmetry) => {
    let start = Math.max(2 * line_of_symmetry - pattern[0].length, 0);

    for (let row of pattern) {
        for (let j = start; j < line_of_symmetry; j++) {
            if (row[j] != row[2 * line_of_symmetry - 1 - j]) {
                return false;
            }
        }
    }
    return true;
}

function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}