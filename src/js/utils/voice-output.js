/*global define webkitSpeechRecognition SpeechSynthesisUtterance
         speechSynthesis */

define(['utils/pubsub'], function(pubsub) {

  var VoiceOutput = function () {
    this.rate = 1;
    this.pitch = 1.5;
    this.lang = 'en-GB';
    this.isSupported = (undefined !== window.SpeechSynthesisUtterance);
   };

  VoiceOutput.prototype.prepareSpeech = function (speech) {
    var msg, voices;
    if (!this.isSupported) {
      return;
    }
    msg = new SpeechSynthesisUtterance(speech);
    voices = speechSynthesis.getVoices();
    msg.rate  = this.rate;
    msg.pitch = this.pitch;
    msg.lang  = this.lang;
    msg.onend = function ( ) {
      pubsub.emitEvent('speech:complete');
    };
    return msg;
  };

  /**
   * Read a command out loud i.e
   *
   * var voice = new Voice();
   * voice.say('Hello world');
   */
  VoiceOutput.prototype.say = function (speech) {
    if (!this.isSupported) {
      return;
    }
    this.cancel();
    pubsub.emitEvent('speech:start');
    speechSynthesis.speak(this.prepareSpeech(speech));
  };

  /**
   * Read a command out loud i.e
   *
   * var voice = new Voice();
   * voice.say('Hello world');
   */
  VoiceOutput.prototype.cancel = function (speech) {
    if (!this.isSupported) {
      return;
    }
    speechSynthesis.cancel();
  };

  return VoiceOutput;
});
