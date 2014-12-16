define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var ListItemWeather = function(data, location, matchesTimeTerm, hintTerm) {
      this.data = data;
      this.location = location;
      this.matchesTimeTerm = matchesTimeTerm;
      this.hintTerm = hintTerm;
    };

    ListItemWeather.prototype.getHtml = function() {
      var html,
        weather,
        ambience
        time = moment(this.data.date).format('ll');

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
      var _this = this,
        message,
        getTimeMessage = function() {
          if ('today' === String(_this.data.name).toLowerCase()) {
            return 'today';
          } else {
            return 'on ' +_this.data.name;
          }
        };

      if (this.matchesTimeTerm && this.hintTerm === 'umbrella') {
        if (this.data.type.id <= 5) {
          message = 'You will not be needing an umbrella in ' +this.location.name +' ' +getTimeMessage();
        } else if (this.data.type.id <= 10) {
          message = 'There is a chance of rain in ' +this.location.name +' ' +getTimeMessage() +' so you had better take an umbrella just in case';
        } else {
          message = 'Take your umbrella. There is a high chance of rain in ' +this.location.name +' ' +getTimeMessage();
        }
      }

      if (!message) {
        message = 'Weather for ' +this.data.name +'. ' + this.data.summary;
      }

      this.$element = $element;
      
      pubsub.addListener('speech:complete', function() {
        pubsub.emitEvent('list:item:complete');
      });
      pubsub.emitEvent('speech:speak', [message]);
    };

    ListItemWeather.prototype.deactivate = function() {
      pubsub.removeEvent('speech:complete');
      pubsub.emitEvent('speech:cancel');
    };

    

    return ListItemWeather;

});
