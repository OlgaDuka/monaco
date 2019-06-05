"use strict";

// Функция переключения разделов
//function toggleSectionBetterPlace() {
//  var selector = $(this).val();
//  $('.version.current').find('.version__toggle').each(function (i, el) {
//    $('.version__toggle').toggleClass('version__toggle--active');
//  });
// Получаем заголовок и "обещание" для выбранной целевой аудитории
//  var title = $(this).data().title;
//  var promise = $(this).data().promise;
//  viewComplectation(selector, title, promise);
//};
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
  initialSlide: 3,
  centerMode: true,
  arrows: false,
  asNavFor: '.details__slider-nav',
  mobileFirst: true,
  responsive: [{
    breakpoint: TABLET_WIDTH,
    slidesToShow: 3
  }]
});
$('.details__slider-nav').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 3,
  asNavFor: '.details__slider-for',
  dots: true,
  centerMode: true,
  focusOnSelect: true,
  mobileFirst: true,
  responsive: [{
    breakpoint: TABLET_WIDTH,
    slidesToShow: 6
  }]
}); // Параметры слайдеров достопримечательностей

var setSlickParameters = function setSlickParameters(arrowPrev, arrowNext) {
  var slickParameters = {
    mobileFirst: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    //arrows: !0,
    prevArrow: $(arrowPrev),
    nextArrow: $(arrowNext),
    responsive: [{
      breakpoint: TABLET_WIDTH,
      settings: {
        centerMode: false
      }
    }, {
      breakpoint: DESKTOP_WIDTH,
      settings: {
        slidesToShow: 1
      }
    }]
  };
  return slickParameters;
};

var better1 = setSlickParameters('.better__arrow--prev1', '.better__arrow--next1');
var better2 = setSlickParameters('.better__arrow--prev2', '.better__arrow--next2');
var better3 = setSlickParameters('.better__arrow--prev3', '.better__arrow--next3');
var better4 = setSlickParameters('.better__arrow--prev4', '.better__arrow--next4');
$('.better__slider--1').slick(better1);
$('.better__slider--2').slick(better2);
$('.better__slider--3').slick(better3);
$('.better__slider--4').slick(better4);
var menu = document.querySelector('.better__menu');
var betterMenuItems = menu.querySelectorAll('.better__menu-item');
var betterSliders = document.querySelectorAll('.better__slider');
$('.better__menu-item').click(function (evt) {
  if ($(this).hasClass('better__menu-item--active')) {
    return;
  } else {
    var selector = $(this).data().num;
    var targetSlider = $('.better__slider[data-num="' + selector + '"]'); // Селект нужного блока

    var targetControl = $('.better__controls[data-num="' + selector + '"]');
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