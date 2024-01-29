// =============================BANKIST APP=======================
// Date initiale

// Definirea variabilelor
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.summary__value--in')
const labelSumOut = document.querySelector('.summary__value--out')
const labelSumInterest = document.querySelector('.summary__value--interest')
const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements')
const btnLogin = document.querySelector('.login__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')
const inputLoginUser = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')
const body = document.body

// Creaarea conturilor fictive
const account1 = {
   owner: 'Ivan Taetu',
   movements: [1000, 630, -845, 750, 6350, -895, -235, 450],
   interestRate: 1.3,
   pin: 1111,
}

const account2 = {
   owner: 'Victor Nani',
   movements: [1100, -820, 60, -100, 4100, 200, -150, 860],
   interestRate: 1.15,
   pin: 2222,
}

const account3 = {
   owner: 'Vasea Popa',
   movements: [300, 900, -550, 400, 7820, -490, 850, -770],
   interestRate: 0.9,
   pin: 3333,
}

const allAccounts = [account1, account2, account3]

// ---------- MODAL WINDOW------------
document.addEventListener('DOMContentLoaded', () => {
   const modalOpenButtons = document.querySelectorAll('.movements__type')
   const modalWindow = document.querySelector('.modal')
   const modalClose = document.querySelector('.modal__close')
   const depositNumber = document.querySelectorAll('.deposit__number')
   const operationNumber = document.querySelector('.operation__number')
   const modalValue = document.querySelector('.modal__value')
   const depositValue = document.querySelector('.movements__value')


   const noScroll = function () {
      body.classList.remove('no-scroll')
   }

   const modalOpen = function (num) {
      modalWindow.classList.add('show')
      body.classList.add('no-scroll')
      operationNumber.innerHTML = num
      modalValue.innerHTML = depositValue.innerHTML
   }

   // ---- Modal Open -----
   /*modalOpenButtons.forEach(e => {
      e.addEventListener('click', () => {
         modalOpen()
      })
   })*/

   for (let i = 0; i < modalOpenButtons.length; i++) {
      modalOpenButtons[i].addEventListener('click', () => {
         modalOpen(i + 1)
      })
   }


   // ----- Modal Close -----
   modalClose.addEventListener('click', () => {
      modalWindow.classList.remove('show')
      noScroll()
   })


   // ---- When the user clicks anywhere outside of the modal content, close it
   window.onclick = function (event) {
      if (event.target == modalWindow) {
         modalWindow.classList.remove('show')
         noScroll()
      }
   }

   // ---- Close Modal on pres "Esc" on keyboard
   document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
         modalWindow.classList.remove('show')
         noScroll()
      }
   })
})

const displayMovements = function (transactions) {
   containerMovements.innerHTML = ''
   transactions.forEach(function (e, i) {
      const type = e > 0 ? 'deposit' : 'withdrawal'
      const html = `
      <div class="movements__row">
         <div class="movements__type movements__type--${type}"><span class="deposit__number">${i + 1}</span> ${type}</div>
         <div class="movements__date">3 days ago</div>
         <div class="movements__value">${e}</div>
      </div>
   `
      containerMovements.insertAdjacentHTML('afterbegin', html)
   })
}
displayMovements(account1.movements)

const calcBalance = function (account) {
   const ballance = account.movements.reduce((arr, mov) => arr + mov, 0)
   labelBalance.textContent = `${ballance}€`
}

calcBalance(account3)

// ------------- Create Username

const createUserName = function (allAccounts) {
   allAccounts.forEach(function (account) {
      // transforma textul in litere mici
      account.username = account.owner.toLowerCase()
         // transformam 1 string in array unde fiecare element este un cuvint din string
         .split(' ')
         .map(name => name[0])
         .join('')
      console.log(account.username)
   })
}

createUserName(allAccounts)

console.log(account1)

// pentru acasa repetam metodele map, filter, find pentru array





















/*const showMainContent = function (movements) {
   containerMovements.innerHTML = ''
   movements.forEach(function (element, i) {
      const depositType = element > 0 ? 'deposit' : 'withdrawal'
      const transactionItem = `
         <div class="movements__row">
            <div class="movements__type movements__type--${depositType}"><span class="deposit__number">${i + 1}</span> ${depositType}</div>
            <div class="movements__date">3 days ago</div>
            <div class="movements__value">${element}</div>
         </div>
      `
      containerMovements.insertAdjacentHTML('afterbegin', transactionItem)
   })

}
showMainContent(account1.movements)*/