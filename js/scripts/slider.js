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
