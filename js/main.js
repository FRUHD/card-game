let deckID = ''   // Global variable
console.log(localStorage.getItem('myDeck'))

if(!localStorage.getItem('myDeck')) {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')  // Grab a deck
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckID = data.deck_id  // Store Deck ID in variable

        localStorage.setItem('myDeck', deckID)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
} else {
  deckID = localStorage.getItem('myDeck')
  console.log('we have ID')
}

document.getElementById('btn').addEventListener('click', drawTwo)

function drawTwo(){

  document.querySelector('#player1War1').style.display = 'none'
  document.querySelector('#player1War2').style.display = 'none'
  document.querySelector('#player1War3').style.display = 'none'
  document.querySelector('#player2War1').style.display = 'none'
  document.querySelector('#player2War2').style.display = 'none'
  document.querySelector('#player2War3').style.display = 'none'

  const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`  // Grabbin' two cards

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        if (!data.success) {
          fetch(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
          .then(drawTwo())
          return
        }
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
          
          document.getElementById('btn').innerText = "WAR!!!"  // Change the button to WAR
          document.getElementById('btn').removeEventListener('click', drawTwo)
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
  
  document.querySelector('#player1War1').style.display = ''
  document.querySelector('#player1War2').style.display = ''
  document.querySelector('#player1War3').style.display = ''
  document.querySelector('#player2War1').style.display = ''
  document.querySelector('#player2War2').style.display = ''
  document.querySelector('#player2War3').style.display = ''

  fetch(urlWar)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        if (!data.success) {
          fetch(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
          .then(drawWar())
          return
        }
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
        if (player1Valoo === player2Valoo) {
          document.querySelector('h3').innerText = 'This. Is. WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARRRR!!!!!!!!!!!! (again)'
        } else {
          // Change the button back
          document.getElementById('btn').innerText = "Deal Two Cards!"
          document.getElementById('btn').removeEventListener('click', drawWar)
          document.getElementById('btn').addEventListener('click', drawTwo)

          if (player1Valoo > player2Valoo) {
            document.querySelector('h3').innerText = 'PLAYER 1 HAS CONQUERED!'
          } else {
            document.querySelector('h3').innerText = 'PLAYER 2 PREVAILS!'
          }
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

