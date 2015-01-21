/*global define */

define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var Restart = function () {
      var _this = this;
      this.$element = $('#restart');
      pubsub.addListener('microphone:allowed', function() {
        _this.$element.addClass('enabled');
      	_this.$element.click(function () {
        	pubsub.emitEvent('restart');
      	});
      });
    };

    return Restart;
});
