define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var ListItemWeather = function(data) {
      this.data = data;
    };

    ListItemWeather.prototype.getHtml = function() {
      var html,
        time = moment(this.data.date).format('ll');

      html = '<div class="list-item-weather column-wrap">'
        + '<h2>' +this.data.name +'</h2>'
        + '<p>' +time +'</p>'
        + '</div>';

      return html;
    };

    ListItemWeather.prototype.activate = function() {
      pubsub.emitEvent('voice:speak', [this.data.name]);
    };

    

    return ListItemWeather;

});
