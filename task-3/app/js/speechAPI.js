(function(root){

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'ru-RU';
  recognition.interimResults = false;
  recognition.maxAlternatives = 20;

  root.MAIN.getArrFromJSON(function(){
    SpeechFunc(this);
  })

  function SpeechFunc(citiesArr){
    var speechRecognitionList = new SpeechGrammarList();
    var grammar = '#JSGF V1.0; grammar cities; public <city> = ' + citiesArr.join(' | ') + ' ;';
    speechRecognitionList.addFromString(grammar, 1);

    var recog = document.querySelector('.recog');
    var btnSpeak = document.querySelector('#speak');
    btnSpeak.onclick = function() {
      recognition.start();
      console.log('Ready to receive a color command.');
    }
    recognition.onstart = function(event){
      btnSpeak.disabled = true;
    }

    recognition.onend = function(event){
      btnSpeak.disabled = false;
    }

    recognition.onresult = function(event) {


    var last = event.results.length - 1;
    var speechAlts = event.results[last];
    var speechAltsArray = [];
    for (var i = 0; i < speechAlts.length; i++) {
      speechAltsArray.push([].slice.call(speechAlts)[i].transcript.toUpperCase());
    }
    console.log(speechAltsArray)
    var city = citiesArr.find(function(el, index, arr){
      if (speechAltsArray.indexOf(el.toUpperCase()) != -1) {
        return el;
      }
    })
    if(city === undefined){
      alert('Город не распознан')
      return 0;
    }
    return root.MAIN.play (citiesArr, city)

    console.log('Confidence: ' + event.results[0][0].confidence);
  }
  
  recognition.onspeechend = function() {
    recognition.stop();
  }
  
  recognition.onnomatch = function(event) {
    alert('Голос не распознан')
  }
  
  recognition.onerror = function(event) {
    recog.textContent = 'Ошибка: ' + event.error;
  }

}
})(this);
