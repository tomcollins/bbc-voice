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

    ListItemWeather.prototype.activate = function($element) {
      var message = 'Weather for ' +this.data.name +'. '
        + this.data.summary;
      this.$element = $element;
      pubsub.emitEvent('speech:speak', [message]);
    };

    ListItemWeather.prototype.deactivate = function() {
      pubsub.emitEvent('speech:cancel');
    };

    

    return ListItemWeather;

});
