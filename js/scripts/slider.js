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
  initialSlide: 2,
  centerMode: false,
  dots: true,
  arrows: false,
  asNavFor: '.details__slider-nav',
  mobileFirst: true,
  responsive: [
    { breakpoint: TABLET_WIDTH,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true
      }
    }
  ]
});

$('.details__slider-nav').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 2,
  dots: false,
  asNavFor: '.details__slider-for',
  focusOnSelect: true,
  variableWidth: true,
  mobileFirst: true,
  responsive: [
    { breakpoint: TABLET_WIDTH,
      settings: {
        slidesToShow: 6,
        dots: true,
      }
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
    variableWidth: true,
    dots: false,
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
$('.better__menu-item[data-num="1"]').find('.better__submenu-item[data-subnum="0"]').addClass('better__submenu-item--active');

const toggleSubmenu = function(numCurrentSlide, numNextSlide, numSlider) {
  $('.better__menu-item[data-num="' + numSlider + '"]').find('.better__submenu-item[data-subnum="' + numCurrentSlide + '"]').removeClass('better__submenu-item--active');
  $('.better__menu-item[data-num="' + numSlider + '"]').find('.better__submenu-item[data-subnum="' + numNextSlide + '"]').addClass('better__submenu-item--active');
};

// Срабатывает до смены слайда в слайдере
function beforeChangeHandler(event, slick, currentSlide, nextSlide) {
  const numSlider = slick.$slider.data().num;
  toggleSubmenu(currentSlide, nextSlide, numSlider);
}

$('.better__menu-item').click(function (evt) {
  if ($(this).hasClass('better__menu-item--active')) {
    return;
  } else {
    const menuItem = $(this).data().num;
    const targetSlider = $('.better__slider[data-num="' + menuItem + '"]');
    const targetControl = $('.better__controls[data-num="' + menuItem + '"]');

    $('.better').find('.better__slider--active').off('beforeChange', beforeChangeHandler); // Удаляет слушатель смены слайда
    targetSlider.on('beforeChange', beforeChangeHandler); // Добавляет слушатель смены слайда

    $('.better').find('.better__slider--active').removeClass('better__slider--active');
    $('.better').find('.better__menu-item--active').removeClass('better__menu-item--active');
    $('.better').find('.better__submenu-item--active').removeClass('better__submenu-item--active');
    $('.better').find('.better__controls--active').removeClass('better__controls--active');

    $(this).addClass('better__menu-item--active');
    targetSlider.addClass('better__slider--active');
    targetControl.addClass('better__controls--active');
    $('.better').find('.better__slider--active').slick('slickGoTo', 0);

    $('.better__menu-item[data-num="' + menuItem + '"]').find('.better__submenu-item[data-subnum="0"]').addClass('better__submenu-item--active');
    targetSlider.slick('refresh');
  }
});

$('.better__submenu-item').click(function (evt) {
  if ($(this).hasClass('better__submenu-item--active')) {
    return;
  } else {
    const submenuItem = $(this).data().subnum;

    $('.better').find('.better__slider--active').slick('slickGoTo', submenuItem);

    $('.better').find('.better__submenu-item--active').removeClass('better__submenu-item--active');
    $(this).addClass('better__submenu-item--active');
  }
});
