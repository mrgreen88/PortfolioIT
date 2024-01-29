let myNumber = document.querySelector('.number')
myNumber = Math.floor(Math.random() * 20) + 1
console.log(myNumber)

let score = document.querySelector('.btn-check')
let a = 21
score.addEventListener("click", () => {
   a--
   document.querySelector('.score').innerText = a
})

let scoreArr = []

let btnClear = document.querySelector('.btn-again')
let inputs = document.querySelectorAll('input')

btnClear.addEventListener('click', () => {
   console.log('click')
   inputs.forEach(input => input.value = '')
   console.log(inputs)
   document.querySelector('.number').innerText = '?'
   document.body.style.background = '#2a262a'
   document.querySelector('h1').innerText = 'Guess My Number'
   document.querySelector('.high-low').innerText = ''
   document.querySelector('.score').innerText = 20
   document.querySelector('.highscore').innerText = 0
   document.querySelector('.first-play').innerText = scoreArr[0]
   document.querySelector('.second-play').innerText = scoreArr[1]
   document.querySelector('.third-play').innerText = scoreArr[2]
})


function check() {
   let guess = document.querySelector('.guess').value
   let compare = document.querySelector('.high-low')

   if (guess > 0 && guess <= 20) {
      if (guess > myNumber && guess > myNumber + 2) {
         compare.innerText = 'Too hight!'
         compare.style.color = 'red'

      } else if (guess > myNumber && guess < myNumber + 3) {
         compare.innerText = 'You are close!'
         compare.style.color = 'red'

      } else if (guess < myNumber) {
         compare.innerText = 'Too low!'
         compare.style.color = 'blue'

      } else if (myNumber == guess) {
         scoreArr.push(a - 1)
         document.querySelector('.number').innerHTML = myNumber
         document.body.style.background = 'green'
         document.querySelector('h1').innerText = 'Number is guessed!!!'
         compare.innerText = 'You Win!!!'
         compare.style.cssText = 'color: yellow; font-size: 2rem'
         document.querySelector('.highscore').innerText = a - 1
      }
   } else {
      compare.innerText = 'Write number between 1 and 20'
      compare.style.cssText = 'font-size: 15px; color: yellow'
   }
}