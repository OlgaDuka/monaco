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
