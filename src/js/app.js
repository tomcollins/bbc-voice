/*global require page */

'use strict';

require.config({
  baseUrl: '/js',
  paths: {
    'jquery': 'vendor/jquery.min',
    'eventemitter': 'vendor/EventEmitter.min',
    'page': '/vendor/page.js/page'
  }
});

require(['jquery',
         'utils/pubsub',
         'controllers',
         'utils/inference',
         'utils/voice-input'], function($, pubsub, Controllers, Inference, VoiceInput) {

  console.log('app');
  var input = new VoiceInput();
  var inf = new Inference();
  input.listen(function (speech) {
    console.log(inf.tokenize(speech));
  });

  var controllers = new Controllers();

  // routes

  var routeIndex = function() {
    },
    routeNews = function() {
      controllers.setController('news');
    },
    routeWeather = function() {
      controllers.setController('weather');
    };

  //page.base('/');
  page('/', routeIndex);
  page('/news', routeNews);
  page('/weather', routeWeather);
  page();

});
