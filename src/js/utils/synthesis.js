define(['utils/pubsub'], function(pubsub) {

  function speak(text) {
    console.log('synthesis.speak', text);
    var msg = new SpeechSynthesisUtterance();
    var voices = speechSynthesis.getVoices();
    //console.log(voices);
    voices.forEach(function(voice, index){
      console.log(index, voice.lang, voice.name);
    });
    //msg.voice = voices[11];
    msg.lang = 'en-GB';
    msg.text = text;
    /*
    msg.voiceURI = 'native';
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1;
    msg.lang = 'en-GB';
    */
    
    speechSynthesis.speak(msg);
  }

  pubsub.addListener('synthesis:speak', speak);

  return {
    speak: speak
  };

});


