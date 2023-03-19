document.addEventListener('DOMContentLoaded', () => {
  // Filter dropdown logic
  const filterSelectBox = document.querySelector('.catalogGrid__header-select')
  const filterSelectBoxArrow = document.querySelector('.catalogGrid__header-select-icon')
  const filterActiveValue = document.querySelector('.catalogGrid__header-select-text')
  const filterDropdownMenu = document.querySelector('.catalogGrid__header-select-dropdownMenu')
  const filterDropdownMenuItem = document.querySelectorAll('.catalogGrid__header-select-dropdownMenu-item')


  filterSelectBox?.addEventListener('click', () => {
    filterDropdownMenu.classList.toggle('hidden')
  })

  let colorBoxes

  const getProductsByCategory = async (key) => {
    setLoadingStatus(true)
    return fetch(`component/catalogGrid/${key}.json`)
      .then(res => res.json()
        .then(data => {
          catalogWrapper.innerHTML = ''
          data.map(item => {
            catalogWrapper.insertAdjacentHTML('beforeend', `
            <div class="catalogGrid__wrapper-item" data-id=${item.id}>
                <div class="catalogGrid__wrapper-item-imgWrapper">
                    <!-- Default image -->
                    <img loading="lazy" src=${item.defaultImg} alt="catalog-item" class="catalogGrid__wrapper-item-imgWrapper-defaultImg">
                    <!-- Image on hover -->
                    <img loading="lazy" src=${item.hoverImg} alt="catalog-item" class="catalogGrid__wrapper-item-imgWrapper-hoverImg">
                    
                    <!-- Colored boxes -->
                    <div class="catalogGrid__wrapper-item-offerBox">
                        ${item.isNew ? `<div class="catalogGrid__wrapper-item-offerBox-green">Новинка</div>` : ''}
                        ${item.isBestseller ? `<div class="catalogGrid__wrapper-item-offerBox-yellow">Бестселлер</div>` : ''}
                        ${item.isDiscounted ? `<div class="catalogGrid__wrapper-item-offerBox-red">Скидка 40%</div>` : ''}
                    </div>

                    <!-- Elements on hover -->
                    <button class="catalogGrid__wrapper-item-button">В корзину</button>

                    <div class="catalogGrid__wrapper-item-favoriteIconWrapper">
                        <img src="component/catalogGrid/img/favorite-icon.svg" alt="favorite" class="catalogGrid__wrapper-item-favoriteIconWrapper-icon">

                        <!-- Tooltip -->
                        <div class="catalogGrid__wrapper-item-favoriteIconWrapper-tooltip">В избранное</div>
                    </div>
                </div>
                <div class="catalogGrid__wrapper-item-info">
                    <div class="catalogGrid__wrapper-item-info-title">${item.title}</div>

                    <div class="catalogGrid__wrapper-item-info-prices">
                        <div class="catalogGrid__wrapper-item-info-prices-main">${item.oldPrice} ₽</div>
                        <div class="catalogGrid__wrapper-item-info-prices-old">${item.newPrice} ₽</div>
                    </div>

                <div class="catalogGrid__wrapper-item-info-colorIcons">
                    <div class="catalogGrid__wrapper-item-info-colorIcons-item" data-color="blue" data-id=${item.id}>
                        <div class="catalogGrid__wrapper-item-info-colorIcons-item-default">
                            <div class="catalogGrid__wrapper-item-info-colorIcons-item-default-inner"></div>
                        </div>
                    <!-- Tooltip -->
                    <div class="catalogGrid__wrapper-item-info-colorIcons-item-tooltip">
                    Голубой
                    </div>
                </div>
                <div class="catalogGrid__wrapper-item-info-colorIcons-item" data-color="pink" data-id=${item.id}>
                <div class="catalogGrid__wrapper-item-info-colorIcons-item-full"></div>
                <!-- Tooltip -->
                <div class="catalogGrid__wrapper-item-info-colorIcons-item-tooltip">
                Розовый
                </div>
                </div>
                </div>
                </div>
                </div>
          `)
          })
        }))
      .catch(e => {
        throw new Error(e)
      })
      .finally(() => {
        setTimeout(() => setLoadingStatus(false), 500)
        getColorBoxes()
      })
  }

  const catalogWrapper = document.querySelector('.catalogGrid__wrapper')
  getProductsByCategory(document.body.classList.contains('catalog') ? 'catalogPageData' : 'bestSellers')

  filterDropdownMenuItem.forEach(item => {
    item.addEventListener('click', () => {
      const key = item.getAttribute('key')
      filterActiveValue.textContent = item.textContent
      filterDropdownMenu.classList.remove('hidden')
      getProductsByCategory(key)
    })
  })

// Color boxes
  const getColorBoxes = () => {
    colorBoxes = document.getElementsByClassName('catalogGrid__wrapper-item-info-colorIcons-item')
    for (const item of colorBoxes) {
      item.addEventListener('click', () => {
        const color = item.getAttribute('data-color')
        const id = item.getAttribute('data-id')
        getImageByColor(id, color)
      })
    }
  }


  const getImageByColor = async (id, color) => {
    fetch(`component/catalogGrid/colorImages.json`)
      .then(res => res.json()
        .then(data => {
          const filteredData = data.filter(item => item.id === Number(id))
          const thisColor = filteredData[0][color]
          const thisProduct = document.querySelector(`[data-id='${id}']`)

          const defaultImg = thisProduct.querySelector('.catalogGrid__wrapper-item-imgWrapper-defaultImg')
          const hoverImg = thisProduct.querySelector('.catalogGrid__wrapper-item-imgWrapper-hoverImg')

          defaultImg.setAttribute('src', thisColor.defaultImg)
          hoverImg.setAttribute('src', thisColor.hoverImg)
        }))
  }

  document.addEventListener('click', (e) => {
    if (!filterSelectBox?.contains(e.target)) {
      filterDropdownMenu?.classList.add('hidden')
    }

    if (!filterDropdownMenu?.classList.contains('hidden')) {
      filterSelectBoxArrow?.setAttribute('style', 'transform: rotate(180deg);')
    } else {
      filterSelectBoxArrow?.removeAttribute('style')
    }
  })
})

// Sort dropdown logic
const sortingSelectBox = document.querySelector('.catalogGrid__sortBox-activeSorting')
const sortingSelectBoxIcon = document.querySelector('.catalogGrid__sortBox-activeSorting-icon')
const sortingActiveValue = document.querySelector('.catalogGrid__sortBox-activeSorting-value')
const sortingDropdown = document.querySelector('.catalogGrid__sortBox-dropdownMenu')
const sortingDropdownItem = document.querySelectorAll('.catalogGrid__sortBox-dropdownMenu-item')
const sortingMobilePopup = document.querySelector('.catalogGrid__sortBox-mobile')
const sortingMobileListItem = document.querySelectorAll('.catalogGrid__sortBox-mobile-content-list-item')

sortingSelectBox.addEventListener('click', () => {
  if (window.innerWidth <= 768) {
    sortingMobilePopup.classList.toggle('hidden')
  } else {
    sortingDropdown.classList.toggle('hidden')
  }
})

sortingDropdownItem.forEach(item => {
  item.addEventListener('click', () => {
    sortingActiveValue.textContent = item.textContent
    sortingDropdown.classList.toggle('hidden')
  })
})

document.addEventListener('click', (e) => {
  if (!sortingSelectBox.contains(e.target)) {
    sortingDropdown.classList.add('hidden')
  }

  if (sortingDropdown.classList.contains('hidden')) {
    sortingSelectBoxIcon.classList.remove('rotated')
  } else {
    sortingSelectBoxIcon.classList.add('rotated')
  }

  // Mobile sorting box
  if (window.innerWidth <= 768 && e.target === sortingMobilePopup) {
    sortingMobilePopup.classList.add('hidden')
  }
})

sortingMobileListItem.forEach(item => {
  item.addEventListener('click', () => {
    sortingActiveValue.innerText = item.innerText
    sortingMobilePopup.classList.add('hidden')
  })
})