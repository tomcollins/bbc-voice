define(['jquery', 'utils/pubsub', 'ui/list/item'],
  function($, pubsub, ListItem) {

    var ListItemNews = function(data, topic) {
      ListItem.call(this, data);

      this.topic = topic;
    };

    ListItemNews.prototype = Object.create(ListItem.prototype);
    ListItemNews.prototype.constructor = ListItemNews;

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
        + '<h2><a href="' +this.data.shareUrl +'">' +this.data.shortName +'</a></h2>'
        + '<p class="info"><span>' +this.data.collectionName +'</span> | ' +timeAgo +'</p>'
        + '<p class="summary">' +this.data.summary +'</p>';
        if (hasImage) {
          html += '<div class="news-item-image"><img src="' +this.data.images.fullsize +'"/></div>';
        }
        html += '</div></div>';
        
      return html;
    };

    ListItemNews.prototype.postActivateHook = function() {
      var message;
      if (
        !this.topic || 
        (this.topic && this.topic.name && this.topic.name != this.data.collectionName)
      ) {
        message = 'From ' +this.data.collectionName +' ';
      }
      message += moment(this.data.lastUpdated).fromNow() +'. '
        + this.data.name +'. '
        + this.data.summary +'.';
      pubsub.emitEvent('speech:speak', [message]);

      pubsub.addListener('voice:more', function() {
        window.location = _this.data.shareUrl;
      });
    };

    return ListItemNews;

});
