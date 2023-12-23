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

    let initial_pos_connections =
        [- connections[pipes[initial_position - width]][2],
        - connections[pipes[initial_position + 1]][3],
        - connections[pipes[initial_position + width]][0],
        - connections[pipes[initial_position - 1]][1]];

    pipes[initial_position] = pipe_dict.get(initial_pos_connections.toString());

    let [a_shift, b_shift] = initial_pos_connections.filter(x => x != 0);
    let [a_pos, b_pos] = [initial_position, initial_position];

    is_loop[initial_position] = true;
    let distance = 0;

    while (true) {
        a_pos += a_shift;
        b_pos += b_shift;
        a_shift += moves[pipes[a_pos]];
        b_shift += moves[pipes[b_pos]];
        is_loop[a_pos] = true;
        is_loop[b_pos] = true;
        distance += 1;

        if (a_pos == b_pos) {
            break;
        }
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
        } else if ('7J'.includes(pipe)) {
            if (moves[prev_pipe] + moves[pipe] == 0){
                inside = !inside;
            } 
            prev_pipe = "";
        }
    });

    let res2 = enclosed;
    console.log(res2);
});
