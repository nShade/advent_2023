const fs = require('node:fs');

fs.readFile('input_day_8.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let [directions, _, ... nodes] = data.split('\r\n');
    directions = directions.split('');
    let node_map = {};

    nodes.forEach(x => {
        node_map[x.slice(0, 3)] = {"L": x.slice(7, 10), "R": x.slice(12, 15)};
    });

    let res = findDistance('AAA', node_map, directions, x => x == 'ZZZ')
    console.log(res);

    let current_nodes = Object.keys(node_map).filter(x => x.endsWith('A'));
    let periods = current_nodes.map(current_node => findDistance(current_node, node_map, directions, x => x.endsWith('Z')));
    let res2 = periods.reduce(lcm);
    console.log(res2);
});

function lcm(n1, n2){
    return (n1 * n2) / hcf(n1, n2);
}

function hcf(n1, n2){
    let res = 1;
    for (let prime of primes(n1 < n2 ? n1 : n2)) {

        if( n1 % prime == 0 && n2 % prime == 0) {
            res = prime;
        }
    }
    return res;
}

function primes(limit) {
    let res = [1, 2, 3, 5, 7, 11, 13, 17, 19]

    if (limit < 20){
        return res.filter(x => x < limit);
    }

    for (let i = 20; i < limit; i++){
        is_prime = true;
        for (let prime of res.slice(1).filter(x => x <= Math.ceil(i ** 0.5))){
            if (i % prime == 0){
                is_prime = false;
                break;
            }
        }
        if (is_prime){
            res.push(i);
        }
    }

    return res;
}

function findDistance(current_node, node_map, directions, condition_fn){
    direction_index = 0;
    let distance = 0;
    let direction;

    while(!condition_fn(current_node)){
        direction = directions[direction_index];

        if (direction == undefined){
            direction_index = 0;
            direction = directions[direction_index];
        }

        direction_index++;
        current_node = node_map[current_node][direction];
        distance++;
    }   

    return distance;
}