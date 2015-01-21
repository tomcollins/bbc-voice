define(['jquery', 'utils/pubsub', 'controller'],
  function($, pubsub, Controller) {

    var ControllerError = function(context) {
      Controller.call(this, context);
      this.errorType = context.params.type;
      this.hasData = false;
      this.checkDataState();
    };

    ControllerError.prototype = Object.create(Controller.prototype);
    ControllerError.prototype.constructor = ControllerError;

    ControllerError.prototype.hide = function(callback) {
      var _this = this;
      this.removePubSubEvents();
      
      if (!this.isShown) {
        callback();
      } else {
        this.isShown = false;
        this.$element.find('.welcome').addClass('welcome-close');
        setTimeout(function(){
          _this.$element.empty();
          callback();
        }, 500);
      }
    };

    ControllerError.prototype.render = function($element) {
      var _this = this;
      
      var html = '<div class="column-wrap welcome">';

      if ('voice' === this.errorType) {
        html += '<p class="fade index-0">Sorry we did not understand that command.</p>'
        + '<p class="fade index-1">Please try again.</p>';
      } else {
        html += '<p class="fade index-0">Sorry we experienced a technical problem.</p>'
        + '<p class="fade index-1">Please try again.</p>';
      }

      html += '</div>';
        $element.html(html);

        setTimeout(function(){
          $element.find('.welcome').addClass('welcome-active');
        });
    };

    return ControllerError;

});
