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
  input.listen(function (speech) {
    console.log(inf.tokenize(speech));
  });

  var voiceOutput = new VoiceOutput();
  pubsub.addListener('voice:speak', function(message){
    voiceOutput.say(message);
  });
  var keyInput = new KeyInput();

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
