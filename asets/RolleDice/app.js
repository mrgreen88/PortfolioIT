"use strict"

//Set variables
const scorePlayer0 = document.getElementById('score--0')
const scorePlayer1 = document.getElementById('score--1')
const currentScorePlayer0 = document.getElementById('current--0')
const currentScorePlayer1 = document.getElementById('current--1')

const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')
const diceImage = document.querySelector('.dice')

const btnRollDice = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const btnNewGame = document.querySelector('.btn--new')

let activePlayer, currentScore, score, playGame, diceNumber, numberClick

// function new game
const initial = function () {
   scorePlayer0.textContent = 0
   scorePlayer1.textContent = 0
   diceImage.classList.add('hidden')

   activePlayer = 0
   currentScore = 0
   score = [0, 0]
   playGame = true
   numberClick = 0
   player0.classList.remove('player--winner')
   player1.classList.remove('player--winner')
   player0.classList.add('player--active')
   player1.classList.remove('player--active')
   currentScorePlayer0.innerHTML = 0
   currentScorePlayer1.innerHTML = 0
}
initial()


// switch player
const switchPlayer = function () {
   // switch player
   document.getElementById(`current--${activePlayer}`).innerHTML = 0
   activePlayer = activePlayer === 0 ? 1 : 0
   currentScore = 0
   player0.classList.toggle('player--active')
   player1.classList.toggle('player--active')
   numberClick = 0
}


// button roll dice functionality
btnRollDice.addEventListener('click', function (e) {
   e.preventDefault()

   if (playGame) {
      diceImage.classList.remove('hidden')
      // Generate random number
      diceNumber = Math.trunc(Math.random() * 6) + 1
      console.log(diceNumber)
      diceImage.src = `./img/dice-${diceNumber}.png`
      numberClick++

      if (numberClick <= 3) {
         playGame
      } else {
         switchPlayer()
      }

      if (diceNumber !== 1) {
         currentScore += diceNumber
         document.getElementById(`current--${activePlayer}`).textContent = currentScore
      } else {
         // switch player
         switchPlayer()
      }
   }

})


// button hold
btnHold.addEventListener('click', function (e) {
   e.preventDefault()

   if (playGame) {
      score[activePlayer] += currentScore
      document.getElementById(`score--${activePlayer}`).innerHTML = score[activePlayer]
      currentScore = 0
      document.getElementById(`current--${activePlayer}`).innerHTML = currentScore

      if (score[activePlayer] >= 21) {
         playGame = false
         document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
         document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
         diceImage.classList.add('hidden')
      } else {
         // switch player
         switchPlayer()
      }
   }
})

// button new game
btnNewGame.addEventListener('click', initial)