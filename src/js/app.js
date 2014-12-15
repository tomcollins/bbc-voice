/*global require page */

'use strict';

require.config({
  baseUrl: '/js',
  paths: {
    'jquery': 'vendor/jquery.min',
    'underscore': 'vendor/underscore',
    'eventemitter': 'vendor/EventEmitter.min'
  }
});

require(['jquery',
         'utils/pubsub',
         'controllers',
         'utils/inference',
         'utils/voice-input',
         'utils/voice-output',
         'utils/key-input'], function($, pubsub, Controllers, Inference, VoiceInput, VoiceOutput, KeyInput) {

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

  var voiceOutput = new VoiceOutput();
  pubsub.addListener('speech:speak', function(message){
    voiceOutput.say(message);
  });
  pubsub.addListener('speech:cancel', function(){
    voiceOutput.cancel();
  });

  var keyInput = new KeyInput();

  var controllers = new Controllers();

  pubsub.addListener('voice:news', function() {
    page('/news');
  });

  pubsub.addListener('voice:weather', function() {
    page('/weather/cardiff');
  });

  // routes

  var routeIndex = function() {
    },
    routeNews = function() {
      controllers.setController('news');
    },
    routeWeather = function(context) {
      console.log('weather', context);
      controllers.setController('weather', context);
    };

  //page.base('/');
  page('/', routeIndex);
  page('/news', routeNews);
  page('/weather/:location', routeWeather);
  page();

});
