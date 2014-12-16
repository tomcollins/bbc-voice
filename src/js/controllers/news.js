define(['jquery', 'utils/pubsub', 'ui/list', 'ui/list/item/news'],
  function($, pubsub, List, ListItemNews) {

    var ControllerNews = function(context) {
      var _this = this,
        message;
      this.context = context;
      this.topicTerm = context.params.topic;
      this.topic = undefined;
      this.fetchData(this.topicTerm, function(data) {
        if (data.topic && data.topic.id) {
          _this.topic = data.topic;
        } else {
          message = 'I could not find any articles about ' +_this.topicTerm;
          pubsub.emitEvent('speech:speak', [message]);
          return;
        }
        if (data.news.length > 0) {
          _this.data = data.news;
          pubsub.emitEvent('news:topic', [_this.topic]);
          _this.checkDataState();
        }
      });
    };

    ControllerNews.prototype.show = function($element) {
      var _this = this;
      this.$element = $element;
      this.isShown = true;
      this.checkDataState();
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

    ControllerNews.prototype.checkDataState = function() {
      var _this = this;
      if (this.$element && this.data) {
        this.render(this.$element);
      }
    };

    ControllerNews.prototype.render = function($element) {
      var _this = this;
      this.list = new List();
      this.data.forEach(function(data, index) {
        if (index < 10) {
          _this.list.addItem(new ListItemNews(data, _this.topic));
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

    ControllerNews.prototype.fetchData = function(topic, callback) {
      $.ajax({
        url: 'http://api-newshack.rhcloud.com/news' + (topic ? '?topic=' +topic : ''),
        dataType: 'json',
        success: function(data) {
          callback(data);
        }
      });
    };

    return ControllerNews;

});
