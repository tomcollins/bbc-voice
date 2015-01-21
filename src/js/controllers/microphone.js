define(['jquery', 'utils/pubsub', 'controller'],
  function($, pubsub, Controller) {

    var ControllerMicrophone = function(context) {
      Controller.call(this, context);
      this.hasData = false;
      this.checkDataState();
    };

    ControllerMicrophone.prototype = Object.create(Controller.prototype);
    ControllerMicrophone.prototype.constructor = ControllerMicrophone;

    ControllerMicrophone.prototype.hide = function(callback) {
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

    ControllerMicrophone.prototype.render = function($element) {
      var _this = this;
      
      var html = '<div class="column-wrap welcome">'
        + '<p class="fade index-0">Please ensure that sound is enabled.</p>'
        + '<p class="fade index-1">Please <strong>allow</strong> access to your microphone (above).</p>'
        + '<p class="fade index-2"><img src="/img/microphone_access.png"/></p>'
        + '</div>';
        $element.html(html);

        setTimeout(function(){
          $element.find('.welcome').addClass('welcome-active');
        });
    };

    return ControllerMicrophone;

});
