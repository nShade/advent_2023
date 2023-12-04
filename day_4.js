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
                                                   .filter(z => {return !(z == '')})
                                                   .map(m=> {return Number(m)})})
                    });

    let res = sum_winning(cards);
    console.log(res);

    let res2 = count_cards(cards);
    console.log(res2);
})

function sum_winning(cards){
    return cards.map(([on_card, winning]) => {
        let have_winning = on_card.filter(n => {return winning.includes(n)}).length;
        return have_winning == 0 ? 0 : 2 ** (have_winning - 1);
    }).reduce(sum, 0);
}

function count_cards(cards){
    let cards_count = cards.map(x=> {return 1});

    let cards_winning = cards.map(([on_card, winning]) => {
        return on_card.filter(n => {return winning.includes(n)}).length;

    })

    cards_winning.forEach((winning, index) => {
        for (let i = index + 1; (i < index + winning + 1) && (i < cards_count.length); i++){
            cards_count[i] += cards_count[index];
        }
    });

    return cards_count.reduce(sum, 0);
}

sum = (a, b)=> {return a + b};
