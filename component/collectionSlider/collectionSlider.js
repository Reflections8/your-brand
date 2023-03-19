const collectionsSliderButtonPrev = document.querySelector('.collectionSlider__header-sliderControls-prev')
const collectionsSliderButtonNext = document.querySelector('.collectionSlider__header-sliderControls-next')

$('.collectionSlider__sliderWrapper')
  .slick({
    lazyLoad: 'ondemand',
    infinite: true,
    arrows: true,
    dots: true,
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
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: collectionsSliderButtonPrev,
    nextArrow: collectionsSliderButtonNext,
    responsive: [
      {
        breakpoint: 1680,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrows: false,
          dots: false,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: false,
        }
      }
    ]
  })

const collectionsSlider = document.querySelector('.collectionSlider__sliderWrapper')
const collectionsSliderDots = collectionsSlider.querySelector('.slick-dots')

collectionsSliderButtonPrev.after(collectionsSliderDots)
