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
      this.$wrap = $('#wrap');
      this.$elementModuleHead = $('#module-head');
      this.$elementModuleHeadInner = $('#module-head-inner');
      this.$elementModuleHeadLabel = $('#module-head h1');
      this.$element = $('#module-content');
    };

    Controllers.prototype.showHeader = function(label) {
      this.$elementModuleHeadLabel.text(label);
      this.$elementModuleHead.addClass('active');
    };

    Controllers.prototype.hideHeader = function(label) {
      this.$elementModuleHead.removeClass('active');
    };

    Controllers.prototype.showController = function() {
      var _this = this;
      setTimeout(function(){
        _this.controller.show(_this.$element);
      }, 500);
    };

    Controllers.prototype.setController = function(controllerKey, context, autoPlay) {
      var _this = this;

      pubsub.emitEvent('speech:cancel');

      if (this.controller) {
        this.controller.hide(function(){
          _this.hideHeader();
          setTimeout(function(){
            _this.changeController(controllerKey, context, autoPlay);
          }, 500);
        });
      } else {
        this.changeController(controllerKey, context, autoPlay);
      }
    };

    Controllers.prototype.changeController = function(controllerKey, context, autoPlay) {
      var _this = this,
        module = this.modules[controllerKey];

      if (this.controllerKey) {
        this.$wrap.removeClass('page-' +this.controllerKey);
      }

      this.context = context;
      this.controllerKey = controllerKey;
      this.controller = new module.class(this.context, autoPlay);
      this.$wrap.addClass('page-' +this.controllerKey);

      if ('weather' === controllerKey) {
        pubsub.addListener('weather:location', function(location) {
          var name = location.name;
          if (location.name !== location.container) {
            name += ', ' +location.container;
          }
          pubsub.emitEvent('speech:speak', ['Weather for ' +location.name]);
          _this.showHeader(module.label +' - ' +name);
          _this.showController();
        });
      } else if ('news' === controllerKey && context.params.topic) {
        pubsub.addListener('news:topic', function(topic) {
          var topicName = (topic && topic.name) ? topic.name : context.params.topic;
          pubsub.emitEvent('speech:speak', ['News about ' +topicName]);
          _this.showHeader(module.label +' - ' +topicName);
          _this.showController();
        });
      } else {
        pubsub.emitEvent('speech:speak', [module.label]);
        this.showHeader(module.label);
        this.showController();
      }
    };

    return Controllers;
});
