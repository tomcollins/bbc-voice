/*global require page */

'use strict';

require.config({
  baseUrl: '/js',
  paths: {
    'jquery': 'vendor/jquery.min',
    'underscore': 'vendor/underscore',
    'eventemitter': 'vendor/EventEmitter.min',
    'page': '/vendor/page.js/page'
  }
});

require(['jquery',
         'utils/pubsub',
         'controllers',
         'utils/inference',
         'utils/voice-input'], function($, pubsub, Controllers, Inference, VoiceInput) {

  console.log('app started');

  var input = new VoiceInput();
  var inf = new Inference();

  pubsub.on('voice:home', function ( ) {
    console.log('HOME event triggered');
  });

  pubsub.on('voice:next', function ( ) {
    console.log('NEXT event triggered');
  });

  pubsub.on('voice:command', function () {
    console.log('COMMAND event triggered');
    console.log(arguments);
  });

  // Listen for voice input and react to the input
  input.listen(function (speech) {
    inf.react(speech);
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
