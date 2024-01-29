// Get selectors and set variables
let headerTitle = document.querySelector('h1')
let btnAgain = document.querySelector('.btn-again')
let secretNumber = document.querySelector('.number')
let btnCheck = document.querySelector('.btn-check')
let messageText = document.querySelector('.message')
let scoreNumber = document.querySelector('.score')
let highScore = document.querySelector('.highscore')
let body = document.body

// Set initial proprieties in global variables
const initialBodyBackground = body.style.background = '#2a262a'
const initialHeaderTitle = headerTitle.innerHTML
const initialSecretNumberText = secretNumber.innerHTML
const initialMessageText = messageText.innerHTML

// Set secret number random
secretNumber = Math.floor(Math.random() * 20) + 1
console.log(secretNumber)

// Function count decrease
let count = 21
function decreaseNumber() {
   count--
   scoreNumber.innerHTML = count
}

let arrNumber = [0, 0, 0]

// Function to check if number is correct
function check() {
   let guessNumber = document.querySelector('.guess').value
   messageText.style.fontSize = '2.5rem'
   decreaseNumber()

   if (guessNumber > 0 && guessNumber <= 20) {
      if (guessNumber > secretNumber && guessNumber > secretNumber + 2) {
         messageText.innerText = 'Too hight...'
         messageText.style.color = 'red'

      } else if (guessNumber > secretNumber && guessNumber < secretNumber + 3) {
         messageText.innerText = 'You are close...'
         messageText.style.color = 'red'

      } else if (guessNumber < secretNumber - 2 && guessNumber < secretNumber) {
         messageText.innerText = 'Too low...'
         messageText.style.color = 'blue'

      } else if (guessNumber > secretNumber - 2 && guessNumber < secretNumber) {
         messageText.innerText = 'You are close...'
         messageText.style.color = 'blue'

      } else if (secretNumber == guessNumber) {
         document.querySelector('.number').innerHTML = secretNumber
         headerTitle.innerText = 'Number is guessed!!!'
         messageText.innerText = 'You Win 🥇🥇🥇'
         messageText.style.cssText = 'color: yellow; font-size: 3rem'
         body.style.cssText = 'background: linear-gradient(to bottom, #3fe78f, #24c884, #09aa78, #008c69, #036f58);'
         highScore.innerHTML = scoreNumber.innerHTML
         confetti(); confetti(); confetti(); confetti(); confetti(); confetti(); confetti(); confetti(); confetti(); confetti(); confetti(); confetti(); confetti(); confetti()
         arrNumber.forEach()
         arrNumber.push(scoreNumber.innerHTML)
         document.querySelector('.first-play').innerHTML = arrNumber[0]
         document.querySelector('.second-play').innerHTML = arrNumber[1]
         document.querySelector('.third-play').innerHTML = arrNumber[2]
         console.log(arrNumber)
      }
   } else {
      messageText.innerText = 'Write number between 1 and 20'
      messageText.style.cssText = 'font-size: 15px; color: yellow'
   }
}


// Function to clear all after wining
function clearAll() {
   secretNumber = Math.floor(Math.random() * 20) + 1
   console.log(secretNumber)
   document.querySelector('.number').innerHTML = initialSecretNumberText
   body.style.background = initialBodyBackground
   messageText.style.cssText = 'color: white; font-size: 2rem'
   messageText.innerHTML = initialMessageText
   headerTitle.innerHTML = initialHeaderTitle
   document.querySelector('.guess').value = ''
   scoreNumber.innerText = 20
   count = 21
}
btnAgain.addEventListener('click', clearAll)