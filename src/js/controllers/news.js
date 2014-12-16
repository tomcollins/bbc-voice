define(['jquery', 'utils/pubsub', 'controller', 'ui/list', 'ui/list/item/news'],
  function($, pubsub, Controller, List, ListItemNews) {

    var ControllerNews = function(context, autoPlay) {
      var _this = this;
      Controller.call(this, context, autoPlay);

      this.topicTerm = context.params.topic;
      this.topic = undefined;
      this.fetchData(this.topicTerm, function(data) {
        this.validateData(data);
      });
    };

    ControllerNews.prototype = Object.create(Controller.prototype);
    ControllerNews.prototype.constructor = ControllerNews;

    ControllerNews.prototype.validateData = function(data) {
      var message;
      if (this.topicTerm) {
        if (data.topic && data.topic.id) {
          this.topic = data.topic;
        } else {
          message = 'I could not find any articles about ' +this.topicTerm;
          pubsub.emitEvent('speech:speak', [message]);
          return;
        }
      }
      if (data.news.length > 0) {
        this.data = data.news;
        this.checkDataState();
        if (this.topicTerm) {
          pubsub.emitEvent('news:topic', [this.topic]);
        }
      }
    };

    ControllerNews.prototype.renderListItem = function(data) {
      this.list.addItem(new ListItemNews(data, this.topic));
    }

    ControllerNews.prototype.fetchData = function(topic, callback) {
      Controller.prototype.fetchData.call(this, '//api-newshack.rhcloud.com/news' + (topic ? '?topic=' +topic : ''), callback);
    };

    return ControllerNews;

});
