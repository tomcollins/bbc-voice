/*global define */

define(['jquery', 'utils/pubsub', 'controllers/news', 'controllers/weather'],
  function($, pubsub, ControllerNews, ControllerWeather) {

    var Controllers = function() {
      this.currentController = undefined;
      this.modules = {
        news: ControllerNews,
        weather: ControllerWeather
      };
      this.$element = $('#module-content');
    };

    Controllers.prototype.setController = function(controllerKey) {
      this.controller = new this.modules[controllerKey]();
      this.controller.render(this.$element);
    };

    return Controllers;
});
