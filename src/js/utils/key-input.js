/*global define webkitSpeechRecognition SpeechSynthesisUtterance
         speechSynthesis */

define(['utils/pubsub'], function(pubsub) {

  var KeyInput = function () {
    $(document).keydown(function(e) {
      var keyCode = e.keyCode,
        command;

      if (37 === keyCode) {
        command = 'voice:back'; //left
      } else if (38 === keyCode) {
        command = 'voice:previous'; //up
      } else if (39 === keyCode) {
        command = 'voice:more'; //right
      } else if (40 === keyCode) {
        command = 'voice:next'; //down
      } else if (49 === keyCode) {
        command = 'example:news'; //1
      } else if (50 === keyCode) {
        command = 'example:weather'; //2
      } else if (51 === keyCode) {
        command = 'example:sport:fixtures'; //3
      } else if (52 === keyCode) {
        command = 'example:sport:tables'; //4
      } else if (53 === keyCode) {
        command = 'example:travel'; //5
      } else if (54 === keyCode) {
        command = 'example:notFound'; //6
      } else if (32 === keyCode) {
        command = 'voice:toggleMute'; //space
      } else if (65 === keyCode) {
        $('#autoplay').trigger('click');
      }
      if (command) {
        e.preventDefault();
        if (command != 'voice:toggleMute') {
          pubsub.emitEvent('voice:trigger');
        }
        pubsub.emitEvent(command);
      }
    });
  };

  return KeyInput;
});
