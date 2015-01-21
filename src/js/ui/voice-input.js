define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var VoiceInput = function() {
      var _this = this;
      this.$voiceInput = $('#voice-input');
      this.isMuted = false;

      pubsub.addListener('microphone:allowed', function() {
        _this.$voiceInput.addClass('enabled');
        _this.$voiceInput.on('click', function() {
          pubsub.emitEvent('voice:toggleMute');
        });
      });
      pubsub.addListener('voice:mute', function() {
        _this.mute();
      });
      pubsub.addListener('voice:unmute', function() {
        _this.unmute();
      });
      pubsub.addListener('voice:trigger', function() {
        _this.trigger();
      });
    };

    VoiceInput.prototype.mute = function() {
      this.isMuted = true;
      this.$voiceInput.addClass('muted');
    };

    VoiceInput.prototype.unmute = function() {
      this.isMuted = false;
      this.$voiceInput.removeClass('muted');
    };

    VoiceInput.prototype.trigger = function() {
      var _this = this;
      this.$voiceInput.addClass('success');
      setTimeout(function() {
        _this.$voiceInput.removeClass('success');
      }, 3000);
    };

    return VoiceInput;

});
