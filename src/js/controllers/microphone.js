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

      var html = '<div class="column-wrap welcome">';

      if (window.webkitSpeechRecognition && window.SpeechSynthesisUtterance) {
        html += '<p class="fade index-0">Please ensure that sound is enabled.</p>'
        + '<p class="fade index-1">Please <strong>allow</strong> access to your microphone (above).</p>'
        + '<p class="fade index-2"><img src="/img/microphone_access.png"/></p>'
      } else {
        html += '<p class="fade index-0">Sorry your browser is not currently supported.</p>'
        + '<p class="fade index-1">This demo requires a desktop version of Google Chrome.</p>'
      }

      html += '</div>';
      $element.html(html);

      setTimeout(function(){
        $element.find('.welcome').addClass('welcome-active');
      });
    };

    return ControllerMicrophone;

});
