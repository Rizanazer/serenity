import axios from "axios";

const handleTranslate = (messageTtext,language,setmessageTtext,seterror,setListening,settrnslnGIF,trnslnGIF) => {
    settrnslnGIF(true)
    axios.post('/convert', {
      input_text: messageTtext,
      to_lang: language
    })
    
      .then(response => {
        settrnslnGIF(false)
        setmessageTtext(response.data.translated_text);
      })
      .catch(error => {
        console.error('Error:', error);
        seterror('Error occurred while translating', error)
        setListening(true)

      });

  }
  export default handleTranslate