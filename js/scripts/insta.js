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

const feed = new Instafeed({
  get: 'user',
  userId: 14110486070,
  accessToken: '14110486070.1677ed0.e29f390d542548cc9d383954ff2b2f3a',
  target: 'Instafeed',
  resolution: 'thumbnail',
  limit: 50,
  template: '<li><img src="{{image}}" /></li>',
});

feed.run();
