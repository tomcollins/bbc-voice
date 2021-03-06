define(['jquery', 'utils/pubsub', 'ui/list', 'ui/list/item/news'],
  function($, pubsub, List, ListItemNews) {

    var Controller = function(context) {
      var _this = this,
        message;
      this.context = context;
      this.autoPlay = this.context.params.autoPlay;
      this.hasData = true;
      this.data = undefined;
    };

    Controller.prototype.showLoadingMessage = function() {
      $('#module-content').append('<div id="loading"><img src="/img/ajax-loader.gif"/></div>');
      setTimeout(function(){
        $('#loading').addClass('active');
      }, 1000);
    };

    Controller.prototype.hideLoadingMessage = function() {
      $('#loading').remove();
    };

    Controller.prototype.show = function($element) {
      var _this = this;
      this.$element = $element;
      this.isShown = true;
      this.checkDataState();
    };

    Controller.prototype.hide = function(callback) {
      var _this = this;
      this.removePubSubEvents();

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
    Controller.prototype.removePubSubEvents = function() {
      pubsub.removeEvent('list:show:complete');
      pubsub.removeEvent('voice:next');
      pubsub.removeEvent('voice:previous');
      pubsub.removeEvent('list:item:complete');
      pubsub.removeEvent('autoplay:enabled');
      pubsub.removeEvent('autoplay:disabled');
    };

    Controller.prototype.getTitle = function() {
      return 'BBC Voice';
    };

    Controller.prototype.checkDataState = function() {
      var _this = this;
      if (this.data) {
        this.hideLoadingMessage();
      }
      if (
        !this.hasEmittedReadyEvent &&
        (!this.hasData || (this.hasData && this.data))
      ) {
        this.hasEmittedReadyEvent = true;
        pubsub.emitEvent('controller:ready', [this.getTitle()]);
      }
      if (this.$element) {
        this.render(this.$element);
      }
    };

    Controller.prototype.render = function($element) {
      var _this = this;
      this.list = new List();
      this.data.forEach(function(data, index) {
        if (index < 10) {
          _this.renderListItem(data);
        }
      });

      this.list.render($element);
      this.list.show();

      this.addEventsAfterRender($element);
    };

    Controller.prototype.renderListItem = function(data) {
    };

    Controller.prototype.addEventsAfterRender = function($element) {
      var _this = this;
      pubsub.addListener('list:show:complete', function() {
        _this.list.setIndex(_this.listStartIndex ? _this.listStartIndex : 0);
      });
      pubsub.addListener('voice:next', function() {
        if (!_this.list.isTransitioning) {
          _this.list.next();
        }
      });
      pubsub.addListener('voice:previous', function() {
        if (!_this.list.isTransitioning) {
          _this.list.prev();
        }
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
    };

    Controller.prototype.fetchData = function(url, callback) {
      $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
          callback(data);
        },
        error: function() {
          pubsub.emitEvent('error:http');
        }
      });
    };

    Controller.prototype.fetchLocation = function(searchTerm, callback) {
      var url = '//api-newshack.rhcloud.com/location?search=' + searchTerm;
      this.fetchData(url, callback);
    };

    return Controller;

});
