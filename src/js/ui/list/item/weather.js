define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var ListItemWeather = function(data) {
      this.data = data;
    };

    ListItemWeather.prototype.getHtml = function() {
      var html,
        weather,
        ambience
        time = moment(this.data.date).format('ll');

      console.log(this.data);

      ambience = '<div class="weather-ambience weather-ambience-' + this.data.type.id + '"></div>';

      weather = '<div class="weather">'
        + '<div class="weather-summary">'
        + '<div class="weather-icon weather-icon-' + this.data.type.id + '"></div>'
        + '<div class="weather-temp-high">' + this.data.temperature.high.c + '&deg;</div>'
        + '<div class="weather-temp-low">' + this.data.temperature.low.c + '&deg;</div>'
        + '<div class="weather-type">' + this.data.type.description + '</div>'
        + '</div>'
        + '<div class="weather-description">' + this.data.summary + '</div>'
        + '</div>';

      html = ambience
        + '<div class="list-item-weather column-wrap">'
        + '<h2>' +this.data.name +'</h2>'
        + '<p>' +time +'</p>'
        + weather
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
