/*global define */

define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var AutoPlay = function () {
      this.autoPlay = false;
       $('#autoplay').click(function () {
         this.autoPlay = this.autoPlay===false ? true : false;
         $(this).toggleClass('active');
         pubsub.emitEvent('autoplay:toggle');
        });
    };

    return AutoPlay;
});
