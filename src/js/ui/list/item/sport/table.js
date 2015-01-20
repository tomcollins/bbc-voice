define(['jquery', 'utils/pubsub', 'ui/list/item'],
  function($, pubsub, ListItem) {

    var ListItemSportTable = function(data, league) {
      ListItem.call(this, data);
      this.league = league;
    };

    ListItemSportTable.prototype = Object.create(ListItem.prototype);
    ListItemSportTable.prototype.constructor = ListItemSportTable;

    ListItemSportTable.prototype.getHtml = function() {
      var html;
      html = '<div class="list-item-sport list-item-sport-table column-wrap">'
        + '<div class="list-item-sport-inner">' 
        + '<p class="table-position">' +this.data.position +'</p>'
        + '<p class="sport-team">' +this.data.team.name +'</p>'
        + '</div></div>';
      return html;
    };

    ListItemSportTable.prototype.postActivateHook = function() {
      setTimeout(function(){
        pubsub.emitEvent('list:item:complete');
      }, 6000);
    };

    return ListItemSportTable;

});
