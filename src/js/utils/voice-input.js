/*global define webkitSpeechRecognition SpeechSynthesisUtterance
         speechSynthesis */

define(['utils/pubsub'], function(pubsub) {

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
    var _this = this;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous     = true;
    this.recognition.interimResults = true;
    this.recognition.lang           = this.lang;
    this.recognition.onstart        = function () {  
        pubsub.emitEvent('microphone:allowed');
    };
    this.recognition.onerror        = function (err) {  };
    this.recognition.onresult       = function (event) {
      _this.speechInputHandler(event, callback);
    };//.bind(this);

    return this.recognition.start();
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
