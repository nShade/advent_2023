const fs = require('node:fs');

fs.readFile('input_day_10.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let pipes = data.split('\r\n').map(line => line.split(''));
    let is_loop = pipes.map(line => line.map(p => false));

    let x_init, y_init;

    for (const [vindex, line] of pipes.entries()) {
        for (const [hindex, pipe] of line.entries()) {
            if (pipe == 'S') {
                [x_init, y_init] = [hindex, vindex];
            }
        }
    }

    let positions = [];
    markAsLoop(y_init, x_init, is_loop);

    for (const direction of ['up', 'down', 'left', 'right']) {
        const [shift_y, shift_x] = shifts[direction];
        const new_pos = makeStep(direction, y_init + shift_y, x_init + shift_x, pipes);
        if (new_pos !== undefined) {
            positions.push(new_pos);
            markAsLoop(y_init + shift_y, x_init + shift_x, is_loop);
            markAsLoop(new_pos[1], new_pos[2], is_loop);
        }
    }

    let [[a_from, a_pos_y, a_pos_x], [b_from, b_pos_y, b_pos_x]] = positions;
    pipes[y_init][x_init] = "L"; // too lazy to put code that converts start position into a proper pipe
    let distance = 2;

    while (!near(a_pos_y, a_pos_x, b_pos_y, b_pos_x)) {
        [a_from, a_pos_y, a_pos_x] = makeStep(a_from, a_pos_y, a_pos_x, pipes);
        [b_from, b_pos_y, b_pos_x] = makeStep(b_from, b_pos_y, b_pos_x, pipes);
        markAsLoop(a_pos_y, a_pos_x, is_loop);
        markAsLoop(b_pos_y, b_pos_x, is_loop);
        distance += 1;
    }

    let res = distance;
    console.log(res);

    let enclosed = 0;
    let inside = false;
    let prev_pipe = "";

    pipes.forEach((line, y) => {
        line.forEach((pipe, x) => {
            if (!is_loop[y][x]){
                enclosed += inside ? 1 : 0;
                return;
            }

            if (pipe == '|'){
                inside = !inside;
            } else if (pipe == "L") {
                prev_pipe = "L";
            } else if (pipe == "F" ) {
                prev_pipe = "F";
            } else if (pipe == "7" && prev_pipe == "L"){
                prev_pipe = "";
                inside = !inside;
            } else if (pipe == "J" && prev_pipe == "F"){
                prev_pipe = "";
                inside = !inside;
            } else if (pipe == "7" && prev_pipe == "F"){
                prev_pipe = "";
            } else if (pipe == "J" && prev_pipe == "L"){
                prev_pipe = "";
            }
        });
    });

    let res2 = enclosed;
    console.log(res2);
});

const shifts = {
    down: [1, 0],
    right: [0, 1],
    up: [-1, 0],
    left: [0, -1],
};

const moves = {
    down: {
        "L": 'right',
        "|": 'down',
        "J": 'left',
    },
    up: {
        "F": 'right',
        "|": 'up',
        "7": 'left',
    },
    right: {
        "-": 'right',
        "7": 'down',
        "J": 'up',
    },
    left: {
        "L": 'up',
        "F": 'down',
        "-": 'left',
    }
}

function makeStep(from, pos_y, pos_x, pipe_map) {
    const current_pipe = pipe_map[pos_y][pos_x];
    const move = moves[from][current_pipe];
    if (move === undefined) {
        return;
    }
    const [shift_y, shift_x] = shifts[move];
    return [move, pos_y + shift_y, pos_x + shift_x];
};

function markAsLoop(pos_y, pos_x, pipe_map) {
    pipe_map[pos_y][pos_x] = true;
}

function near(a_pos_y, a_pos_x, b_pos_y, b_pos_x) {
    return a_pos_y == b_pos_y && a_pos_x == b_pos_x;
}
