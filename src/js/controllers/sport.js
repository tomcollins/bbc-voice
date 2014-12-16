define(['jquery', 'utils/pubsub', 'controller', 'ui/list', 'ui/list/item/sport/fixture'],
  function($, pubsub, Controller, List, ListItemSportFixture) {

    var ControllerSport = function(context, autoPlay) {
      var _this = this;
      Controller.call(this, context, autoPlay)

      this.leagueTerm = context.params.league;
      this.fetchData(this.leagueTerm, function(data) {
        _this.validateData(data);
      });
    };

    ControllerSport.prototype = Object.create(Controller.prototype);
    ControllerSport.prototype.constructor = ControllerSport;

    ControllerSport.prototype.show = function($element) {
      var _this = this;
      // as there is no http request delay there are times
      // when the list transition completes before the module title speech completes
      // in this case the first list item picks up the speech:complete event 
      // and fires off its list:item:complete event 
      // should add an id to the speech:speak and speech:complete
      this.showTimeoutId = setTimeout(function(){
        Controller.prototype.show.call(_this, $element);
      }, 1000);
    };

    ControllerSport.prototype.hide = function(callback) {
      Controller.prototype.hide.call(this, callback);
      clearTimeout(this.showTimeoutId);
    }

    ControllerSport.prototype.validateData = function(data) {
      var message;
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
        if (this.leagueTerm) {
          pubsub.emitEvent('sport:league', [this.league]);
        }
      }
    };

    ControllerSport.prototype.renderListItem = function(data) {
      this.list.addItem(new ListItemSportFixture(data, this.league));
    }

    ControllerSport.prototype.fetchData = function(league, callback) {
      Controller.prototype.fetchData.call(this, '/json/sport/fixtures/' + league +'.json', callback);
    };

    return ControllerSport;

});
