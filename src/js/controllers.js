/*global define */

define(['jquery', 'utils/pubsub', 'controllers/news', 'controllers/weather'],
  function($, pubsub, ControllerNews, ControllerWeather) {

    var Controllers = function() {
      this.currentController = undefined;
      this.modules = {
        news: {
          label: 'News',
          class: ControllerNews
        },
        weather: {
          label: 'Weather',
          class: ControllerWeather
        }
      };
      this.$elementModuleHead = $('#module-head');
      this.$elementModuleHeadInner = $('#module-head-inner');
      this.$elementModuleHeadLabel = $('#module-head h1');
      this.$element = $('#module-content');
    };

    Controllers.prototype.setController = function(controllerKey) {
      var _this = this,
        module = this.modules[controllerKey];

      this.$elementModuleHeadLabel.text(module.label);
      this.$elementModuleHead.addClass('active');

      setTimeout(function(){
        _this.controller = new module.class();
        _this.controller.show(_this.$element);
      }, 500);

      this.controller = new this.modules[controllerKey]();
      this.controller.render(this.$element);
    };

    return Controllers;
});
