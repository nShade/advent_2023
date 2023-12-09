const fs = require('node:fs');

fs.readFile('input_day_6.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let [times, distances] = data.split('\r\n').map(x=> x.split(':')[1].split(' ').filter(x=> x!='').map(Number));
    console.log(times, '/', distances);

    let res = 1;

    for (i=0; i < times.length; i++){
        res *= waysToWin(times[i], distances[i]);
    }

    console.log(res);

    let res2;
    console.log(res2);
});

function waysToWin(race_time, record_distance){
    result = 0;

    for (time_holding = 0; time_holding <= race_time; time_holding++){
        if (time_holding * (race_time - time_holding) > record_distance){
            result++;
        }
    }
    return result;
}
