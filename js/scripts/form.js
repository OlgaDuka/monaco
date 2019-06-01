  // Формируем формы заказы
  const headerFormSelect = '.header__search';
  const footerFormSelect = '.footer__search';

  makeForm(headerFormSelect);
  makeForm(footerFormSelect);

// Склонение
function getNoun(number, one, two, five) {
  const initNumber = number
  number = Math.abs(number)
  number %= 100
  if (number >= 5 && number <= 20) {
    return initNumber + ' ' + five
  }
  number %= 10
  if (number === 1) {
    return initNumber + ' ' + one
  }
  if (number >= 2 && number <= 4) {
    return initNumber + ' ' + two
  }
  return initNumber + ' ' + five
}

// ================================================================================== //
  //                                 Форма поиска                                       //
  // ================================================================================== //

  function makeForm(selection) {
    const curDate = new Date();
    const checkDay = new Date();
    const evictDay = new Date();
    checkDay.setDate(checkDay.getDate() + 1);
    evictDay.setDate(evictDay.getDate() + 2);

    // *************** **Синхронизация календарей ************************ //
    $(`${selection} .check-calendar`).datepicker({
      minDate: curDate,
      toggleSelected: false,
      dateFormat: 'd, MM',
      position: "bottom center",
      onSelect: function (fd, d, pickers) {
        if (d === '') {
          pickers.$el.val('Выберите дату');
        } else {
          const date = moment(d).format('DD MMMM');
          pickers.$el.attr('value', date);
          pickers.$el.val(date);
        }

        const updMin = new Date(d);
        updMin.setDate(updMin.getDate() + 1);

        // Меняем мин значение в календаре выселения
        const datepicker = $(`${selection} .eviction-calendar`).datepicker().data('datepicker');

        if (d >= datepicker.date) {
          datepicker.update('minDate', updMin);
          datepicker.selectDate(updMin);
          $(`${selection} .eviction-calendar`).val(moment(updMin).format('DD MMMM'))
          $(`${selection} .eviction-calendar`).attr('value', moment(updMin).format('DD MMMM'))
        } else {
          datepicker.update('minDate', updMin);
          $(`${selection} .eviction-calendar`).val(moment(datepicker.date).format('DD MMMM'))
          $(`${selection} .eviction-calendar`).attr('value', moment(datepicker.date).format('DD MMMM'))
        }
      }
    });

    $(`${selection} .eviction-calendar`).datepicker({
      minDate: evictDay,
      toggleSelected: false,
      dateFormat: 'd, MM',
      position: "bottom center",
      onSelect: function (fd, d, pickers) {
        if (d === '') {
          pickers.$el.val('Выберите дату');
        } else {
          const date = moment(d).format('DD MMMM');
          pickers.$el.attr('value', date);
          pickers.$el.val(date);
        }
      }
    });

    // ************************************************************** //

    // Значения по-умолчанию
    const defDay = moment();

    defDay.locale('ru')
    $(`${selection} .check-calendar`).attr('value', moment(defDay).add(1, 'days').format('DD MMMM'));
    $(`${selection} .eviction-calendar`).attr('value', moment(defDay).add(2, 'days').format('DD MMMM'));


    const checkCalendar = $(`${selection} .check-calendar`).datepicker().data('datepicker');
    checkCalendar.selectDate(checkDay);

    const evictionCalendar = $(`${selection} .eviction-calendar`).datepicker().data('datepicker');
    evictionCalendar.selectDate(evictDay);

    // ************ Количество гостей **************** //
    // Выпадающее меню
    let opened = false;

    $(`${selection} .guest`).click((e) => {
      if (!opened) {
        $(`${selection} .search__guest-change`).fadeToggle(200);
        opened = true;
      }
    })

    // Скрытие при клике вне окна
    $(document).mouseup(function (e) {
      var container = $(`${selection} .search__guest-change`);
      if (container.has(e.target).length === 0) {
        if (opened) {
          container.fadeOut();
          setTimeout(() => {
            opened = false;
          }, 200)
        }
      }
    });

    // Взрослые
    const adultSum = $(`${selection} .adult-sum`);
    const adultPlus = $(`${selection} .adult-plus`);
    const adultMinus = $(`${selection} .adult-minus`);

    adultPlus.click((e) => {
      let num = adultSum.text()
      if (num < 6) {
        num++;
        adultSum.text(num)
      }

      calcSumOfGuests();
    });

    adultMinus.click((e) => {
      let num = adultSum.text()
      if (num > 1) {
        num--;
        adultSum.text(num)
      }

      calcSumOfGuests();
    });

    // Дети
    const childSum = $(`${selection} .child-sum`);
    const childPlus = $(`${selection} .child-plus`);
    const childMinus = $(`${selection} .child-minus`);

    childPlus.click((e) => {
      let num = childSum.text()
      if (num < 5) {
        num++;
        childSum.text(num)
      }

      calcSumOfGuests();
    });

    childMinus.click((e) => {
      let num = childSum.text()
      if (num > 0) {
        num--;
        childSum.text(num)
      }

      calcSumOfGuests();
    });

    function calcSumOfGuests() {
      const fullSum = parseInt(adultSum.text()) + parseInt(childSum.text());
      const concatString = getNoun(fullSum, 'гостя', 'гостей', 'гостей');
      $(`${selection} .full-sum`).text(concatString);

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

      return fullSum
    }


    $(`${selection} .check`).click((e) => {
      $(`${selection} .check-calendar`).data('datepicker').show();
    })

    $(`${selection} .eviction`).click((e) => {
      $(`${selection} .eviction-calendar`).data('datepicker').show();
    })

    // ********************************************** //

    $(`${selection} .search__goto`).click((e) => {
      const checkData = $(`${selection} .check-calendar`).data('datepicker').selectedDates;
      const evictData = $(`${selection} .eviction-calendar`).data('datepicker').selectedDates;
      const guests = calcSumOfGuests();

      const formatedCheck = moment(checkData[0]).format('DD.MM.YYYY');
      const formatedEvict = moment(evictData[0]).format('DD.MM.YYYY');
      const compareString = `https://ostrovok.ru/hotel/united_arab_emirates/abu_dhabi/?q=453&dates=${formatedCheck}-${formatedEvict}&guests=${guests}`

      // window.location.href = compareString;
      window.open(compareString, '_blank');
      // console.log(formatedCheck)
      // console.log(formatedEvict)
      // console.log(guests)
      // console.log(compareString)
    })
  }
