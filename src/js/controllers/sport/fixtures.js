define(['jquery', 'utils/pubsub', 'controllers/sport', 'ui/list', 'ui/list/item/sport/fixture'],
  function($, pubsub, ControllerSport, List, ListItemSportFixture) {

    var ControllerSportFixtures = function(context) {
      var _this = this;
      ControllerSport.call(this, context);

      this.leagueTerm = context.params.id;
      this.fetchData('fixtures', this.leagueTerm, function(data) {
        _this.validateData(data);
      });
    };

    ControllerSportFixtures.prototype = Object.create(ControllerSport.prototype);
    ControllerSportFixtures.prototype.constructor = ControllerSportFixtures;

    ControllerSportFixtures.prototype.getTitle = function() {
      var leagueName = (this.league && this.league.name) ? this.league.name : this.context.params.id;
      return 'Sport - ' +leagueName +' - Fixtures';
    };

    ControllerSportFixtures.prototype.validateData = function(data) {
      var message, leagueName;
      if (this.leagueTerm) {
        if (data.league && data.league.id) {
          this.league = data.league;
        } else {
          message = 'I could not find any fixtures for ' +this.leagueTerm;
          pubsub.emitEvent('speech:speak', [message]);
          return;
        }
      }
      if (data.fixtures.length > 0) {
        this.data = data.fixtures;
        this.checkDataState();
      }
    };

    ControllerSportFixtures.prototype.renderListItem = function(data) {
      this.list.addItem(new ListItemSportFixture(data, this.league));
    };

    return ControllerSportFixtures;

});
