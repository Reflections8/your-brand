// Header popup logic
const headerPopup = document.querySelector('.headerMobilePopup')
const headerPopupWrapper = document.querySelector('.headerMobilePopup__wrapper')
const burgerMenuIcon = document.querySelector('.header3__mobileMenu-burgerMenu-img')

burgerMenuIcon.addEventListener('click', () => {
  headerPopup.classList.remove('headerMobilePopup__smoothHidden')
})

headerPopup.addEventListener('click', (e) => {
  if (!headerPopup.classList.contains('headerMobilePopup__smoothHidden') && !headerPopupWrapper.contains(e.target)) {
    headerPopup.classList.add('headerMobilePopup__smoothHidden')
  }
})

// Header popup parent redirect logic
const headerParent = document.querySelector('.headerMobilePopup__menu-parent')
const headerParentMenuContainer = document.querySelector('.headerMobilePopup__menu-parent-list')

headerParentMenuContainer.addEventListener('click', (e) => {
  const headerParentMenuItem = e.target.closest('.headerMobilePopup__menu-parent-list-item')
  if (headerParentMenuItem) {
    const allHeaderMobileChildren = document.querySelectorAll('[data-mobile-child]')

    const currentHeaderMobileChild = document.querySelector(`[data-mobile-child=${headerParentMenuItem.getAttribute('data-mobile-category')}]`)

    allHeaderMobileChildren.forEach(item => {
      item.classList.add('headerMobilePopup__hidden')
    })
    headerParent.classList.add('headerMobilePopup__hidden')
    currentHeaderMobileChild.classList.remove('headerMobilePopup__hidden')
  }
})

// Back to parent click logic
const headerBackToParentButton = document.querySelectorAll('.headerMobilePopup__menu-child-header')

headerBackToParentButton.forEach(item => {
  item.addEventListener('click', () => {
    const allHeaderMobileChildren = document.querySelectorAll('[data-mobile-child]')
    allHeaderMobileChildren.forEach(item => {
      item.classList.add('headerMobilePopup__hidden')
    })
    headerParent.classList.remove('headerMobilePopup__hidden')
  })
})


// Accordion
const headerAccordionButton = document.querySelectorAll('.headerMobilePopup__menu-child-accordion-item-button')

headerAccordionButton.forEach(item => {
  item.addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  })
})