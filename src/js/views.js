'use strict';

define([
  'views/header',
  'views/welcome',
  'views/weather'
], function(HeaderView, WelcomeView, WeatherView) {
  return {
    Header: HeaderView,
    Welcome: WelcomeView,
    Weather: WeatherView
  };
});