const fs = require('node:fs');

fs.readFile('input_day_4.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let cards = data.split('\r\n')
                    .map(x => {
                        return x.split(':')[1]
                                .split('|')
                                .map(y => {return y.split(' ')
                                                   .filter(z => !(z == ''))
                                                   .map(Number)});
                    });

    let cards_wins = cards.map(([on_card, winning]) => on_card.filter(n => winning.includes(n)).length)

    let res = sum_winning(cards_wins);
    console.log(res);

    let res2 = count_cards(cards_wins);
    console.log(res2);
})

function sum_winning(cards_wins){
    return cards_wins.reduce((score, wins) => score += wins == 0 ? 0 : 2 ** (wins - 1), 0)
}

function count_cards(cards_wins){
    let cards_count = cards_wins.map(x => 1);

    cards_wins.forEach((wins, index) => {
        for (let i = index + 1; (i < index + wins + 1) && (i < cards_count.length); i++){
            cards_count[i] += cards_count[index];
        }        
    });

    return cards_count.reduce(sum, 0);
}

sum = (a, b)=> a + b;
