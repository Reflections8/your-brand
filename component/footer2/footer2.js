// Currency dropdown logic
const footerCurrencySelectBox = document.querySelector('.footer2__wrapper-socialWrapper-currencyBox-activeCurrency')
const footerCurrencyActiveValue = document.querySelector('.footer2__wrapper-socialWrapper-currencyBox-activeCurrency-value')
const footerCurrencyDropdownMenu = document.querySelector('.footer2__wrapper-socialWrapper-currencyBox-dropdownMenu')
const footerCurrencyDropdownMenuItem = document.querySelectorAll('.footer2__wrapper-socialWrapper-currencyBox-dropdownMenu-item')


footerCurrencySelectBox.addEventListener('click', () => {
  footerCurrencyDropdownMenu.classList.toggle('hidden')
  footerCurrencySelectBox.classList.toggle('grayText')
})

footerCurrencyDropdownMenuItem.forEach(item => {
  item.addEventListener('click', () => {
    footerCurrencyActiveValue.textContent = item.textContent
    footerCurrencyDropdownMenu.classList.toggle('hidden')
  })
})

document.addEventListener('click', (e) => {
  if (!footerCurrencySelectBox.contains(e.target)) {
    footerCurrencyDropdownMenu.classList.add('hidden')
  }
})