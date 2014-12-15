define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var ControllerNews = function() {
    };

    ControllerNews.prototype.render = function($element) {
      $element.html('<p>News</p>');
    };

    return ControllerNews;

});
