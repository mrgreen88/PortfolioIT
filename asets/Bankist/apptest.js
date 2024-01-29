// =============================BANKIST APP=======================
// Date initiale

function formatDate(date) {
   const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
   }
   return date.toLocaleDateString("en-US", options);
}

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
   movements: [1000, -845, 750, 4350, -895, -580, -235, 450, 745, 520, -120],
   interestRate: 1.3,
   pin: 1111,
   cardNumber: '1234 5678 1234 5678',
}
const account2 = {
   owner: 'Victor Nani',
   movements: [1100, -820, 60, -100, 4100, 200, -150, 860],
   interestRate: 1.15,
   pin: 2222,
   cardNumber: '2345 6789 2345 6789',
}
const account3 = {
   owner: 'Vasea Popa',
   movements: [300, 900, -550, 400, 7820, -490, 850, -770],
   interestRate: 0.9,
   pin: 3333,
   cardNumber: '3456 7890 3456 7890',
}
const allAccounts = [account1, account2, account3]


// ------------- Create Username

const createUserName = function (allAccounts) {
   allAccounts.forEach(function (account) {
      // transforma textul in litere mici
      account.username = account.owner.toLowerCase()
         // transformam 1 string in array unde fiecare element este un cuvint din string
         .split(' ')
         .map(name => name[0])
         .join('')
   })
}
createUserName(allAccounts)


const showMainContent = function (movements, sortAsc, sortDesc) {

   containerMovements.innerHTML = ''
   const copyOfMov1 = movements.map((a) => a)
   const copyOfMov2 = sortAsc ? copyOfMov1.sort((a, b) => a - b) : movements

   copyOfMov2.forEach(function (element, i) {
      const depositType = element > 0 ? 'deposit' : 'withdrawal'
      const transactionItem = `
         <div class="movements__row">
            <div class="movements__type movements__type--${depositType}"><span class="deposit__number">${i + 1}</span> ${depositType}</div>
            <div class="movements__date">${formatDate(new Date())}</div>
            <div class="movements__value">${element}</div>
         </div>
      `
      containerMovements.insertAdjacentHTML('afterbegin', transactionItem)
   })
}

// ----- Show total value per account -------
const calcBalance = function (account) {
   const ballance = account.movements.reduce((arr, mov) => arr + mov, 0)
   account.ballance = ballance // adaugam proprietate la fiecare cont
   labelBalance.textContent = `${ballance}€`
}

// -------- Calc all income and outcome value per account ------
const incomeOutputSum = function (acc) {
   const inSum = acc.movements.filter(mov => mov > 0)
      .reduce((acc, mov) => acc + mov, 0)
   labelSumIn.textContent = `${inSum}€`
   const outSum = acc.movements.filter(mov => mov <= 0)
      .reduce((acc, mov) => acc + mov, 0)
   labelSumOut.textContent = `${Math.abs(outSum)}€`
   const interest = (inSum * acc.interestRate / 100).toFixed(2)
   labelSumInterest.textContent = `${interest}€`
}

// --------- User Login ---------------

let findUser
btnLogin.addEventListener('click', function (event) {
   event.preventDefault()
   findUser = allAccounts.find(acc => acc.username === inputLoginUser.value)

   if (findUser?.pin === Number(inputLoginPin.value)) {
      // ----------- Afisam informatia despre content 
      labelWelcome.textContent = `Welcome, ${findUser.owner.split(' ')[0]}`
      containerApp.style.opacity = '1'
      inputLoginUser.value = ''
      inputLoginPin.value = ''
      inputLoginPin.blur()

      showMainContent(findUser.movements)
      calcBalance(findUser)
      incomeOutputSum(findUser)

      const modal = function () {
         // ---------- Modal Window --------------
         const modalOpenButtons = document.querySelectorAll('.movements__type')
         const modalWindow = document.querySelector('.modal')
         const modalClose = document.querySelector('.modal__close')

         const modalCreate = function (element, index) {
            const modalContentDetails = document.querySelector('.modal__description')
            modalContentDetails.innerHTML = ''
            const depositType = element > 0 ? 'deposit' : 'withdrawal'
            const details =
               `
                  <div class="description__row">
                     <p>Owner</p><p>${findUser.owner}</p>
                  </div>
                  <div class="description__row">
                     <p>Card number</p><p>${findUser.cardNumber}</p>
                  </div>
                  <div class="description__row">
                     <p>Data</p><time>${formatDate(new Date())}</time>
                  </div>
                  <div class="description__row">
                     <p>Status</p><p>Processed</p>
                  </div>
                  <div class="description__row">
                     <p>Type</p><p class="modal__background">${depositType.charAt(0).toUpperCase() + depositType.slice(1)}</p>
                  </div>
                  <div class="description__row">
                     <p>Number operation</p><p class="operation__number">${index}</p>
                  </div>
                  <div class="description__row">
                     <p>Amount</p><p class="movements__value">${element}</p>
                  </div>
                  <div class="description__row">
                     <p>Current balance</p><p class="movements__value">${findUser.movements.reduce((arr, mov) => arr + mov, 0)}</p>
                  </div>
               `
            modalContentDetails.insertAdjacentHTML('afterbegin', details)
            const modalBack = document.querySelector('.modal__background')
            const modalContent = document.querySelector('.modal__content')

            if (modalBack.innerHTML == 'Withdrawal') {
               modalContent.classList.add('movements__type--withdrawal')
            } else {
               modalContent.classList.remove('movements__type--withdrawal')
            }
         }
         const noScroll = function () {
            body.classList.remove('no-scroll')
         }
         const modalOpen = function () {
            modalWindow.classList.add('show')
            body.classList.add('no-scroll')
         }
         for (let i = 0; i < modalOpenButtons.length; i++) {
            modalOpenButtons[i].addEventListener('click', () => {
               console.log(modalOpenButtons[i])
               modalCreate(findUser.movements.toReversed()[i], findUser.movements.length - i)
               modalOpen()
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

      }

      modal()

   }

   btnTransfer.addEventListener('click', function (e) {
      e.preventDefault()

      const amount = Number(inputTransferAmount.value)
      const userTransfer = inputTransferTo.value

      inputTransferAmount.value = inputTransferTo.value = ''
      // ----- Transfer ------
      // ----- Find user to transfer to
      const receiverAccount = allAccounts.find(acc => acc.username === userTransfer)

      // ----- Checking amount and user
      if (amount <= findUser.ballance && amount > 0 && receiverAccount) {
         // ----- minus amount in findUser
         findUser.movements.push(-amount)
         // ----- Plus amount in receiver account
         receiverAccount.movements.push(amount)
      } else {
         alert("Insufficient funds in your account")
      }

      // ------ Update UI -----
      showMainContent(findUser.movements)
      calcBalance(findUser)
      incomeOutputSum(findUser)
      const modal = function () {
         // ---------- Modal Window --------------
         const modalOpenButtons = document.querySelectorAll('.movements__type')
         const modalWindow = document.querySelector('.modal')
         const modalClose = document.querySelector('.modal__close')

         const modalCreate = function (element, index) {
            const modalContentDetails = document.querySelector('.modal__description')
            modalContentDetails.innerHTML = ''
            const depositType = element > 0 ? 'deposit' : 'withdrawal'
            const details =
               `
                  <div class="description__row">
                     <p>Owner</p><p>${findUser.owner}</p>
                  </div>
                  <div class="description__row">
                     <p>Card number</p><p>${findUser.cardNumber}</p>
                  </div>
                  <div class="description__row">
                     <p>Data</p><time>${formatDate(new Date())}</time>
                  </div>
                  <div class="description__row">
                     <p>Status</p><p>Processed</p>
                  </div>
                  <div class="description__row">
                     <p>Type</p><p class="modal__background">${depositType.charAt(0).toUpperCase() + depositType.slice(1)}</p>
                  </div>
                  <div class="description__row">
                     <p>Number operation</p><p class="operation__number">${index}</p>
                  </div>
                  <div class="description__row">
                     <p>Amount</p><p class="movements__value">${element}</p>
                  </div>
                  <div class="description__row">
                     <p>Current balance</p><p class="movements__value">${findUser.movements.reduce((arr, mov) => arr + mov, 0)}</p>
                  </div>
               `
            modalContentDetails.insertAdjacentHTML('afterbegin', details)
            const modalBack = document.querySelector('.modal__background')
            const modalContent = document.querySelector('.modal__content')

            if (modalBack.innerHTML == 'Withdrawal') {
               modalContent.classList.add('movements__type--withdrawal')
            } else {
               modalContent.classList.remove('movements__type--withdrawal')
            }
         }
         const noScroll = function () {
            body.classList.remove('no-scroll')
         }
         const modalOpen = function () {
            modalWindow.classList.add('show')
            body.classList.add('no-scroll')
         }
         for (let i = 0; i < modalOpenButtons.length; i++) {
            modalOpenButtons[i].addEventListener('click', () => {
               console.log(modalOpenButtons[i])
               modalCreate(findUser.movements.toReversed()[i], findUser.movements.length - i)
               modalOpen()
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

      }

      modal()
   })

   btnClose.addEventListener('click', function (e) {
      e.preventDefault()

      const userToDelete = inputCloseUsername.value
      const userPinToDelete = Number(inputClosePin.value)

      if (userToDelete === findUser.username && userPinToDelete === findUser.pin) {
         const index = allAccounts.findIndex(acc => acc.username === findUser.username)
         console.log(index)
         // stergem contul gasit
         allAccounts.splice(index, 1)
         // ascundem continutul
         containerApp.style.opacity = 0
         // golim imputurile formularului
         inputCloseUsername.value = inputClosePin.value = ''
         // schimbam mesajul de salut
         labelWelcome.textContent = 'Log in to get started'
      } else {
         alert('Datele nu coincid')
      }
   })

   btnLoan.addEventListener('click', function (e) {
      e.preventDefault()
      const amount = Number(inputLoanAmount.value)
      if (amount > 0 && amount <= (findUser.movements.reduce((arr, mov) => arr + mov, 0) * 0.3)) {
         findUser.movements.push(amount)

         // ------ Update UI -----
         showMainContent(findUser.movements)
         calcBalance(findUser)
         incomeOutputSum(findUser)
         const modal = function () {
            // ---------- Modal Window --------------
            const modalOpenButtons = document.querySelectorAll('.movements__type')
            const modalWindow = document.querySelector('.modal')
            const modalClose = document.querySelector('.modal__close')

            const modalCreate = function (element, index) {
               const modalContentDetails = document.querySelector('.modal__description')
               modalContentDetails.innerHTML = ''
               const depositType = element > 0 ? 'deposit' : 'withdrawal'
               const details =
                  `
                     <div class="description__row">
                        <p>Owner</p><p>${findUser.owner}</p>
                     </div>
                     <div class="description__row">
                        <p>Card number</p><p>${findUser.cardNumber}</p>
                     </div>
                     <div class="description__row">
                        <p>Data</p><time>${formatDate(new Date())}</time>
                     </div>
                     <div class="description__row">
                        <p>Status</p><p>Processed</p>
                     </div>
                     <div class="description__row">
                        <p>Type</p><p class="modal__background">${depositType.charAt(0).toUpperCase() + depositType.slice(1)}</p>
                     </div>
                     <div class="description__row">
                        <p>Number operation</p><p class="operation__number">${index}</p>
                     </div>
                     <div class="description__row">
                        <p>Amount</p><p class="movements__value">${element}</p>
                     </div>
                     <div class="description__row">
                        <p>Current balance</p><p class="movements__value">${findUser.movements.reduce((arr, mov) => arr + mov, 0)}</p>
                     </div>
                  `
               modalContentDetails.insertAdjacentHTML('afterbegin', details)
               const modalBack = document.querySelector('.modal__background')
               const modalContent = document.querySelector('.modal__content')

               if (modalBack.innerHTML == 'Withdrawal') {
                  modalContent.classList.add('movements__type--withdrawal')
               } else {
                  modalContent.classList.remove('movements__type--withdrawal')
               }
            }
            const noScroll = function () {
               body.classList.remove('no-scroll')
            }
            const modalOpen = function () {
               modalWindow.classList.add('show')
               body.classList.add('no-scroll')
            }
            for (let i = 0; i < modalOpenButtons.length; i++) {
               modalOpenButtons[i].addEventListener('click', () => {
                  console.log(modalOpenButtons[i])
                  modalCreate(findUser.movements.toReversed()[i], findUser.movements.length - i)
                  modalOpen()
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

         }

         modal()

      } else {
         alert("Your current balance is smaller than 30% of requested loan")
      }

      inputLoanAmount.value = ''
   })

   // Sortare
   let sortAsc = false
   btnSort.addEventListener('click', function (e) {
      e.preventDefault()
      showMainContent(findUser.movements, !sortAsc)
      sortAsc = !sortAsc
   })

   // --- De creat conditie care sa accepte numai cereri cu sume mai mici decit 30% din balanta

})