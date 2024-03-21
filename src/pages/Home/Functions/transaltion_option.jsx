import axios from "axios";

const handleTranslate = (messageTtext,language,setmessageTtext,seterror,setListening) => {
    // console.log("lan", messageTtext);
    axios.post('/convert', {
      input_text: messageTtext,
      to_lang: language

    })
      .then(response => {
        setmessageTtext(response.data.translated_text);
      })
      .catch(error => {
        console.error('Error:', error);
        seterror('Error occurred while translating', error)
        setListening(true)

      });

  }
  export default handleTranslate