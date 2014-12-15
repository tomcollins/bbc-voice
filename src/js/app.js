/* global require */

'use strict';

require.config({
  baseUrl: '/js',
  paths: {
    'jquery': 'vendor/jquery.min',
    'eventemitter': 'vendor/EventEmitter.min',
    'page': '/vendor/page.js/page'
  }
});

require(['jquery', 'utils/pubsub', 'controllers'], function($, pubsub, Controllers) {

  console.log('app');

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


