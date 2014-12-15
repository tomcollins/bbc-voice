define(['jquery', 'utils/pubsub', 'ui/list', 'ui/list/item/news'],
  function($, pubsub, List, ListItemNews) {

    var ControllerNews = function() {
    };

    ControllerNews.prototype.show = function($element) {
      var _this = this;
      this.fetchData(function(data) {
        _this.data = data;
        _this.render($element);
      });
    };

    ControllerNews.prototype.render = function($element) {
      var list = new List();
      this.data.list.forEach(function(data, index) {
        if (index < 10) {
          list.addItem(new ListItemNews(data));
        }
      });
      list.render($element);
      pubsub.addListener('list:show:complete', function() {
        list.setIndex(0);
      });
      pubsub.addListener('voice:next', function() {
        list.next();
      });
      pubsub.addListener('voice:prev', function() {
        list.prev();
      });
      list.show();
    };

    ControllerNews.prototype.fetchData = function(callback) {
      $.ajax({
        url: 'http://api-newshack.rhcloud.com/news',
        dataType: 'json',
        success: function(data) {
          console.log('success', data);
          callback(data);
        }
      });
    };

    return ControllerNews;

});
