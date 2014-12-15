/*global define webkitSpeechRecognition SpeechSynthesisUtterance
         speechSynthesis */

define([], function() {

  var VoiceInput = function () {
    this.lang = 'en-GB';
  };

  /**
   * Start listening for audio input
   *
   * var input = new VoiceInput();
   * input.listen( function (result) {
   *   console.log(result);
   * });
   *
   * @param { function } callback
   */
  VoiceInput.prototype.listen = function (callback) {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous     = true;
    recognition.interimResults = true;
    recognition.lang           = this.lang;
    recognition.onerror        = function (err) {  };
    recognition.onresult       = function (event) {
      this.speechInputHandler(event, callback);
    }.bind(this);
    return recognition.start();
  };

  /**
   * @param { Function } f a callback function
   */
  VoiceInput.prototype.speechInputHandler = function (event, f) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        var final_transcript = event.results[i][0].transcript;
        f(final_transcript.trim());
      }
    }
  };

  return VoiceInput;
});
