// Currency dropdown logic
const currencySelectBox = document.querySelector('.header2__currencyBox-wrapper')
const currencyActiveValue = document.querySelector('.header2__currencyBox-wrapper-activeCurrency')
const currencyDropdownMenu = document.querySelector('.header2__currencyBox-dropdownMenu')
const currencyDropdownMenuItem = document.querySelectorAll('.header2__currencyBox-dropdownMenu-item')

currencySelectBox.addEventListener('click', () => {
  currencyDropdownMenu.classList.toggle('hidden')
  currencySelectBox.classList.toggle('grayText')
})

currencyDropdownMenuItem.forEach(item => {
  item.addEventListener('click', () => {
    currencyActiveValue.textContent = item.textContent
    currencyDropdownMenu.classList.toggle('hidden')
  })
})

document.addEventListener('click', (e) => {
  if (!currencySelectBox.contains(e.target)) {
    currencyDropdownMenu.classList.add('hidden')
  }
})