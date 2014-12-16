define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var ListItemNews = function(data) {
      this.data = data;
    };

    ListItemNews.prototype.getHtml = function() {
      var html,
        timeAgo = moment(this.data.lastUpdated).fromNow(),
        hasImage = this.data.images && this.data.images.fullsize,
        style = "";

        style = hasImage ? 'background-image: url(' +(this.data.images.fullsize) +')' : '';

      html = 
        '<div class="background-image" style="' +style +'"></div>'
        + '<div class="list-item-news column-wrap ' +(hasImage ? 'list-item-news-with-image' : '') +'">'
        + '<div class="list-item-news-inner">' 
        + '<h2>' +this.data.shortName +'</h2>'
        + '<p class="info"><span>' +this.data.collectionName +'</span> | ' +timeAgo +'</p>'
        + '<p class="summary">' +this.data.summary +'</p>';
        html += '</div></div>';
        
      return html;
    };

    ListItemNews.prototype.activate = function($element) {
      var message = 'From ' +this.data.collectionName +' news. '
        + this.data.name +'. '
        + this.data.summary +'.';
      this.$element = $element;
      pubsub.emitEvent('speech:speak', [message]);
    };

    ListItemNews.prototype.deactivate = function() {
      pubsub.emitEvent('speech:cancel');
    };

    return ListItemNews;

});
