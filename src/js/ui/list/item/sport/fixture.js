define(['jquery', 'utils/pubsub', 'ui/list/item'],
  function($, pubsub, ListItem) {

    var ListItemSportFixture = function(data, league) {
      ListItem.call(this, data);
      this.league = league;
    };

    ListItemSportFixture.prototype = Object.create(ListItem.prototype);
    ListItemSportFixture.prototype.constructor = ListItemSportFixture;

    ListItemSportFixture.prototype.getHtml = function() {
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

    ListItemSportFixture.prototype.postActivateHook = function() {
      setTimeout(function(){
        pubsub.emitEvent('list:item:complete');
      }, 6000);
    };



    return ListItemSportFixture;

});
