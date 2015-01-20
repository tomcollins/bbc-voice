define(['jquery', 'utils/pubsub', 'controller', 'ui/list', 'ui/list/item/sport/fixture', 'ui/list/item/sport/table'],
  function($, pubsub, Controller, List, ListItemSportFixture, ListItemSportTable) {

    var ControllerSport = function(context) {
      var _this = this;
      Controller.call(this, context)
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

    ControllerSport.prototype.validateData = function(data, messageId, messageType) {
    };

    ControllerSport.prototype.renderListItem = function(data) {
      
    }

    ControllerSport.prototype.fetchData = function(action, id, callback) {
      Controller.prototype.fetchData.call(this, '/json/sport/' +action +'/' + id +'.json', callback);
    };

    return ControllerSport;

});
