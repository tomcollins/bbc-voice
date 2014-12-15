define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var ListItemNews = function(data) {
      this.data = data;
    };

    ListItemNews.prototype.getHtml = function() {
      var html = '<div class="list-item-news">'
        + '<h2>Title: ' +this.data.title +'</h2>'
        + '<p>2 hours ago</p>'
        + '</div>';
      return html;
    };

    return ListItemNews;

});
