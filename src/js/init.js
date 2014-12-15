/*global require */

'use strict';

require.config({
  baseUrl: '/js',
  paths: {
    'jquery' : '/vendor/jquery/dist/jquery',
    'underscore' : '/vendor/underscore/underscore',
    'backbone' : '/vendor/backbone/backbone',
    'handlebars' : '/vendor/handlebars/handlebars',
    'eventemitter' : '/vendor/eventEmitter/EventEmitter.min'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    }
  }
});

require(['app'], function(App) {
  App.initialise();
});
