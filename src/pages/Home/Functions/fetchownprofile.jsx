import axios from "axios";
async function fetchProfileUpdate(setLanguage,seterror,setListening) {
    const u_id = localStorage.getItem('userid')
    try {
      const response = await axios.post("/fetchProfile", { u_id: u_id, })


      setLanguage(response.data.language)
    } catch (error) {
      seterror('error fetching Status')
      setListening(true)
    }
  }
  export default fetchProfileUpdate;