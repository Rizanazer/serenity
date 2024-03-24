import React, { useState } from 'react';
import axios from 'axios';
const OTPInput = ({ actions, phno, setPhno ,onclickvalidate}) => {
    const [otp, setOTP] = useState('');
    const [notification, setNotification] = useState(null);
    const handleOTPChange = (e) => {
      setOTP(e.target.value);
    };
  
    const verifyOTP = async () => {
      try {
        const response = await axios.post('/verify-otp', { mobilenumber: phno, otpCode: otp });
        if (response) {
          localStorage.setItem('validation',"true")
          window.location = "/dashboard";
        }
  
      } catch (error) {
        console.error('Error verifying OTP:', error);
        setNotification(error)
  
      }
    };
  
    return (
      <div className="box_login box center">
        <div className="center inputrow flexrow">
          <input className='input' type='text' maxLength="6" onChange={handleOTPChange} required/>
          {/* <input className='input_otp' type='text' maxLength="1" onChange={handleOTPChange}/>
          <input className='input_otp' type='text' maxLength="1" onChange={handleOTPChange}/> */}
        </div>
        {notification && (
          <div className="box nopadding">{notification}</div>
        )}
        {/* <button onClick={verifyOTP}>VALIDATE</button> */}
  
        {/* <button onClick={() => window.location = "/dashboard"}>VALIDATE</button> */}
        <button onClick={onclickvalidate}>VALIDATE </button>
        <button onClick={() => actions.handleActionChange("GetOTP")}>ddBACK</button>
      </div>
    );
  };
  export default OTPInput;