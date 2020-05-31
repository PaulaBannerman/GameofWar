console.log("hello!");
/* Two players start the game by splitting a deck of 52 standard playing cards
evenly. Each stack is facedown, and players cannot look at the cards in their
stack or rearrange them.

The objective of the game is to play until one player has all 52 cards in their
stack. */
let player1Total = document.querySelector('#player1Total')
let player2Total = document.querySelector('#player2Total')
let player1Card = document.querySelector('#player1Card')
let player2Card = document.querySelector('#player2Card')
let player1Status = document.querySelector('#player1Status')
let player2Status = document.querySelector('#player2Status')
let warButton = document.querySelector('.war')
let warInfinite = document.querySelector('.death')
let peace = document.querySelector('.peace')
let uno = document.querySelector('#uno')
let roundCount = document.querySelector('#rounds')
let quitIt = false;
let shuffled = []
let temp = []
let player1Tie = []
let player2Tie = []
let counter = 0;
// thank you Hammad for this lesson...
class Card {
    constructor(suit, rank, score) {
        this.suit = suit;
        this.rank = rank;
        this.score = score;
    }
}
class Deck {
    constructor() {
        this.length = 52;
        this.cards = [];
        const cardSuits = ["hearts", "spades", "clubs", "diamonds"];
        const cardRanks = [
            "Ace",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "Jack",
            "Queen",
            "King"
        ];
        const cardScores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        for (let i = 0; i < cardSuits.length; i++) {
            for (let j = 0; j < cardRanks.length; j++) {
                const card = new Card(cardSuits[i], cardRanks[j], cardScores[j]);
                this.cards.push(card);
            }
        }
    }
}
const deck = new Deck();


//Fisher–Yates Shuffle https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var m = array.length,
        t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    shuffled.push(array)
    return array;
}
//calling to shuffle the array
shuffle(deck.cards)
let player1 = {
    name: 'player 1',
    cards: [],
    total: 0
};
let player2 = {
    name: 'player 2',
    cards: [],
    total: 0
}

player1.cards = shuffled[0].splice(0, 26)
player2.cards = shuffled[0].splice(0, 26)
player1.total = player1.cards.length
player2.total = player2.cards.length

function tied(player) {
    temp.push(player.cards[0])
    player.cards.shift()
    player.cards.push(temp[0])
    temp.length = 0;
    console.log('Tied!')
        /* 

            function winnerCardPushing(winner) {
                for (i = 0; i < player1Tie.length; i++) {
                    winner.cards.push(player1Tie[i])
                }
                for (i = 0; i < player2Tie.length; i++) {
                    winner.cards.push(player2Tie[i])
                }
            }
            player1Tie = player1.cards.splice(0, 3)
            player2Tie = player2.cards.splice(0, 3)

            /* 
            for (i = 0; i < 4; i++) {
                player1Tie.push(player1.cards[i])
                player2Tie.push(player2.cards[i])
            } */

    /*   if (player1.cards[0].score > player2.cards[0].score) {
          winnerCardPushing(player1)
      } else if (player1.cards[0].score < player2.cards[0].score) {
          winnerCardPushing(player2)
      } else {
          tied()
      } * / */

    // player1Tie = player1.cards.splice(0, 3)
    // player2Tie = player1.cards.splice(0, 3)
    /* 
## Bonus

Add the logic to resolve ties the same way as the original card game, where each
player places three more cards face down and reveals a new top card until one
player wins the entire pot. */


}

function cardXchange(winner, looser) {
    info(winner)
    winner.cards.push(looser.cards[0])
    looser.cards.shift()
    temp.push(winner.cards[0])
    winner.cards.shift()
    winner.cards.push(temp[0])
    temp.length = 0;
    player1.total = player1.cards.length
    player2.total = player2.cards.length
    player1Total.innerHTML = `${player1.total}`
    player2Total.innerHTML = `${player2.total}`
    console.log(`player 1 cards: ${player1.total} player 2 cards: ${player2.total}`)

}

function info(winner) {
    player1Card.innerHTML = `${player1.cards[0].rank} of ${player1.cards[0].suit}`
    player2Card.innerHTML = `${player2.cards[0].rank} of ${player2.cards[0].suit}`
    console.log(`player 1 on pulled a ${player1.cards[0].rank} of ${player1.cards[0].suit}`)
    console.log(`player 2 on pulled a ${player2.cards[0].rank} of ${player2.cards[0].suit}`)
    console.log(`Player 1 is the ${winner.name} of the round`)
}

function theWinner(x) {
    uno.style.display = "block"
    x.innerHTML = '<h4 class="text-danger">Winner!! WINNER CHICKEN DINNER!!</h4>'
}

function countingRounds() {
    counter += 1
    rounds.innerHTML = `Number of rounds: ${counter}`
}


function war() {
    if (player1.total == 52 || player1.total == 51) {
        countingRounds()
        console.log(`Winner is Player 1`)
        theWinner(player1Status)
    } else if (player2.total == 52 || player2.total == 51) {
        console.log(`Winner is Player 2`)
        theWinner(player2Status)
    } else {
        if (player1.cards[0].score > player2.cards[0].score) {
            countingRounds()
            cardXchange(player1, player2)

        } else if (player1.cards[0].score < player2.cards[0].score) {
            countingRounds()
            cardXchange(player2, player1)

        } else if (player1.cards[0].score == player2.cards[0].score) {
            countingRounds()
            console.log(`TIED!!!! player 1 on pulled a ${player1.cards[0].rank} of ${player1.cards[0].suit} and player 2 on pulled a ${player2.cards[0].rank} of ${player2.cards[0].suit}`)
            console.log(`player 1 score ${player1.cards[0].score} player 2 score: ${player2.cards[0].score} `)
            tied(player2)
            tied(player1)

        }
    }
}

function infinityWar(x) {
    for (i = 0; i < x; i++) {
        war()
    }

}
warButton.addEventListener("click", function(evt) {
    evt.preventDefault()
    war();
})
warInfinite.addEventListener("click", function(evt) {
    evt.preventDefault();
    infinityWar(10);
})
peace.addEventListener("click", function(evt) {
    evt.preventDefault();
    infinityWar(50);
})