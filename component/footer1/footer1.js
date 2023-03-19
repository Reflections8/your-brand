// Accordion
const accordionButton = document.querySelectorAll('.footer1__wrapperAccordion-item-button')

accordionButton.forEach(item => {
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