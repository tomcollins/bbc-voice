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

  var lastVoiceRoute;

  pubsub.addListener('voice:route', function(route, input) {
    lastVoiceRoute = route.split('/').join(' ');
    page(route);
  });

  pubsub.addListener('example:news', function() {
    page('/news');
  });

  pubsub.addListener('example:weather', function() {
    page('/weather/cardiff');
  });

  pubsub.addListener('example:notFound', function() {
    page('/not/found/example');
  });

  // routes

  var routeIndex = function() {
    },
    routeNews = function(context) {
      controllers.setController('news', context);
    },
    routeWeather = function(context) {
      controllers.setController('weather', context);
    },
    routeNotFound = function(context) {
      var message = 'Sorry. I do not understand what you mean' + (lastVoiceRoute ? ' by ' + lastVoiceRoute : '');
      pubsub.emitEvent('voice:trigger');
      pubsub.emitEvent('speech:speak', [message]);
      page('/');
    };

  //page.base('/');
  page('/', routeIndex);
  page('/news', routeNews);
  page('/news/:topic', routeNews);
  page('/weather/:location', routeWeather);
  page('/weather/:location/:time', routeWeather);
  page('*', routeNotFound);
  page();

});
