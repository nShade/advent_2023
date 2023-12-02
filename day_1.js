const fs = require('node:fs');

fs.readFile('input_day_1.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let data_arr = data.split('\r\n');

    let res = data_arr.map(findFirstAndLastDigit).reduce(sum);
    console.log(res);

    let res2 = data_arr.map(findFirstAndLastDigit2).reduce(sum);
    console.log(res2);
})

function sum(a, b) {
    return a + b;
}

function findFirstAndLastDigit(s){
    let first_digit;
    let last_digit;
    s.split('').forEach((value) => {
        if (isDigit(value)) {
            first_digit = first_digit ?? value;
            last_digit = value;
        }
    })
    return + (first_digit + last_digit);
}

const number_names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const number_lenths = number_names.map(x => x.length)
const number_letters = number_names.map(x => x.split(''));

function findFirstAndLastDigit2(s){
    let first_digit;
    let last_digit;
    let matches = number_names.map(x => 0);

    s.split('').forEach((char) => {
        matches = matches.map((match, index) => {
            return (char == number_letters[index][match]) ? match + 1 : (char == number_letters[index][0]) ? 1 : 0
        });

        let match_index = matches.findIndex((value, index) => {return value == number_lenths[index]});
        matches[match_index] = 0;
        char = numbers[match_index] ?? char;

        if (isDigit(char)) {
            first_digit = first_digit ?? char;
            last_digit = char;
        };
    });

    return + (first_digit + last_digit);
}

function isDigit(c) {
    return Number.isFinite(Number(c));
}
