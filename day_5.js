const fs = require('node:fs');

fs.readFile('input_day_5.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let [seeds, ...maps] = data.split('\r\n\r\n').map(x => x.split(":")[1].trim());
    seeds = seeds.split(' ').map(x => Number(x));
    maps = maps.map(mp => mp.split('\r\n').map(mpline => mpline.split(' ').map(Number)));
    maps.map(mp => mp.sort((l1, l2) => l1[1] - l2[1]));

    let locations = seeds.map(ident => {
        maps.forEach(mp => {
            ident = convertIdentifier(ident, mp);
        })
        return ident;
    });

    let res = Math.min(...locations);
    console.log(res);

    var seed_ranges = [];

    while (seeds.length > 0)
        seed_ranges.push(seeds.splice(0, 2));

    maps.forEach(mp => {
        new_ranges = [];
        seed_ranges.forEach(([range_start, range_length]) => {
            new_ranges.push(... convertIdentifierRange(range_start, range_length, mp));
        });
        seed_ranges = new_ranges;
    });

    seed_ranges.sort((r1, r2) => r1[0] - r2[0]);

    let res2 = seed_ranges[0][0];
    console.log(res2);
});

function convertIdentifier(ident, mp) {
    conversion_line = mp.find(([dr_start, sr_start, r_len]) => sr_start <= ident && sr_start + r_len > ident);
    if (conversion_line) {
        let [dr_start, sr_start, r_len] = conversion_line;
        ident += dr_start - sr_start;
    }
    return ident;
}

function convertIdentifierRange(id_start, id_len, mp) {
    let result = [];

    for (let map_record_index = 0; map_record_index < mp.length; map_record_index++) {
        let [dr_start, sr_start, r_len] = mp[map_record_index];

        if (sr_start + r_len <= id_start) { // map source range before identifier range
            continue;
        }

        if (id_start + id_len <= sr_start) { // map source range after identifier range
            result.push([id_start, id_len]);
            id_len = 0;
            break;
        }

        // map source range and identifier range intersect
        // map source range end is after identifier range start
        // map source range start is before identifier range end

        if (sr_start > id_start && sr_start < id_start + id_len) { // cut off part of the identifier range before map source range
            let res_id_start = id_start;
            let res_id_length = sr_start - id_start;
            result.push([res_id_start, res_id_length]);
            id_len -= res_id_length;
            id_start = sr_start;
        }

        // map source range starts before or at the beginning of identifier range
        let res_id_start = id_start + dr_start - sr_start;
        let res_id_length = Math.min(id_start + id_len, sr_start + r_len) - id_start;

        result.push([res_id_start, res_id_length]);
        id_len -= res_id_length;
        id_start += res_id_length;

        if (id_len == 0){
            break;
        }
    }

    if (id_len > 0){
        result.push([id_start, id_len]);
    }
    return result;
}