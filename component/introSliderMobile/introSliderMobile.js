$('.introSliderMobile')
  .slick({
    lazyLoad: 'ondemand',
    infinite: true,
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
    customPaging: (slider, i) => {
      return (
        `
        <div class="introSlider__dotsContainer">
            <div class="slider-dot__container introSlider__dotsContainer-dot">
            <div class="circle-loader">
                <div class="circle-loader__dot"></div>
            </div>
        </div>
        `
      )
    },
  })