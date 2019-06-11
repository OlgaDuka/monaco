const TABLET_WIDTH = 768 - 1;
const DESKTOP_WIDTH = 1190 - 1;

(window.onload = function() {
  $(window).scrollTop(0);
});


$('.lazy').slick({
  lazyLoad: 'progressive'
});

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
    },
    { breakpoint: DESKTOP_WIDTH,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        arrows: true,
        prevArrow: $('.details__arrow--prev'),
        nextArrow: $('.details__arrow--next')
      }
    }
  ]
});

$('.details__slider-nav').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: false,
  arrows: false,
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

$('.details__slider-for').slick('slickGoTo', 2);
$('.details').show();

// Параметры слайдеров достопримечательностей
const setSlickParameters = function(arrowPrev, arrowNext) {
  const slickParameters = {
    mobileFirst: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    dots: false,
    prevArrow: $(arrowPrev),
    nextArrow: $(arrowNext),
    responsive: [
      { breakpoint: DESKTOP_WIDTH,
        settings: {
          variableWidth: true,
          centerMode: false,
          slidesToShow: 2
        }
      }
    ]
  }
  return slickParameters;
};

for (let i = 1; i <= 4; i++) {
  const nameSlider = `.better__slider--${i}`;
  const parameters = setSlickParameters(`.better__arrow--prev${i}`, `.better__arrow--next${i}`);
  $(nameSlider).slick(parameters);
  $(nameSlider).find('.better__wrap-text').hide();
  $(nameSlider).find('.better__wrap-text[data-text="0"]').show();
  $(nameSlider).on('beforeChange', beforeChangeHandler); // Добавляет слушатель смены слайда
}

$('.better__menu-item[data-num="1"]').find('.better__submenu-item[data-subnum="0"]').addClass('better__submenu-item--active');

const toggleSubmenu = function(numCurrentSlide, numNextSlide, numSlider) {
  $('.better__menu-item[data-num="' + numSlider + '"]').find('.better__submenu-item[data-subnum="' + numCurrentSlide + '"]').removeClass('better__submenu-item--active');
  $('.better__menu-item[data-num="' + numSlider + '"]').find('.better__submenu-item[data-subnum="' + numNextSlide + '"]').addClass('better__submenu-item--active');
};

// Срабатывает до смены слайда в слайдере
function beforeChangeHandler(event, slick, currentSlide, nextSlide) {
  const numSlider = slick.$slider.data().num;
  const targetSlider = $('.better__slider[data-num="' + numSlider + '"]');
  targetSlider.find('.better__title[data-title="' + currentSlide + '"]').hide();
  targetSlider.find('.better__title[data-title="' + nextSlide + '"]').show();
  targetSlider.find('.better__wrap-text[data-text="' + currentSlide + '"]').hide();
  targetSlider.find('.better__wrap-text[data-text="' + nextSlide + '"]').show();
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
