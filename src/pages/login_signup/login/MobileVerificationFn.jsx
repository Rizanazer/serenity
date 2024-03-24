import React, { useEffect, useState } from 'react';
import axios from 'axios';
const MobileNumberInput = ({ actions, phno, setPhno,regMobile }) => {
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [notification, setNotification] = useState(null);
    const [next, setNext] = useState(false);
    const [validate, setValidate] = useState(false);
  
    useEffect(() => {
      if (notification) {
        const timer = setTimeout(() => {
          setNotification(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [notification]);
  
    useEffect(()=>{
      if (Number(phoneNumber) === regMobile)
      {
        sendOTP();
      }else{
        if(phoneNumber!=null){
          setNotification("Phone Number Not Registered with current User..")
        setValidate(false)
        }
        
      }
    },[validate])
    const handleNumberChange = (e) => {
      setPhoneNumber(e.target.value);
      setPhno(e.target.value)
    };
  
    const sendOTP = async () => {
      try {
        setSpinner(true)
        const response = await axios.post('/send-otp', { mobilenumber: phoneNumber });
        setNotification(response.data.message);
        if(response)
        {
          setNext(true);
          setSpinner(false)
        }
        
        
      } catch (error) {
        console.error('Error sending OTP:', error);
        setNotification("error reload the page")
        setSpinner(false)
      }
    };
  const [spinner,setSpinner] = useState(false)
  
    return (
      <div className="box_login box center">
        <input type='tel' placeholder='MobileNumber' maxLength="10" value={phoneNumber} onChange={handleNumberChange} required/>
        {notification && (
          <div className="box nopadding">{notification}</div>
        )}
  
        {next && (setTimeout(() => {
          actions.handleActionChange("VALIDATE");
        }, 3000))}
        {/* <button onClick={()=>{setValidate(true)
          }}>GetOTP</button>{spinner &&<img src="/images/spinner.gif"  style={{height:'30px',width:'30px'}} />} */}
        <button onClick={() => actions.handleActionChange("VALIDATE")}>next</button>
        <button onClick={() => actions.handleActionChange("LOGIN")}>BACK</button>
      </div>
    );
  };
  export default MobileNumberInput;
  