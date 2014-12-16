define(['jquery', 'utils/pubsub', 'ui/list', 'ui/list/item/weather'],
  function($, pubsub, List, ListItemWeather) {

    var ControllerWeather = function(context, autoPlay) {
      var _this = this;
      this.autoPlay = autoPlay; 
      this.context = context;
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
      pubsub.removeEvent('list:item:complete');
      pubsub.removeEvent('autoplay:enabled');
      pubsub.removeEvent('autoplay:disabled');
      if (!this.isShown) {
        callback();
      } else {
        this.isShown = false;
        if (this.list) {
          this.list.hide(function(){
            _this.list.destroy();
            _this.$element.empty();
            callback();
          });
        } else {
          callback();
        }
        
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
      var _this = this,
        matchesTimeTerm,
        startIndex = false;
      this.list = new List();

      if (_this.timeTerm === 'tomorrow') {
        startIndex = 1;
      }
      this.data.weather.forEach(function(data, index) {
        if (index < 10) {
          matchesTimeTerm = false;
          if (_this.timeTerm) {
            if (
              (startIndex !== false && index === startIndex) ||
              (startIndex === false && String(data.name).toLowerCase() === _this.timeTerm)
            ) {
              matchesTimeTerm = true;
              startIndex = index;
            }
          }
          _this.list.addItem(new ListItemWeather(data, _this.location, matchesTimeTerm, _this.hintTerm));
        }
      });
      if (!startIndex) {
        startIndex = 0;
      }
      this.list.render($element);
      pubsub.addListener('list:show:complete', function() {
        _this.list.setIndex(startIndex);
      });
      pubsub.addListener('voice:next', function() {
        _this.itemIsComplete = true;
        _this.list.next();
      });
      pubsub.addListener('voice:previous', function() {
        _this.itemIsComplete = true;
        _this.list.prev();
      });
      pubsub.addListener('list:item:complete', function() {
        _this.itemIsComplete = true;
        if (_this.autoPlay) {
          _this.itemIsComplete = false;
          _this.list.next();
        }
      });
      pubsub.addListener('autoplay:enabled', function() {
        if (!_this.autoPlay) {
          _this.autoPlay = true;
          if (_this.itemIsComplete) {
            _this.list.next();
          }
        }
      });
      pubsub.addListener('autoplay:disabled', function() {
        _this.autoPlay = false;
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
