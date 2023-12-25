const { Console } = require('node:console');
const fs = require('node:fs');

fs.readFile('input_day_13.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let patterns = data.split('\r\n\r\n').map(x => x.split('\r\n').map(x => x.split('')));

    let res = patterns.reduce((res, pat) => res + mirror(pat, symmetrical), 0);
    console.log(res);

    let res2 = patterns.reduce((res, pat) => res + mirror(pat, smudgedSymmetrical), 0);
    console.log(res2);
});


function mirror(pattern, fn_symmetrical) {
    for (let i = 1; i < pattern[0].length; i++) {
        if (fn_symmetrical(pattern, i)) {
            return i;
        }
    }

    let transposed_pattern = transpose(pattern);

    for (let i = 1; i < pattern.length; i++) {
        if (fn_symmetrical(transposed_pattern, i)) {
            return 100 * i;
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

let smudgedSymmetrical = (pattern, line_of_symmetry) => {
    let start = Math.max(2 * line_of_symmetry - pattern[0].length, 0);
    let smudges = 0;

    for (let row of pattern) {
        for (let j = start; j < line_of_symmetry; j++) {
            if (row[j] != row[2 * line_of_symmetry - 1 - j]) {
                smudges += 1;
                if (smudges > 1) {
                    return false;
                }
            }
        }
    }
    return smudges == 1;
}

function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}
