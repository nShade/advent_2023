const fs = require('node:fs');

fs.readFile('input_day_7.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    };

    let cards = data.split('\r\n').map(x=> {
        let [hand, score] = x.split(' ');
        return [hand.split(''),  Number(score)];
    });
    
    cards.sort(([hand_1, score_1], [hand_2, score_2]) => compareHands(hand_1, hand_2, handType, card_strength_1));

    let res = cards.map(([hand, score], index) => (index + 1) * score).reduce((a, b) => a + b, 0);
    console.log(res);

    cards.sort(([hand_1, score_1], [hand_2, score_2]) => compareHands(hand_1, hand_2, handType2, card_strength_2));

    console.log(handType2([ 'K', 'T', 'J', 'J', 'T' ]));

    let res2 = cards.map(([hand, score], index) => (index + 1) * score).reduce((a, b) => a + b, 0);
    console.log(res2);
});


const card_strength_1 = {
    2: 0,
    3: 1,
    4: 2,
    5: 3,
    6: 4,
    7: 5,
    8: 6,
    9: 7,
    T: 8,
    J: 9,
    Q: 10,
    K: 11,
    A: 12
}

const card_strength_2 = {
    J: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    T: 9,
    Q: 10,
    K: 11,
    A: 12
}

function compareHands(hand_1, hand_2, hand_type_fn, card_strength){
    let type_1 = hand_type_fn(hand_1);
    let type_2 = hand_type_fn(hand_2);

    if (type_1 == type_2){
        for (let i=0; i< hand_1.length; i++){
            let card_1_str = card_strength[hand_1[i]];
            let card_2_str = card_strength[hand_2[i]];
            if (card_1_str != card_2_str){
                return card_1_str - card_2_str;
            }
        }
    }

    return type_1 - type_2;
}

function handType(hand){
    hand_sorted = {};
    hand.forEach(card => {
        if (hand_sorted[card]){
            hand_sorted[card] += 1;
        } else {
            hand_sorted[card] = 1;
        }
    });

    let result = 0;

    for (card in hand_sorted){
        if (hand_sorted[card] == 2){
            result += 1;
        }
        if (hand_sorted[card] == 3){
            result += 3;
        }        
        if (hand_sorted[card] == 4){
            result += 5;
        }     
        if (hand_sorted[card] == 5){
            result += 6;
        }     
    }    

    return result;
}

function handType2(hand){
    hand_sorted = {};
    let jokers = 0;

    hand.forEach(card => {
        if (card == 'J'){
            jokers++;
            return;
        }
        if (hand_sorted[card]){
            hand_sorted[card] += 1;
        } else {
            hand_sorted[card] = 1;
        }
    });

    let result = 0;

    for (card in hand_sorted){
        if (hand_sorted[card] == 2){
            result += 1;
        }
        if (hand_sorted[card] == 3){
            result += 3;
        }        
        if (hand_sorted[card] == 4){
            result += 5;
        }     
        if (hand_sorted[card] == 5){
            result += 6;
        }     
    }

    for (let i=0; i < jokers; i++){
        if (result == 0 || result == 5){
            result += 1;
            continue;
        } else if (result == 1 || result == 2 || result == 3) {
            result += 2;
        }
    }

    return result;
}