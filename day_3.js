const fs = require('node:fs');

fs.readFile('input_day_3.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let chars = data.split('\r\n').map(x=>{return x.split('')});

    let res = sum_part_numbers(chars);
    console.log(res);

    let res2 = sum_gear_ratios(chars);
    console.log(res2);
})

const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const not_symbol = digits.concat(['.', undefined]);

function sum_part_numbers(chars){    
    let res = 0;

    chars.forEach((line, line_index) => {
        let digit_cache = '';
     
        line.forEach((char, char_index) => {
            if (digits.includes(char)){
                digit_cache += char;
            } else {
                if (digit_cache != ''){
                    if (is_part_number(line_index, char_index, digit_cache.length, chars)){
                        res += Number(digit_cache)
                    }
                    digit_cache = '';
                }
            }
        })

        if (digit_cache != ''){
            if (is_part_number(line_index, 140, digit_cache.length, chars)){
                res += Number(digit_cache)
            }
        }
    })
    return res;
}

function is_part_number(line_index, char_index, len, chars){
    for (let i = char_index - len - 1; i <= char_index; i++){
        if (!not_symbol.includes(chars[line_index != 0 ? line_index - 1 : 0][i]) || 
            !not_symbol.includes(chars[line_index != 139 ? line_index + 1 : 139][i]) || 
            !not_symbol.includes(chars[line_index][i])){
            return true;
        }
    };
    return false;
}

function sum_gear_ratios(chars){   
    let res = 0; 
    chars.forEach((line, line_index) => {     
        line.forEach((char, char_index) => {
            if (char == '*'){
                let adjacent_numbers = get_adjacent_numbers(line_index, char_index, chars);

                if (adjacent_numbers.length == 2){
                    res += adjacent_numbers[0] * adjacent_numbers[1];
                }
            }
        })
    })

    return res;
}

function get_adjacent_numbers(line_index, char_index, chars){
    let visited = {};
    let numbers = [];
    for (let li = line_index - 1; li < line_index + 2; li++){
        for (let ci = char_index - 1; ci < char_index + 2; ci++){
            if (visited[li * 140 + ci]){
                break;
            }
            let number = get_number(li, ci, chars, visited);
            if (number){
                numbers.push(number);
            }
        }
    }

    return numbers;
}

function get_number(line_index, char_index, chars, visited){
    let digit_cache = '';
    let current_char_index = char_index;
    let symbol = chars[line_index][current_char_index];

    if (!digits.includes(symbol)){
        return;
    }

    while (digits.includes(symbol)){
        visited[line_index * 140 + current_char_index] = true
        digit_cache = symbol + digit_cache;
        current_char_index -= 1;
        symbol = chars[line_index][current_char_index];       
    }

    current_char_index = char_index + 1;
    symbol = chars[line_index][current_char_index];
    
    while (digits.includes(symbol)){
        visited[line_index * 140 + current_char_index] = true
        digit_cache = digit_cache + symbol;
        current_char_index += 1;
        symbol = chars[line_index][current_char_index];       
    }

    if (digit_cache != ''){
        return Number(digit_cache);
    }
}
