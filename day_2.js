const fs = require('node:fs');

fs.readFile('input_day_2.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let lines = data.split('\r\n');
    game_data = lines.map(parse_line);

    let res = game_data
                .filter((game)=> {return filter_game(game, 12, 13, 14)})
                .reduce((a, b) => {return a + b.id}, 0);
    console.log(res);

    let res2 = game_data
                .map(find_power)
                .reduce((a, b) => {return a + b}, 0);
    console.log(res2);
})


function parse_line(line){
    let [id, rest] = line.split(':');
    id = Number(id.slice(5));
    return {
        id: id, 
        grabs: rest.split(';').map(parse_grab)
    }
}

function parse_grab(grab){
    let cubes = {
        red: 0,
        green: 0,
        blue: 0,
    }

    grab.split(',')
        .map(x => x.trim())
        .forEach(element => {
            let [quantity, color] = element.split(' ');
            cubes[color] = Number(quantity);
        });

    return cubes;
}

function filter_game(game, red, green, blue){
    return game.grabs.every(
        (grab) => {
            return grab.red <= red && grab.green <=green && grab.blue <= blue
        }
        );
}

function find_power(game){
    let minimal_set = game.grabs.reduce((pv, v) => {
        return {
            red: pv.red > v.red ? pv.red: v.red,
            green: pv.green > v.green ? pv.green: v.green,
            blue: pv.blue > v.blue ? pv.blue: v.blue
        }
    });
    return minimal_set.red * minimal_set.green * minimal_set.blue;
}