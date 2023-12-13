const fs = require('node:fs');

fs.readFile('input_day_9.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let sequences = data.split('\r\n').map(line => line.split(' ').map(entry => Number(entry)));

    let res = sequences.map(continueSequence).reduce((a, b) => a + b);
    console.log(res);

    let res2;
    console.log(res2);
});


function continueSequence(sequence){
    let res = 0;

    while (!sequence.every(entry => entry == 0)){
        res += sequence[sequence.length - 1];

        let new_sequence = [];
        sequence.reduce((prev, current) => {
            new_sequence.push(current - prev);
            return current;
        });
        sequence = new_sequence;
    }

    return res;
}