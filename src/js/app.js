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
         'ui/auto-play',
         'ui/restart',
         'utils/inference',
         'utils/voice-input',
         'utils/voice-output',
         'utils/key-input'], function($, pubsub, Controllers, UIVoiceInput, AutoPlay, Restart, Inference, VoiceInput, VoiceOutput, KeyInput) {

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
  var autoPlay = new AutoPlay();
  var restart = new Restart();

  var lastVoiceRoute, lastVoiceInput;
  var hasMicrophonePermission = false;
  var doRequestedRoute;


  pubsub.addListener('voice:route', function(route, input) {
    lastVoiceRoute = route.split('/').join(' ');
    lastVoiceInput = input;
    page(route);
  });

  pubsub.addListener('example:news', function() { 
    page('/news');
  });
  pubsub.addListener('example:weather', function() {
    page('/weather/cardiff');
  });
  /*
  pubsub.addListener('example:sport:fixtures', function() {
    page('/sport/fixtures/premier');
  });
  pubsub.addListener('example:sport:tables', function() {
    page('/sport/tables/premier');
  });
  pubsub.addListener('example:travel', function() {
    page('/travel');
  });
  */
  pubsub.addListener('example:notFound', function() {
    page('/not/found/example');
  });
  pubsub.addListener('microphone:allowed', function() {
    hasMicrophonePermission = true;
    doRequestedRoute();
  });
  pubsub.addListener('restart', function() {
    page('/');  
  });
  pubsub.addListener('error', function(type) {
    var route = '/error';
    if (type) {
      route += '/' +type
    }
    page(route);
  });

  // routes

  function prepareContext(context) {
    context.params.voiceRoute = lastVoiceRoute;
    context.params.voiceInput = lastVoiceInput;
    context.params.autoPlay = autoPlay.isEnabled;
    return context;
  };
  function requestRoute(controller, context) {
    doRequestedRoute = function() {
      controllers.setController(controller, context);
    };
    if (hasMicrophonePermission) {
      doRequestedRoute();
    } else {
      controllers.setController('microphone', prepareContext(context));
    }
  };
  var routeIndex = function(context) {
      requestRoute('welcome', prepareContext(context));
    },
    routeNews = function(context) {
      requestRoute('news', prepareContext(context));
    },
    routeWeather = function(context) {
      requestRoute('news', prepareContext(context));
    },
    routeSport = function(context) {
      requestRoute('sport', prepareContext(context));
    },
    routeTravel = function(context) {
      requestRoute('travel', prepareContext(context));
    },
    routeError = function(context) {
      requestRoute('error', prepareContext(context));
    },
    routeNotFound = function(context) {
      var message = 'Sorry. I do not understand what you mean' + (lastVoiceInput ? ' by ' + lastVoiceInput : '');
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
  page('/weather/:location/:time/:hint', routeWeather);
  page('/sport/:action/:id', routeSport);
  page('/travel', routeTravel);
  page('/error', routeError);
  page('/error/:type', routeError);
  page('*', routeNotFound);
  page();

});
