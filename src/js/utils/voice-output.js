/*global define webkitSpeechRecognition SpeechSynthesisUtterance
         speechSynthesis */

define([], function() {

  var VoiceOutput = function () {
    this.rate = 1;
    this.pitch = 1.5;
    this.lang = 'en-GB';
   };

  VoiceOutput.prototype.prepareSpeech = function (speech) {
    var msg = new SpeechSynthesisUtterance(speech);
    var voices = speechSynthesis.getVoices()
    msg.rate  = this.rate;
    msg.pitch = this.pitch;
    msg.lang  = this.lang;
    return msg;
  };

  /**
   * Read a command out loud i.e
   *
   * var voice = new Voice();
   * voice.say('Hello world');
   */
  VoiceOutput.prototype.say = function (speech) {
    this.cancel();
    speechSynthesis.speak(this.prepareSpeech(speech));
  };

  /**
   * Read a command out loud i.e
   *
   * var voice = new Voice();
   * voice.say('Hello world');
   */
  VoiceOutput.prototype.cancel = function (speech) {
    speechSynthesis.cancel();
  };

  return VoiceOutput;
});
