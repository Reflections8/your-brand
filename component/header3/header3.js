// Header positioning when scrolling document
const fixedHeader = document.querySelector('.header3')
const fixedHeaderSubstrate = document.querySelector('.header3Substrate')

window.addEventListener('scroll', () => {
  if (fixedHeader.getBoundingClientRect().top <= 0) {
    fixedHeader.setAttribute('style', 'position: fixed; top: 0;')
    fixedHeaderSubstrate.setAttribute('style', 'height: 64px;')
  }

  if (window.scrollY === 0) {
    fixedHeader.setAttribute('style', 'position: relative; top: 0;')
    fixedHeaderSubstrate.setAttribute('style', 'height: 64px; display: none')
  }
})

// Header nav items transfer
const navContainer = document.querySelector('.header3__nav')
const transferredNavContainer = document.querySelector('.header3__actionsBox-transferredNavContainer')
const lastNavChild = navContainer.lastElementChild

const transferNavLastChild = () => {
  if (window.innerWidth <= 1380) {
    navContainer.removeChild(lastNavChild)
    transferredNavContainer.appendChild(lastNavChild)
  } else {
    navContainer.appendChild(lastNavChild)
    transferredNavContainer.innerHTML = ''
  }
}

transferNavLastChild()
window.addEventListener('resize', () => {
  transferNavLastChild()
})

//Header dropdown-menu
const dropdownParent = document.querySelector('.header3__dropdownMenu')
const dropdownMenu = document.querySelectorAll('[data-dropdown-category]')


document.addEventListener('mousemove', e => {
  const navContainer = e.target.closest('.header3__nav')
  const navItem = e.target.closest('.header3__nav-menuItem')
  const currentDropDown = e.target.closest('[data-dropdown-category]')

  if (navItem) {
    const allDropDowns = document.querySelectorAll('[data-dropdown-category]')
    const currentDropDown = document.querySelector(`[data-dropdown-category=${navItem.getAttribute('data-nav-category')}]`)

    allDropDowns.forEach(item => {
      item.classList.add('hidden')
    })

    dropdownParent.classList.remove('hidden')
    currentDropDown.classList.remove('hidden')
  } else if (!navItem && !currentDropDown && !navContainer) {
    dropdownMenu.forEach(item => {
      item.classList.add('hidden')
    })
    dropdownParent.classList.add('hidden')
  }
})

// ---------- 1. Searchbar appearance logic
const header2Wrapper = document.querySelector('.header2')

const defaultHeader3 = document.querySelector('.header3__desktopMenu')
const searchHeader3 = document.querySelector('.header3__searchMenu')
const darkenBackgroundHeader3 = document.querySelector('.header3__darkenBackground')

const headerSearchButton = document.querySelectorAll('.header3__actionsBox-item-iconSearch')

headerSearchButton.forEach(item => {
  item.addEventListener('click', () => {
    defaultHeader3.classList.add('header3__hidden')
    searchHeader3.classList.remove('header3__hidden')
    darkenBackgroundHeader3.classList.remove('header3__darkenBackground-hidden')
    header2Wrapper.setAttribute('style', 'height: 0; padding: 0; border: 0;')
  })
})

const header3Wrapper = document.querySelector('.header3')

document.addEventListener('click', (e) => {
  if (!header3Wrapper.contains(e.target)) {
    defaultHeader3.classList.remove('header3__hidden')
    searchHeader3.classList.add('header3__hidden')
    darkenBackgroundHeader3.classList.add('header3__darkenBackground-hidden')
    header2Wrapper.setAttribute('style', '')
    foundItemsContainer.classList.add('header3__foundProducts-hidden')
    header3SearchMenuLowerTitle.textContent = 'Популярные запросы:'
    header3SearchMenuLowerContent.textContent = ''
    header3SearchMenuLowerContent.insertAdjacentHTML('afterbegin', `
      <span class="header3__searchMenu-header-lower-content-tag">Очки</span>
      <span class="header3__searchMenu-header-lower-content-tag">Черный топ</span>
      <span class="header3__searchMenu-header-lower-content-tag">Кожаные сумки</span>
    `)
  }
})

// ---------- 1.1 Mobile search menu
const burgerHeaderSearchButton = document.querySelector('.header3__mobileMenu-burgerMenu-actionBoxMobile-item-icon')
const burgerSearchCloseIcon = document.querySelector('.header3__searchMenuMobile-wrapper-content-header-closeIcon')
const mobileSearchPopup = document.querySelector('.header3__searchMenuMobile')

burgerHeaderSearchButton.addEventListener('click', (e) => {
  mobileSearchPopup.classList.remove('header3__searchMenuMobile-hidden')
})

burgerSearchCloseIcon.addEventListener('click', () => {
  mobileSearchPopup.classList.add('header3__searchMenuMobile-hidden')
})


// SEARCH LOGIC
const searchWrapperHeader3 = document.querySelector('.header3__searchMenu-header-upper-searchBar')
const searchFormHeader3 = searchWrapperHeader3.getElementsByTagName('form')

const searchInputHeader3 = document.querySelector('.header3__searchMenu-header-upper-searchBar-input')
const searchButtonHeader3 = document.querySelector('.header3__searchMenu-header-upper-searchBar-button')

// Tag substitution
const searchTagsHeader3 = document.querySelectorAll('.header3__searchMenu-header-lower-content-tag')

searchTagsHeader3.forEach(item => {
  item.addEventListener('click', () => {
    searchInputHeader3.value = item.textContent
  })
})

// Search GET-query
const searchProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          name: 'Рубашка из льняной смеси',
          imageSrc: 'component/header3/img/found-products/1.jpg',
          newPrice: 3000,
          oldPrice: 5000,
          productPageUrl: '#',
        },
        {
          name: 'Рубашка из льняной смеси',
          imageSrc: 'component/header3/img/found-products/1.jpg',
          newPrice: 2500,
          oldPrice: 5000,
          productPageUrl: '#',
        },
        {
          name: 'Рубашка из льняной смеси',
          imageSrc: 'component/header3/img/found-products/1.jpg',
          newPrice: 1200,
          oldPrice: 5420,
          productPageUrl: '#',
        },
        {
          name: 'Рубашка из льняной смеси',
          imageSrc: 'component/header3/img/found-products/1.jpg',
          newPrice: 800,
          oldPrice: 1200,
          productPageUrl: '#',
        }
      ])
    }, 750)
  })
}

// Loader
const loader = document.querySelectorAll('.loader')

const setLoadingStatus = (status) => {
  if (status) {
    loader.forEach(item => {
      item.classList.remove('loader__hidden')
    })
  } else {
    loader.forEach(item => {
      item.classList.add('loader__hidden')
    })
  }
}

// ---------- Desktop search submit
const foundItemsContainer = document.querySelector('.header3__foundProducts')
const foundItemsWrapper = document.querySelector('.header3__foundProducts-wrapper')
const header3SearchMenuLowerTitle = document.querySelector('.header3__searchMenu-header-lower-title')
const header3SearchMenuLowerContent = document.querySelector('.header3__searchMenu-header-lower-content')

searchFormHeader3[0].addEventListener('submit', (e) => {
  e.preventDefault()
  if (searchInputHeader3.value.trim()) {
    setLoadingStatus(true)
    searchProducts()
      .then(res => {
        foundItemsWrapper.innerHTML = ''
        foundItemsContainer.classList.remove('header3__foundProducts-hidden')
        header3SearchMenuLowerTitle.textContent = 'Результат'
        header3SearchMenuLowerContent.textContent = `"${searchInputHeader3.value}"`
        res.map(item => {
          foundItemsWrapper.insertAdjacentHTML('afterbegin', `
          <a href=${item.productPageUrl} class="header3__foundProducts-wrapper-item">
            <img src=${item.imageSrc} alt="product" class="header3__foundProducts-wrapper-item-img"/>
            
            <div class="header3__foundProducts-wrapper-item-title">${item.name}</div>
              
            <div class="header3__foundProducts-wrapper-item-prices">
                <div class="header3__foundProducts-wrapper-item-prices-new">${item.oldPrice} ₽</div>
                <div class="header3__foundProducts-wrapper-item-prices-old">${item.newPrice} ₽</div>
            </div>
          </a>
          `)
        })
      })
      .catch((e) => {
        throw new Error(e)
      })
      .finally(() => {
        setLoadingStatus(false)
      })
  }
})

// ---------- Mobile tag substitution
const mobileSearchInputHeader3 = document.querySelector('.header3__searchMenuMobile-wrapper-content-searchBar-input')
const mobileSearchTagsHeader3 = document.querySelectorAll('.header3__searchMenuMobile-wrapper-content-tagSection-content-tag')

mobileSearchTagsHeader3.forEach(item => {
  item.addEventListener('click', () => {
    console.log(item.textContent)
    mobileSearchInputHeader3.value = item.textContent
  })
})

// ---------- Mobile search submit
const mobileSearchWrapperHeader3 = document.querySelector('.header3__searchMenuMobile-wrapper-content-searchBar')
const mobileSearchFormHeader3 = mobileSearchWrapperHeader3.getElementsByTagName('form')

const mobileSearchTagSectionTitle = document.querySelector('.header3__searchMenuMobile-wrapper-content-tagSection-title')
const mobileSearchTagSectionContent = document.querySelector('.header3__searchMenuMobile-wrapper-content-tagSection-content')

const mobileFoundItemsWrapper = document.querySelector('.header3__searchMenuMobile-wrapper-content-foundProducts')


mobileSearchFormHeader3[0].addEventListener('submit', (e) => {
  e.preventDefault()
  if (mobileSearchInputHeader3.value.trim()) {
    setLoadingStatus(true)
    searchProducts()
      .then(res => {
        mobileFoundItemsWrapper.innerHTML = ''
        mobileSearchTagSectionTitle.textContent = 'Результат'
        mobileSearchTagSectionContent.textContent = `"${mobileSearchInputHeader3.value}"`
        res.map(item => {
          mobileFoundItemsWrapper.insertAdjacentHTML('afterbegin', `
          <a href=${item.productPageUrl} class="header3__searchMenuMobile-wrapper-content-foundProducts-item">
						<img src=${item.imageSrc} alt="product" class="header3__searchMenuMobile-wrapper-content-foundProducts-item-img"/>

						<div class="header3__searchMenuMobile-wrapper-content-foundProducts-item-title">${item.name}</div>

						<div class="header3__searchMenuMobile-wrapper-content-foundProducts-item-prices">
						    <div class="header3__searchMenuMobile-wrapper-content-foundProducts-item-prices-new">${item.oldPrice} ₽</div>
						    <div class="header3__searchMenuMobile-wrapper-content-foundProducts-item-prices-old">${item.newPrice} ₽</div>
						</div>
					</a>
          `)
        })
      })
      .catch((e) => {
        throw new Error(e)
      })
      .finally(() => {
        setLoadingStatus(false)
      })
  }
})