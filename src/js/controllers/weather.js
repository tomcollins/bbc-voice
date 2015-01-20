define(['jquery', 'utils/pubsub', 'controller', 'ui/list', 'ui/list/item/weather'],
  function($, pubsub, Controller, List, ListItemWeather) {

    var ControllerWeather = function(context) {
      var _this = this;
      Controller.call(this, context);

      this.locationTerm = context.params.location;
      this.timeTerm = String(context.params.time).toLowerCase();
      this.hintTerm = String(context.params.hint).toLowerCase();
      this.location = undefined;

      this.fetchLocation(this.locationTerm, function(data) {
        if (data.location) {
          _this.location = data.location;
          pubsub.emitEvent('weather:location', [_this.location]);
          _this.checkDataState();
        } else {
          message = 'I could not find the location ' +_this.locationTerm;
          pubsub.emitEvent('speech:speak', [message]);
        }
      });
    };

    ControllerWeather.prototype.getTitle = function() {
      var locationName = (this.location && this.location.name) ? this.location.name : this.context.params.locationTerm;
      return 'Weather - ' +locationName;
    };

    ControllerWeather.prototype = Object.create(Controller.prototype);
    ControllerWeather.prototype.constructor = ControllerWeather;

    ControllerWeather.prototype.checkDataState = function() {
      var _this = this;

      // this is most likely not necessary and can probably be removed
      // it was added quickly while trying to fix the double show() bug
      if (this.list) {
        return;
      }

      if (this.$element && this.location) {
        if (this.data) {
          this.render();
        } else {
          this.fetchData(this.location, function(data){
            _this.data = data;
            _this.render(_this.$element);
          });
        }
      }
    };

    ControllerWeather.prototype.render = function($element) {
      var _this = this,
        matchesTimeTerm,
        listStartIndex = false;
      this.list = new List();

      if (_this.timeTerm === 'tomorrow') {
        listStartIndex = 1;
      }
      this.data.weather.forEach(function(data, index) {
        if (index < 10) {
          matchesTimeTerm = false;
          if (_this.timeTerm) {
            if (
              (listStartIndex !== false && index === listStartIndex) ||
              (listStartIndex === false && String(data.name).toLowerCase() === _this.timeTerm)
            ) {
              matchesTimeTerm = true;
              listStartIndex = index;
            }
          }
          _this.list.addItem(new ListItemWeather(data, _this.location, matchesTimeTerm, _this.hintTerm));
        }
      });
      if (!listStartIndex) {
        listStartIndex = 0;
      }
      this.listStartIndex = listStartIndex;

      this.list.render($element);
      this.list.show();

      Controller.prototype.addEventsAfterRender.call(this, $element);
    };

    ControllerWeather.prototype.fetchLocation = function(searchTerm, callback) {
      var url = '//api-newshack.rhcloud.com/location?search=' + searchTerm;
      Controller.prototype.fetchData.call(this, url, callback);
    };

    ControllerWeather.prototype.fetchData = function(location, callback) {
      var url = '//api-newshack.rhcloud.com/weather?location_id=' +location.id;
      Controller.prototype.fetchData.call(this, url, callback);
    };

    return ControllerWeather;

});
