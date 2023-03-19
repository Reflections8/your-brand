document.addEventListener('DOMContentLoaded', () => {
  const filterButton = document.querySelector('.catalogGrid__filters')
  const filterPopup = document.querySelector('.catalog-filters')
  const filterPopupContent = document.querySelector('.catalog-filters__content')
  const filterPopupCloseIcon = document.querySelector('.catalog-filters__content-header-icon')


  filterButton.addEventListener('click', () => {
    filterPopup.classList.remove('hidden')
  })

  filterPopupCloseIcon.addEventListener('click', () => {
    filterPopup.classList.add('hidden')
  })

  document.addEventListener('click', (e) => {
    if (filterPopup.classList.contains('hidden')) {
      return
    } else {
      if (e.target === filterPopup) {
        filterPopup.classList.add('hidden')
      }
    }
  })
})