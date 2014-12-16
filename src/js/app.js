/*global require page */

'use strict';

require.config({
  baseUrl: '/js',
  paths: {
    'jquery': 'vendor/jquery.min',
    'jquery-1.9': 'vendor/jquery.min',
    'swfobject-2': 'vendor/bump',
    'underscore': 'vendor/underscore',
    'eventemitter': 'vendor/EventEmitter.min'
  }
});

require(['jquery',
         'utils/pubsub',
         'controllers',
         'ui/voice-input',
         'utils/inference',
         'utils/voice-input',
         'utils/voice-output',
         'utils/key-input'], function($, pubsub, Controllers, UIVoiceInput, Inference, VoiceInput, VoiceOutput, KeyInput) {

  var input = new VoiceInput();
  var inf = new Inference();

  // Listen for voice input and react to the input
  input.listen(function (speech) {
    inf.react(speech);
  });

  var voiceOutput = new VoiceOutput();
  pubsub.addListener('speech:speak', function(message){
    voiceOutput.say(message);
  });
  pubsub.addListener('speech:cancel', function(){
    voiceOutput.cancel();
  });

  var keyInput = new KeyInput();
  var uiVoiceInput = new UIVoiceInput();

  var controllers = new Controllers();

  pubsub.addListener('voice:route', function(route) {
    page(route);
  });

  pubsub.addListener('voice:news', function() {
    page('/news');
  });

  pubsub.addListener('voice:weather', function() {
    page('/weather/cardiff');
  });





  // routes

  var routeIndex = function() {
    },
    routeNews = function(context) {
      controllers.setController('news', context);
    },
    routeWeather = function(context) {
      controllers.setController('weather', context);
    };

  //page.base('/');
  page('/', routeIndex);
  page('/news', routeNews);
  page('/news/:topic', routeNews);
  page('/weather/:location', routeWeather);
  page();

});
