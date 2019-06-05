const TABLET_WIDTH = 768 - 1;
const DESKTOP_WIDTH = 1190 - 1;

$('.advantages__slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: TABLET_WIDTH,
      settings: 'unslick'
    }
  ]
});

$('.transport__slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: TABLET_WIDTH,
      settings: 'unslick'
    }
  ]
});

$('.lifehack__slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: TABLET_WIDTH,
      settings: 'unslick'
    }
  ]
});

$('.stop__slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: TABLET_WIDTH,
      settings: 'unslick'
    }
  ]
});

$('.details__slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide:3,
  centerMode: true,
  arrows: false,
  asNavFor: '.details__slider-nav',
  mobileFirst: true,
  responsive: [
    {
      breakpoint: TABLET_WIDTH,
      slidesToShow: 3
    }
  ]
});

$('.details__slider-nav').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide:3,
  asNavFor: '.details__slider-for',
  dots: true,
  centerMode: true,
  focusOnSelect: true,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: TABLET_WIDTH,
      slidesToShow: 6
    }
  ]
});

// Параметры слайдеров достопримечательностей
const setSlickParameters = function(arrowPrev, arrowNext) {
  const slickParameters = {
    mobileFirst: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    //arrows: !0,
    prevArrow: $(arrowPrev),
    nextArrow: $(arrowNext),
    responsive: [
      { breakpoint: TABLET_WIDTH,
        settings: {
          centerMode: false
        }
      },
      { breakpoint: DESKTOP_WIDTH,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  }
  return slickParameters;
};

const better1 = setSlickParameters('.better__arrow--prev1', '.better__arrow--next1');
const better2 = setSlickParameters('.better__arrow--prev2', '.better__arrow--next2');
const better3 = setSlickParameters('.better__arrow--prev3', '.better__arrow--next3');
const better4 = setSlickParameters('.better__arrow--prev4', '.better__arrow--next4');

$('.better__slider--1').slick(better1);
$('.better__slider--2').slick(better2);
$('.better__slider--3').slick(better3);
$('.better__slider--4').slick(better4);

const menu = document.querySelector('.better__menu');
const betterMenuItems = menu.querySelectorAll('.better__menu-item');
const betterSliders = document.querySelectorAll('.better__slider');

$('.better__menu-item').click(function (evt) {
  if ($(this).hasClass('better__menu-item--active')) {
    return;
  } else {
    const selector = $(this).data().num;
    const targetSlider = $('.better__slider[data-num="' + selector + '"]'); // Селект нужного блока
    const targetControl = $('.better__controls[data-num="' + selector + '"]');

    $('.better__slider').each(function (i, el) {
      $(el).removeClass('better__slider--active');
    });
    $('.better__controls').each(function (i, el) {
      $(el).removeClass('better__controls--active');
    });
    $('.better__menu-item').each(function (i, el) {
      $(el).removeClass('better__menu-item--active');
    });

    $(this).addClass('better__menu-item--active');
    targetSlider.addClass('better__slider--active');
    targetControl.addClass('better__controls--active');
    targetSlider.slick('refresh');
  }
});
