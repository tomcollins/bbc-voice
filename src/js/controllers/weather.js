define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var ControllerWeather = function() {
    };

    ControllerWeather.prototype.render = function($element) {
      $element.html('<p>Weather</p>');
    };

    return ControllerWeather;

});
