const fs = require('node:fs');

fs.readFile('input_day_1.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
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
    [" "].concat(s.split('')).reduce((total, value) => {
        if (isDigit(value)) {
            first_digit = first_digit ?? value;
            last_digit = value;
        }
    })
    return + (first_digit + last_digit);
}

function findFirstAndLastDigit2(s){
    let first_digit;
    let last_digit;
    let numbers = {
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
        zero: "0"
    }

    let last_five = ["", "", "", "", ""];

    [" "].concat(s.split('')).reduce((total, value, index, array) => {
        last_five = array.slice(index > 3 ? index - 4 : 0, index + 1);        

        let last_five_letters = last_five.join("");
        let last_four_letters = last_five.slice(1).join("");
        let last_three_letters = last_five.slice(2).join("");

        if (last_five_letters in numbers){
            value = numbers[last_five_letters];
        }
        else if (last_four_letters in numbers){
            value = numbers[last_four_letters];
        }        
        else if (last_three_letters in numbers){
            value = numbers[last_three_letters];
        }

        if (isDigit(value)) {
            first_digit = first_digit ?? value;
            last_digit = value;
        }
    })
    return + (first_digit + last_digit);
}

function isDigit(c) {
    return c >= '0' && c <= '9';
}
