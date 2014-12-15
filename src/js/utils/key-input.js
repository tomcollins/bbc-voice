/*global define webkitSpeechRecognition SpeechSynthesisUtterance
         speechSynthesis */

define(['utils/pubsub'], function(pubsub) {

  var KeyInput = function () {
    $(document).keydown(function(e) {
      var keyCode = e.keyCode,
        command;
      if (37 === keyCode) {
        command = 'back'; //left
      } else if (38 === keyCode) {
        command = 'prev'; //up
      } else if (39 === keyCode) {
        command = 'more'; //right
      } else if (40 === keyCode) {
        command = 'next'; //down
      }
      if (command) {
        e.preventDefault();
        pubsub.emitEvent('voice:' +command);
      }
    });
  };

  return KeyInput;
});
