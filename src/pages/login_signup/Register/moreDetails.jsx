import React, { useEffect, useState } from 'react';
import axios from 'axios';
const CreateAccount_details = ({ actions,phno }) => {
    const [notification, setNotification] = useState(null);
    const [next, setNext] = useState(false);
    useEffect(() => {
      if (notification) {
        const timer = setTimeout(() => {
          setNotification(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [notification]);
    const sendOTP = async () => {
      try {
        const response = await axios.post('/send-otp', { mobilenumber: phno });
        setNotification(response.data.message);
        setNext(true);
      } catch (error) {
        console.error('Error sending OTP:', error);
        setNotification("error")
      }
    };
    return (
      <div className="box_login box center">
        <input type='date' placeholder='dateofbirth' name="dob" onChange={actions.handeleregchange} />
        <input placeholder='gender' name="gender" onChange={actions.handeleregchange} />
        <input placeholder='likes' name="likes" onChange={actions.handeleregchange} required/>
        <input placeholder='hobbies' name="hobbies" onChange={actions.handeleregchange} required/>
        <input placeholder='dislikes' name="dislikes" onChange={actions.handeleregchange} required/>
        <div className='viewerror'>
          {/* {userData.viewError && <p className='errortext'>Error in Credentials  </p>} */}
        </div>
        <button onClick={() => { actions.register(); sendOTP() }}>Create Account</button>
      </div>
    );
  }
  export default CreateAccount_details;