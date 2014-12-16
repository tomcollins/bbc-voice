define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var ListItem = function(data) {
      this.data = data;
    };

    ListItem.prototype.getHtml = function() {
      var html;

      html = '<div class="list-item-sport list-item-sport-fixture column-wrap">'
        + '<div class="list-item-sport-inner">' 
        + '<p class="fixture-date">' +this.data.date +'</p>'
        + '<p class="sport-team sport-team-home">' +this.data.teams.home.name +'</p>'
        + '<p class="sport-team-vs">vs</p>'
        + '<p class="sport-team sport-team-away">' +this.data.teams.away.name +'</p>'
        + '</div></div>';
        
      return html;
    };

    ListItem.prototype.activate = function($element) {
      var _this = this;
      this.$element = $element;

      pubsub.addListener('speech:complete', function() {
        pubsub.emitEvent('list:item:complete');
      });

      this.postActivateHook();
    };

    ListItem.prototype.postActivateHook = function() {
    };

    ListItem.prototype.deactivate = function() {
      pubsub.removeEvent('speech:complete');
      pubsub.removeEvent('voice:more');
      pubsub.emitEvent('speech:cancel');
    };

    return ListItem;

});
