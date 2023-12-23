const fs = require('node:fs');

fs.readFile('input_day_10.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let pipe_list = data.split('\r\n');
    let width = pipe_list[0].length;
    let pipes = pipe_list.join('').split('');
    let is_loop = pipes.map(p => false);
    let initial_position = pipes.indexOf('S');

    const connections = {
        "L": [-width, 1, 0, 0],
        "|": [-width, 0, width, 0],
        "-": [0, 1, 0, -1],
        "F": [0, 1, width, 0],
        "J": [-width, 0, 0, -1],
        "7": [0, 0, width, -1],
        ".": [0, 0, 0, 0]
    } 

    let moves = {};
    Object.entries(connections).forEach(([k, v]) => moves[k] = v.reduce((a, b) => a + b));
    
    let pipe_dict = new Map();
    Object.entries(connections).forEach(([k, v]) => pipe_dict.set(v.toString(), k));

    let up = - connections[pipes[initial_position - width]][2];
    let right = - connections[pipes[initial_position + 1]][3];
    let down = - connections[pipes[initial_position + width]][0];
    let left = - connections[pipes[initial_position - 1]][1];

    pipes[initial_position] = pipe_dict.get([up, right, down, left].toString());
    let [a_shift, b_shift] = [up, right, down, left].filter(x => x != 0);
    let [a_pos, b_pos] = [initial_position + a_shift, initial_position + b_shift];
  
    is_loop[initial_position] = true;
    is_loop[a_pos] = true;
    is_loop[b_pos] = true;
    let distance = 1;

    while (a_pos != b_pos) {
        [a_shift, a_pos] = makeStep(a_shift, a_pos, pipes, moves);
        [b_shift, b_pos] = makeStep(b_shift, b_pos, pipes, moves);
        is_loop[a_pos] = true;
        is_loop[b_pos] = true;
        distance += 1;
    }

    let res = distance;
    console.log(res);

    let enclosed = 0;
    let inside = false;
    let prev_pipe = "";

    pipes.forEach((pipe, pos) => {
        if (!is_loop[pos]) {
            enclosed += inside ? 1 : 0;
            return;
        }

        if (pipe == '|') {
            inside = !inside;
        } else if ('LF'.includes(pipe)) {
            prev_pipe = pipe;
        } else if (pipe == "7" && prev_pipe == "L") {
            prev_pipe = "";
            inside = !inside;
        } else if (pipe == "J" && prev_pipe == "F") {
            prev_pipe = "";
            inside = !inside;
        } else if (pipe == "7" && prev_pipe == "F") {
            prev_pipe = "";
        } else if (pipe == "J" && prev_pipe == "L") {
            prev_pipe = "";
        }
    });

    let res2 = enclosed;
    console.log(res2);
});

function makeStep(shift, pos, pipe_map, moves) {
    shift += moves[pipe_map[pos]];
    return [shift, pos + shift];
};
