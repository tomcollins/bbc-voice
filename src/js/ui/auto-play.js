/*global define */

define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var AutoPlay = function () {
      var _this = this;
      this.$element = $('#autoplay');
      this.disable();
      this.$element.click(function () {
        if (_this.isEnabled) {
          _this.disable();
        } else {
          _this.enable();
        }
      });
    };

    AutoPlay.prototype.enable = function() {
      this.isEnabled = true;
      this.$element.addClass('autoplay-enabled');
      this.$element.text('Auto Scroll On');
      pubsub.emitEvent('autoplay:enabled');
    };

    AutoPlay.prototype.disable = function() {
      this.isEnabled = false;
      this.$element.removeClass('autoplay-enabled');
      this.$element.text('Auto Scroll Off');
      pubsub.emitEvent('autoplay:disabled');
    };

    return AutoPlay;
});
