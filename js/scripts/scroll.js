  const limit = $(window).height() / 4;
  const backToTop = $('#up-btn');

  // Appearing and disappearing of the 'up' button on the first screen
  // and fixed menu on top screen
  $(window).scroll(function () {
    if ($(this).scrollTop() > limit) {
      backToTop.fadeIn();
    } else {
      backToTop.fadeOut();
    }
  });

   // Soft scroll to the top
  backToTop.click(function () {
    $('body, html').animate({scrollTop: 0}, 100);
    return false;
  });
