/*global define */

define([
    'jquery',
    'utils/pubsub',
    'controllers/news',
    'controllers/weather',
    'controllers/sport/fixtures',
    'controllers/sport/tables',
    'controllers/travel',
    'controllers/welcome',
    'controllers/microphone',
    'controllers/error'
  ],
  function(
    $,
    pubsub,
    ControllerNews,
    ControllerWeather,
    ControllerSportFixtures,
    ControllerSportTables,
    ControllerTravel,
    ControllerWelcome,
    ControllerMicrophone,
    ControllerError
  ) {

    var Controllers = function() {
      this.currentController = undefined;
      this.modules = {
        news: {
          class: ControllerNews
        },
        weather: {
          class: ControllerWeather
        },
        sport: {
          class: {
            fixtures: ControllerSportFixtures,
            tables: ControllerSportTables
          }
        },
        travel: {
          class: ControllerTravel
        },
        welcome: {
          class: ControllerWelcome
        },
        microphone: {
          class: ControllerMicrophone
        },
        error: {
          class: ControllerError
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

    Controllers.prototype.setController = function(controllerKey, context) {
      var _this = this;
      pubsub.emitEvent('speech:cancel');

      if (this.controller) {
        this.controller.hide(function(){
          _this.hideHeader();
          setTimeout(function(){
            _this.changeController(controllerKey, context);
          }, 500);
        });
      } else {
        this.changeController(controllerKey, context);
      }
    };

    Controllers.prototype.changeController = function(controllerKey, context) {
      var _this = this,
        module = this.modules[controllerKey],
        moduleClass;

      if (this.controllerKey) {
        this.$wrap.removeClass('page-' +this.controllerKey);
      }

      this.context = context;
      this.controllerKey = controllerKey;
      if (typeof module.class === 'object') {
        moduleClass = module.class[context.params.action];
      } else {
        moduleClass = module.class;
      }

      pubsub.removeEvent('controller:ready');
      pubsub.addListener('controller:ready', function(title) {
        _this.showHeader(title);
        _this.showController();
      });

      this.$wrap.addClass('page-' +this.controllerKey);
      this.controller = new moduleClass(this.context);

    };

    return Controllers;
});
