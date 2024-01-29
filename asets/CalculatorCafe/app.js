let calculate = document.querySelector('.btn')
calculate.addEventListener('click', function (e) {
   e.preventDefault()
   const totalBillAmount = document.getElementById('total').value
   const serviceLevel = document.querySelector('input[type="radio"]:checked').value
   const numberOfPersons = document.querySelector('select').value
   const resultTotal = document.querySelector('.total-per-person')
   const result = (Number(totalBillAmount) + (Number(totalBillAmount) * serviceLevel) / 100) / Number(numberOfPersons)
   resultTotal.textContent = result.toFixed(2)
})