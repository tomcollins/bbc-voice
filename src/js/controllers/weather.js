define(['jquery', 'utils/pubsub', 'ui/list', 'ui/list/item/weather'],
  function($, pubsub, List, ListItemWeather) {

    var ControllerWeather = function(context) {
      var _this = this;
      this.context = context;
      this.locationTerm = context.params.location;
      this.location = undefined;
      this.fetchLocation(this.locationTerm, function(data) {
        if (data.location) {
          _this.location = data.location;
          pubsub.emitEvent('weather:location', [_this.location]);
          _this.checkDataState();
        }
      });
    };

    ControllerWeather.prototype.show = function($element) {
      var _this = this;
      this.isShown = true;
      this.$element = $element;
      this.checkDataState();
    };

    ControllerWeather.prototype.hide = function(callback) {
      var _this = this;
      pubsub.removeEvent('list:show:complete');
      pubsub.removeEvent('voice:next');
      pubsub.removeEvent('voice:previous');
      if (!this.isShown) {
        callback();
      } else {
        this.list.hide(function(){
          _this.list.destroy();
          _this.$element.empty();
          callback();
        });
        this.isShown = false;
      }
    };

    ControllerWeather.prototype.checkDataState = function() {
      var _this = this;
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
      var _this = this;
      this.list = new List();
      this.data.weather.forEach(function(data, index) {
        if (index < 10) {
          _this.list.addItem(new ListItemWeather(data));
        }
      });
      this.list.render($element);
      pubsub.addListener('list:show:complete', function() {
        _this.list.setIndex(0);
      });
      pubsub.addListener('voice:next', function() {
        _this.list.next();
      });
      pubsub.addListener('voice:previous', function() {
        _this.list.prev();
      });
      this.list.show();
    };

    ControllerWeather.prototype.fetchLocation = function(searchTerm, callback) {
      $.ajax({
        url: '//api-newshack.rhcloud.com/location?search=' + searchTerm,
        dataType: 'json',
        success: function(data) {
          callback(data);
        }
      });
    };

    ControllerWeather.prototype.fetchData = function(location, callback) {
      $.ajax({
        url: '//api-newshack.rhcloud.com/weather?location_id=' +location.id,
        dataType: 'json',
        success: function(data) {
          callback(data);
        }
      });
    };

    return ControllerWeather;

});
