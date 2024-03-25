
import axios from "axios"
async function logout(navigate,userdata) {
    
    try {
      const response = await axios.post('/log-out', { userid: userdata._id })
      if (response) {
        localStorage.clear()
        localStorage.removeItem('validation')
        console.log(`Logging out`);
        navigate('/')
      }

    } catch (error) {
      console.error(error)
    }

  }
  export default logout;