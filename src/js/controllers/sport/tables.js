define(['jquery', 'utils/pubsub', 'controllers/sport', 'ui/list', 'ui/list/item/sport/table'],
  function($, pubsub, ControllerSport, List, ListItemSportTable) {

    var ControllerSportTables = function(context) {
      var _this = this;
      ControllerSport.call(this, context)

      this.leagueTerm = context.params.id;
      this.fetchData('tables', this.leagueTerm, function(data) {
        _this.validateData(data);
      });
    };

    ControllerSportTables.prototype = Object.create(ControllerSport.prototype);
    ControllerSportTables.prototype.constructor = ControllerSportTables;

    ControllerSportTables.prototype.validateData = function(data) {
      var message;
      if (this.leagueTerm) {
        if (data.league && data.league.id) {
          this.league = data.league;
        } else {
          message = 'I could not find any tables for ' +this.leagueTerm;
          pubsub.emitEvent('speech:speak', [message]);
          return;
        }
      }
      if (data.fixtures.length > 0) {
        this.data = data.fixtures;
        if (this.checkDataState()) {
          leagueName = (data.league && data.league.name) ? data.league.name : this.context.params.id;
          pubsub.emitEvent('controller:ready', ['Sport - ' +leagueName +' table']);
        }
      }
    };

    ControllerSportTables.prototype.renderListItem = function(data) {
      this.list.addItem(new ListItemSportTables(data, this.league));
    };

    return ControllerSportTables;

});
