const headerNotification = document.querySelector('.header1')
const headerNotificationCloseIcon = document.querySelector('.header1__closeIcon')

headerNotificationCloseIcon.addEventListener('click', () => {
  headerNotification.setAttribute('style', 'height: 0; padding: 0')
})