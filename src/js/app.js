/* global require */

require.config({
  baseUrl: '/',
  paths: {
    'jquery' : 'vendor/jquery/dist/jquery',
    'underscore' : 'vendor/underscore/underscore',
    'backbone' : 'vendor/backbone/backbone',
    'marionette' : 'vendor/marionette/lib/backbone.marionette.min'
  }
});

require([
    'jquery',
    'marionette'
  ], function($, Marionette) {

  'use strict';

  console.log('App');

});