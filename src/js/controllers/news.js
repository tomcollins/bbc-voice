define(['jquery', 'utils/pubsub', 'ui/list', 'ui/list/item/news'],
  function($, pubsub, List, ListItemNews) {

    var ControllerNews = function() {
    };

    ControllerNews.prototype.show = function($element) {
      var _this = this;
      this.$element = $element;
      this.isShown = true;
      this.fetchData(function(data) {
        _this.data = data;
        _this.render($element);
      });
    };

    ControllerNews.prototype.hide = function(callback) {
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

    ControllerNews.prototype.render = function($element) {
      var _this = this;
      this.list = new List();
      this.data.news.forEach(function(data, index) {
        if (index < 10) {
          _this.list.addItem(new ListItemNews(data));
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

    ControllerNews.prototype.fetchData = function(callback) {
      $.ajax({
        url: 'http://api-newshack.rhcloud.com/news',
        dataType: 'json',
        success: function(data) {
          callback(data);
        }
      });
    };

    return ControllerNews;

});
