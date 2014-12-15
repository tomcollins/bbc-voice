define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var ListItemNews = function(data) {
      this.data = data;
    };

    ListItemNews.prototype.getHtml = function() {
      var html,
        timeAgo = moment(this.data.lastUpdated).fromNow();

      html = '<div class="list-item-news column-wrap">'
        + '<h2>' +this.data.shortName +'</h2>'
        + '<p>' +timeAgo +'</p>'
        + '</div>';

      return html;
    };

    ListItemNews.prototype.activate = function() {
      pubsub.emitEvent('voice:speak', [this.data.name]);
    };

    

    return ListItemNews;

});
