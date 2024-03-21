
const handleListen = (setListening,seterror,setText) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser');
      setListening(true);
      seterror("'Speech recognition not supported in this browser'")
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {

    };

    recognition.onresult = event => {
      const question = event.results[0][0].transcript;
      setText(question);

    };

    recognition.onerror = event => {
      console.error('Speech recognition error detected: ', event.error);
      setListening(true);
      seterror(event.error);
    };

    recognition.start();
  };
export default handleListen;