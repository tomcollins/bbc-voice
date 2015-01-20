define(['jquery', 'utils/pubsub', 'controller', 'ui/list', 'ui/list/item/sport/fixture'],
  function($, pubsub, Controller, List, ListItemSportFixture) {

    var ControllerTravel = function(context) {
      Controller.call(this, context);
      this.hasData = false;
    };

    ControllerTravel.prototype = Object.create(Controller.prototype);
    ControllerTravel.prototype.constructor = ControllerTravel;

    ControllerTravel.prototype.hide = function(callback) {
      var _this = this;
      this.removePubSubEvents();
      
      if (!this.isShown) {
        callback();
      } else {
        this.isShown = false;
        this.$element.find('.travel').addClass('travel-close');
        setTimeout(function(){
          _this.$element.empty();
          callback();
        }, 500);
      }
    };

    ControllerTravel.prototype.render = function($element) {
      var _this = this;
      
      var html = '<div class="column-wrap travel">'
        + '<h2>Coming soon.</h2>'
        + '</div>';
        $element.html(html);

        setTimeout(function(){
          $element.find('.travel').addClass('travel-active');
        });
    };

    return ControllerTravel;

});
