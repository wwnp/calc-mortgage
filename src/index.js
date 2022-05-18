import "./style.css";

const propCost = document.getElementById('propCost')
const propCostRange = document.getElementById('propCostRange')
const initialFee = document.getElementById('initialFee')
const initialFeeRange = document.getElementById('initialFeeRange')
const creditTerm = document.getElementById('creditTerm')
const creditTermRange = document.getElementById('creditTermRange')
const amountCredit = document.getElementById('amountCredit')
const monthlyPayment = document.getElementById('monthlyPayment')
const recommendedIncome = document.getElementById('recommendedIncome')

const inputsRange = document.querySelectorAll('.input-range')
const btnsBank = document.querySelectorAll('.bank')
const inputsNumber = document.querySelectorAll('.input-number')

const banks = [
  {
    name: 'alfa',
    percent: 8.7,
  },
  {
    name: 'sberbank',
    percent: 8.4,
  },
  {
    name: 'pochta',
    percent: 7.9,
  },
  {
    name: 'tinkoff',
    percent: 9.2,
  },
]
let currentPercent = banks[0].percent

inputsRange.forEach((range) => {
  range.addEventListener('input', () => {
    assignValuesFromRange()
    calculate(propCost.value, initialFee.value, creditTerm.value)
  })
})
function assignValuesFromRange() {
  propCost.value = propCostRange.value
  initialFee.value = initialFeeRange.value
  creditTerm.value = creditTermRange.value
}


for (const btn of btnsBank) {
  btn.addEventListener('click', (e) => {
    removeActiveFromBanks()
    e.target.classList.add('btn-active')
    const currentBank = banks.find(bank => bank.name === e.target.dataset.bank)
    currentPercent = currentBank.percent
    calculate(propCost.value, initialFee.value, creditTerm.value)
  })
}
function removeActiveFromBanks() {
  for (const btn of btnsBank) {
    btn.classList.remove('btn-active')
  }
}

for (const input of inputsNumber) {
  input.addEventListener('input', (e) => {
    let value = e.target.value
    if (e.target.dataset.type === 'cost') {
      if (value < 1) e.target.value = 1;
      if (value > 30000) e.target.value = 30000;
    }
    if (e.target.dataset.type === 'fee') {
      if (value < 1) e.target.value = 1;
      if (value > 3000) e.target.value = 3000;
    }
    if (e.target.dataset.type === 'term') {
      if (value < 1) e.target.value = 1;
      if (value > 20) e.target.value = 20;
    }
    assignRangeFromNumber()
  })
}
function assignRangeFromNumber() {
  propCostRange.value = propCost.value
  initialFeeRange.value = initialFee.value
  creditTermRange.value = creditTerm.value
}


function calculate(totalCost = 10000, anInitialFee = 100000, creditTerm = 1) {
  let calcMonthlyPayment;
  let calcLounAmount = totalCost - anInitialFee;
  let calcInterestRate = currentPercent
  let calcNumberOfYears = creditTerm
  let calcNumberOfMonths = 12 * calcNumberOfYears

  calcMonthlyPayment = Math.round((calcLounAmount + (((calcLounAmount / 100) * calcInterestRate) / 12) * calcNumberOfMonths) / calcNumberOfMonths)
  if (calcMonthlyPayment > 0) {
    amountCredit.innerHTML = calcLounAmount + 'p'
    monthlyPayment.innerHTML = calcMonthlyPayment + 'p'
    recommendedIncome.innerHTML = `${(calcMonthlyPayment + (calcMonthlyPayment * 0.35)).toFixed(2)} p`
    return true
  }
  return false

}