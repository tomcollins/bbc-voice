/*global define */

define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var AutoPlay = function () {
      var _this = this;
      this.isEnabled = true;
       $('#autoplay').click(function () {
         _this.isEnabled = _this.isEnabled===false ? true : false;
         $(this).toggleClass('active');
         $(this).text(_this.isEnabled ? 'Auto Scroll On' : 'Auto Scroll Off');
         pubsub.emitEvent('autoplay:' +(_this.isEnabled ? 'enabled' : 'disabled'));
        });
    };

    return AutoPlay;
});
