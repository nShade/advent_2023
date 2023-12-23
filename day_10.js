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
    let initial_position = pipe_map.indexOf('S');

    const moves = {
        "L": - width + 1,
        "|": 0,
        "-": 0,
        "F": width + 1,
        "J": - width - 1,
        "7": width - 1,
    }

    // too lazy to put code that converts start position into a proper pipe
    pipes[initial_position] = "L";
    let [a_shift, a_pos, b_shift, b_pos] = [1, initial_position + 1, -width, initial_position - width];
    is_loop[initial_position] = true;
    is_loop[initial_position + 1] = true;
    is_loop[initial_position - width] = true;
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
