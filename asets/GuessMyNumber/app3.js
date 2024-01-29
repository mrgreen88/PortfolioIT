let buttonAgain = document.querySelector('.btn-again')
let buttonCheck = document.querySelector('.btn-check')
let secretNumberElement = document.querySelector('.number')
let guessNumber = document.querySelector('.guess')
let messageText = document.querySelector('.message')
let headerTitle = document.querySelector('h1')
let scoreNumber = document.querySelector('.score')
let highScoreElement = document.querySelector('.highscore')
let firstPlay = document.querySelector('.first-play')
let secondPlay = document.querySelector('.second-play')
let thirdPlay = document.querySelector('.third-play')
let player1 = document.querySelector('.first-label')
let player2 = document.querySelector('.second-label')
let player3 = document.querySelector('.third-label')
player1.innerHTML = 'First player'
player2.innerHTML = 'Second player'
player3.innerHTML = 'Third player'
let body = document.body


// Set initial proprieties in global variables
const initialBodyBackground = body.style.background = '#2a262a'
const initialHeaderTitle = headerTitle.innerHTML
const initialSecretNumberText = secretNumberElement.innerHTML
const initialMessageText = messageText.innerHTML


// Set secret number random
let secretNumber = Math.trunc(Math.random() * 20) + 1
console.log(secretNumber)
let score = 20
let highscore = 0
let arrScore = [Number(firstPlay.innerHTML), Number(secondPlay.innerHTML), Number(thirdPlay.innerHTML)]
let i = 0

buttonCheck.addEventListener('click', function () {
   let guess = Number(guessNumber.value)
   messageText.style.fontSize = '2.5rem'

   // if no number in input
   if (!guess) {
      messageText.innerHTML = 'Write number between 1 and 20'
      messageText.style.cssText = 'font-size: 1.6rem; color: red'
   }
   // if guessed number is too height
   else if (guess === secretNumber) {
      secretNumberElement.innerHTML = secretNumber
      headerTitle.innerText = 'Number is guessed!!!'
      messageText.innerText = 'You Win 🥇🥇🥇'
      messageText.style.cssText = 'color: yellow; font-size: 3rem'
      body.style.cssText = 'background: linear-gradient(to bottom, #3fe78f, #24c884, #09aa78, #008c69, #036f58);'
      confetti(); confetti(); confetti(); confetti(); confetti(); confetti(); confetti(); confetti(); confetti(); confetti(); confetti(); confetti(); confetti()


      // Highscore = score
      if (score > highscore) {
         highscore = score
         highScoreElement.innerHTML = highscore
      }

      // Set score for all players
      for (i = 0; i < arrScore.length; i++) {
         if (arrScore[i] == 0) {
            arrScore[i] = score
            firstPlay.innerHTML = arrScore[0]
            secondPlay.innerHTML = arrScore[1]
            thirdPlay.innerHTML = arrScore[2]
            break
         }
      }


      // Disable buttons after all players play
      if (firstPlay.innerHTML != 0 && secondPlay.innerHTML != 0 && thirdPlay.innerHTML != 0) {
         console.log(arrScore)
         arrScore.sort()
         arrScore.reverse()
         buttonCheck.disabled = true
         buttonAgain.disabled = true
         headerTitle.innerHTML = `Player with ${arrScore[0]} points win the game 🥇🥇🥇 for new game, refresh page`
         headerTitle.style.cssText = 'font-size: 1.9rem'
         body.style.background = 'red'
      }
   }

   // if guessed is to height or to low
   if (guess > secretNumber && guess > secretNumber + 2) {
      if (score > 1) {
         messageText.innerText = 'Too hight..⬆️'
         messageText.style.color = 'red'
         score--
         scoreNumber.innerHTML = score
      }
      else {
         messageText.innerHTML = "You lost the game 😥"
         scoreNumber.innerHTML = 0
      }

   } else if (guess > secretNumber && guess < secretNumber + 3) {
      if (score > 1) {
         messageText.innerText = 'You are close..↖️'
         messageText.style.color = 'red'
         score--
         scoreNumber.innerHTML = score
      } else {
         messageText.innerHTML = "You lost the game 😥"
         scoreNumber.innerHTML = 0
      }

   } else if (guess < secretNumber - 2 && guess < secretNumber) {
      if (score > 1) {
         messageText.innerText = 'Too low..⬇️'
         messageText.style.color = 'blue'
         score--
         scoreNumber.innerHTML = score
      } else {
         messageText.innerHTML = "You lost the game 😥"
         scoreNumber.innerHTML = 0
      }

   } else if (guess > secretNumber - 2 && guess < secretNumber) {
      if (score > 1) {
         messageText.innerText = 'You are close..↘️'
         messageText.style.color = 'blue'
         score--
         scoreNumber.innerHTML = score
      } else {
         messageText.innerHTML = "You lost the game 😥"
         scoreNumber.innerHTML = 0
      }
   }
})


// Set refresh on click button Again
buttonAgain.addEventListener('click', function (event) {
   score = 20
   scoreNumber.innerHTML = score
   secretNumber = Math.trunc(Math.random() * 20) + 1
   console.log(secretNumber)
   document.querySelector('.number').innerHTML = initialSecretNumberText
   body.style.background = initialBodyBackground
   messageText.style.cssText = 'color: white; font-size: 2rem'
   messageText.innerHTML = initialMessageText
   headerTitle.innerHTML = initialHeaderTitle
   document.querySelector('.guess').value = ''
})