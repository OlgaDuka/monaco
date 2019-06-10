"use strict";

// Формируем формы заказы
var headerFormSelect = '.header__search';
var footerFormSelect = '.footer__search';
makeForm(headerFormSelect);
makeForm(footerFormSelect); // Склонение

function getNoun(number, one, two, five) {
  var initNumber = number;
  number = Math.abs(number);
  number %= 100;

  if (number >= 5 && number <= 20) {
    return initNumber + ' ' + five;
  }

  number %= 10;

  if (number === 1) {
    return initNumber + ' ' + one;
  }

  if (number >= 2 && number <= 4) {
    return initNumber + ' ' + two;
  }

  return initNumber + ' ' + five;
} // ================================================================================== //
//                                 Форма поиска                                       //
// ================================================================================== //


function makeForm(selection) {
  var curDate = new Date();
  var checkDay = new Date();
  var evictDay = new Date();
  checkDay.setDate(checkDay.getDate() + 1);
  evictDay.setDate(evictDay.getDate() + 2); // *************** **Синхронизация календарей ************************ //

  $("".concat(selection, " .check-calendar")).datepicker({
    minDate: curDate,
    toggleSelected: false,
    dateFormat: 'd, MM',
    position: "bottom center",
    onSelect: function onSelect(fd, d, pickers) {
      if (d === '') {
        pickers.$el.val('Выберите дату');
      } else {
        var date = moment(d).format('DD MMMM');
        pickers.$el.attr('value', date);
        pickers.$el.val(date);
      }

      var updMin = new Date(d);
      updMin.setDate(updMin.getDate() + 1); // Меняем мин значение в календаре выселения

      var datepicker = $("".concat(selection, " .eviction-calendar")).datepicker().data('datepicker');

      if (d >= datepicker.date) {
        datepicker.update('minDate', updMin);
        datepicker.selectDate(updMin);
        $("".concat(selection, " .eviction-calendar")).val(moment(updMin).format('DD MMMM'));
        $("".concat(selection, " .eviction-calendar")).attr('value', moment(updMin).format('DD MMMM'));
      } else {
        datepicker.update('minDate', updMin);
        $("".concat(selection, " .eviction-calendar")).val(moment(datepicker.date).format('DD MMMM'));
        $("".concat(selection, " .eviction-calendar")).attr('value', moment(datepicker.date).format('DD MMMM'));
      }
    }
  });
  $("".concat(selection, " .eviction-calendar")).datepicker({
    minDate: evictDay,
    toggleSelected: false,
    dateFormat: 'd, MM',
    position: "bottom center",
    onSelect: function onSelect(fd, d, pickers) {
      if (d === '') {
        pickers.$el.val('Выберите дату');
      } else {
        var date = moment(d).format('DD MMMM');
        pickers.$el.attr('value', date);
        pickers.$el.val(date);
      }
    }
  }); // ************************************************************** //
  // Значения по-умолчанию

  var defDay = moment();
  defDay.locale('ru');
  $("".concat(selection, " .check-calendar")).attr('value', moment(defDay).add(1, 'days').format('DD MMMM'));
  $("".concat(selection, " .eviction-calendar")).attr('value', moment(defDay).add(2, 'days').format('DD MMMM'));
  var checkCalendar = $("".concat(selection, " .check-calendar")).datepicker().data('datepicker');
  checkCalendar.selectDate(checkDay);
  var evictionCalendar = $("".concat(selection, " .eviction-calendar")).datepicker().data('datepicker');
  evictionCalendar.selectDate(evictDay); // ************ Количество гостей **************** //
  // Выпадающее меню

  var opened = false;
  $("".concat(selection, " .guest")).click(function (e) {
    if (!opened) {
      $("".concat(selection, " .search__guest-change")).fadeToggle(200);
      opened = true;
    }
  }); // Скрытие при клике вне окна

  $(document).mouseup(function (e) {
    var container = $("".concat(selection, " .search__guest-change"));

    if (container.has(e.target).length === 0) {
      if (opened) {
        container.fadeOut();
        setTimeout(function () {
          opened = false;
        }, 200);
      }
    }
  }); // Взрослые

  var adultSum = $("".concat(selection, " .adult-sum"));
  var adultPlus = $("".concat(selection, " .adult-plus"));
  var adultMinus = $("".concat(selection, " .adult-minus"));
  adultPlus.click(function (e) {
    var num = adultSum.text();

    if (num < 6) {
      num++;
      adultSum.text(num);
    }

    calcSumOfGuests();
  });
  adultMinus.click(function (e) {
    var num = adultSum.text();

    if (num > 1) {
      num--;
      adultSum.text(num);
    }

    calcSumOfGuests();
  }); // Дети

  var childSum = $("".concat(selection, " .child-sum"));
  var childPlus = $("".concat(selection, " .child-plus"));
  var childMinus = $("".concat(selection, " .child-minus"));
  childPlus.click(function (e) {
    var num = childSum.text();

    if (num < 5) {
      num++;
      childSum.text(num);
    }

    calcSumOfGuests();
  });
  childMinus.click(function (e) {
    var num = childSum.text();

    if (num > 0) {
      num--;
      childSum.text(num);
    }

    calcSumOfGuests();
  });

  function calcSumOfGuests() {
    var fullSum = parseInt(adultSum.text()) + parseInt(childSum.text());
    var concatString = getNoun(fullSum, 'гостя', 'гостей', 'гостей');
    $("".concat(selection, " .full-sum")).text(concatString);

    if (parseInt(adultSum.text()) === 1) {
      adultMinus.attr('disabled', true);
    } else {
      adultMinus.attr('disabled', false);
    }

    if (parseInt(adultSum.text()) === 6) {
      adultPlus.attr('disabled', true);
    } else {
      adultPlus.attr('disabled', false);
    }

    if (parseInt(childSum.text()) === 0) {
      childMinus.attr('disabled', true);
    } else {
      childMinus.attr('disabled', false);
    }

    if (parseInt(childSum.text()) === 5) {
      childPlus.attr('disabled', true);
    } else {
      childPlus.attr('disabled', false);
    }

    return fullSum;
  }

  $("".concat(selection, " .check")).click(function (e) {
    $("".concat(selection, " .check-calendar")).data('datepicker').show();
  });
  $("".concat(selection, " .eviction")).click(function (e) {
    $("".concat(selection, " .eviction-calendar")).data('datepicker').show();
  }); // ********************************************** //

  $("".concat(selection, " .search__goto")).click(function (e) {
    var checkData = $("".concat(selection, " .check-calendar")).data('datepicker').selectedDates;
    var evictData = $("".concat(selection, " .eviction-calendar")).data('datepicker').selectedDates;
    var guests = calcSumOfGuests();
    var formatedCheck = moment(checkData[0]).format('DD.MM.YYYY');
    var formatedEvict = moment(evictData[0]).format('DD.MM.YYYY');
    var compareString = "https://ostrovok.ru/hotel/united_arab_emirates/abu_dhabi/?q=453&dates=".concat(formatedCheck, "-").concat(formatedEvict, "&guests=").concat(guests); // window.location.href = compareString;

    window.open(compareString, '_blank'); // console.log(formatedCheck)
    // console.log(formatedEvict)
    // console.log(guests)
    // console.log(compareString)
  });
}
/*const tabletWidth = window.matchMedia("(min-width: 768px)");
const desktopWidth = window.matchMedia("(min-width: 1200px)");
const desktopWidthMax = window.matchMedia("(min-width: 1920px)");

let limitImages = 9;

if (desktopWidthMax.matches) {
    limitImages = 16;
  } else if (desktopWidth.matches) {
    limitImages = 12;
  } else if (tabletWidth.matches) {
    limitImages = 10;
  } else {
    limitImages = 9;
  } */


var feed = new Instafeed({
  get: 'user',
  userId: 14110486070,
  accessToken: '14110486070.1677ed0.e29f390d542548cc9d383954ff2b2f3a',
  target: 'Instafeed',
  resolution: 'thumbnail',
  limit: 50,
  template: '<li><img src="{{image}}" /></li>'
});
feed.run();
var limit = $(window).height() / 4;
var backToTop = $('#up-btn'); // Appearing and disappearing of the 'up' button on the first screen
// and fixed menu on top screen

$(window).scroll(function () {
  if ($(this).scrollTop() > limit) {
    backToTop.fadeIn();
  } else {
    backToTop.fadeOut();
  }
}); // Soft scroll to the top

backToTop.click(function () {
  $('body, html').animate({
    scrollTop: 0
  }, 100);
  return false;
});
var TABLET_WIDTH = 768 - 1;
var DESKTOP_WIDTH = 1190 - 1;
$('.advantages__slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  mobileFirst: true,
  responsive: [{
    breakpoint: TABLET_WIDTH,
    settings: 'unslick'
  }]
});
$('.transport__slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  mobileFirst: true,
  responsive: [{
    breakpoint: TABLET_WIDTH,
    settings: 'unslick'
  }]
});
$('.lifehack__slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  mobileFirst: true,
  responsive: [{
    breakpoint: TABLET_WIDTH,
    settings: 'unslick'
  }]
});
$('.stop__slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  mobileFirst: true,
  responsive: [{
    breakpoint: TABLET_WIDTH,
    settings: 'unslick'
  }]
});
$('.details__slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: false,
  dots: true,
  arrows: false,
  asNavFor: '.details__slider-nav',
  mobileFirst: true,
  responsive: [{
    breakpoint: TABLET_WIDTH,
    settings: {
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true
    }
  }, {
    breakpoint: DESKTOP_WIDTH,
    settings: {
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true,
      arrows: true,
      prevArrow: $('.details__arrow--prev'),
      nextArrow: $('.details__arrow--next')
    }
  }]
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
  responsive: [{
    breakpoint: TABLET_WIDTH,
    settings: {
      slidesToShow: 6,
      dots: true
    }
  }]
});
$('.details__slider-for').slick('slickGoTo', 2); // Параметры слайдеров достопримечательностей

var setSlickParameters = function setSlickParameters(arrowPrev, arrowNext) {
  var slickParameters = {
    mobileFirst: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    dots: false,
    prevArrow: $(arrowPrev),
    nextArrow: $(arrowNext),
    responsive: [{
      breakpoint: TABLET_WIDTH,
      settings: {
        slidesToShow: 1,
        variableWidth: true,
        centerMode: true
      }
    }, {
      breakpoint: DESKTOP_WIDTH,
      settings: {
        variableWidth: true,
        centerMode: false,
        slidesToShow: 2
      }
    }]
  };
  return slickParameters;
};

for (var i = 1; i <= 4; i++) {
  var nameSlider = ".better__slider--".concat(i);
  var parameters = setSlickParameters(".better__arrow--prev".concat(i), ".better__arrow--next".concat(i));
  $(nameSlider).slick(parameters);
  $(nameSlider).find('.better__wrap-text').hide();
  $(nameSlider).find('.better__wrap-text[data-text="0"]').show();
  $(nameSlider).on('beforeChange', beforeChangeHandler); // Добавляет слушатель смены слайда
}

$('.better__menu-item[data-num="1"]').find('.better__submenu-item[data-subnum="0"]').addClass('better__submenu-item--active');

var toggleSubmenu = function toggleSubmenu(numCurrentSlide, numNextSlide, numSlider) {
  $('.better__menu-item[data-num="' + numSlider + '"]').find('.better__submenu-item[data-subnum="' + numCurrentSlide + '"]').removeClass('better__submenu-item--active');
  $('.better__menu-item[data-num="' + numSlider + '"]').find('.better__submenu-item[data-subnum="' + numNextSlide + '"]').addClass('better__submenu-item--active');
}; // Срабатывает до смены слайда в слайдере


function beforeChangeHandler(event, slick, currentSlide, nextSlide) {
  var numSlider = slick.$slider.data().num;
  var targetSlider = $('.better__slider[data-num="' + numSlider + '"]');
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
    var menuItem = $(this).data().num;
    var targetSlider = $('.better__slider[data-num="' + menuItem + '"]');
    var targetControl = $('.better__controls[data-num="' + menuItem + '"]');
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
    var submenuItem = $(this).data().subnum;
    $('.better').find('.better__slider--active').slick('slickGoTo', submenuItem);
    $('.better').find('.better__submenu-item--active').removeClass('better__submenu-item--active');
    $(this).addClass('better__submenu-item--active');
  }
});