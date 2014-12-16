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
        command = 'previous'; //up
      } else if (39 === keyCode) {
        command = 'more'; //right
      } else if (40 === keyCode) {
        command = 'next'; //down
      } else if (49 === keyCode) {
        command = 'news'; //1
      } else if (50 === keyCode) {
        command = 'weather'; //2
      } else if (32 === keyCode) {
        command = 'toggleMute'; //space
      }
      if (command) {
        e.preventDefault();
        if (command != 'toggleMute') {
          pubsub.emitEvent('voice:trigger');
        }
        pubsub.emitEvent('voice:' +command);
      }
    });
  };

  return KeyInput;
});
