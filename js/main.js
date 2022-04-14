let deckID = ''   // Global variable

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')  // Grab a deck
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckID = data.deck_id  // Store Deck ID in variable
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

document.getElementById('btn').addEventListener('click', drawTwo)

function drawTwo(){
  const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`  // Grabbin' two cards

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image
        let player1Valoo = convertToNum(data.cards[0].value)
        let player2Valoo = convertToNum(data.cards[1].value)
        if (player1Valoo > player2Valoo) {
          document.querySelector('h3').innerText = 'Player 1 Won!'
        } else if (player1Valoo < player2Valoo) {
          document.querySelector('h3').innerText = 'Player 2 Wins!'
        } else {
          document.querySelector('h3').innerText = 'This. Is. WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARRRR!!!!!!!!!!!!'
          
          document.getElementById('btn').innterText = "WAR!!!"  // Change the button to WAR
          document.getElementById('btn').addEventListener('click', drawWar) // Draw 8 cards        
        }

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
function convertToNum(val) {
  if (val === 'ACE') {
    return 14
  } else if (val === 'KING') {
    return 13
  } else if (val === 'QUEEN') {
    return 12
  } else if (val === 'JACK') {
    return 11
  } else {
    return Number(val)
  }
}

function drawWar(){
  const urlWar = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=8`  // Grabbin' eight cards

  fetch(urlWar)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#player1').src = data.cards[3].image
          document.querySelector('#player1War1').src = data.cards[0].image
          document.querySelector('#player1War2').src = data.cards[1].image
          document.querySelector('#player1War3').src = data.cards[2].image
        document.querySelector('#player2').src = data.cards[7].image
          document.querySelector('#player2War1').src = data.cards[4].image
          document.querySelector('#player2War2').src = data.cards[5].image
          document.querySelector('#player2War3').src = data.cards[6].image
        let player1Valoo = convertToNum(data.cards[3].value)
        let player2Valoo = convertToNum(data.cards[7].value)
        if (player1Valoo > player2Valoo) {
          document.querySelector('h3').innerText = 'PLAYER 1 HAS CONQUERED!'
        } else if (player1Valoo < player2Valoo) {
          document.querySelector('h3').innerText = 'PLAYER 2 PREVAILS!'
        } else {
          document.querySelector('h3').innerText = 'This. Is. WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARRRR!!!!!!!!!!!! (again)'
          
          document.getElementById('btn').innterText = "WAR!!!"  // Change the button to WAR
          document.getElementById('btn').addEventListener('click', drawWar) // Draw 8 cards   
        }
        // Change the button back
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

// Store deck to local storage