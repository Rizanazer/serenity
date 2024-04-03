import React, { useState } from 'react';
import axios from 'axios';
import ErrorMessage from 'pages/Home/Functions/errormessage';
import { MdOutlineClose, MdOutlineDone } from "react-icons/md";
const OTPInput = ({ actions, phno, error, seterror, listening, setListening, onclickvalidate }) => {
  const [otp, setOTP] = useState('');
  const [spinner, setSpinner] = useState(false)
  const [checked, setChecked] = useState(false);
  const [Notchecked, setNotChecked] = useState(false);
  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post('/verify-otp', { mobilenumber: phno, otpCode: otp });
      if (response) {
        localStorage.setItem('validation', "true")
        setSpinner(true)
        setTimeout(() => {
          setSpinner(false)
          setChecked(true)
          setTimeout(() => {
            // window.location = "/dashboard";
            onclickvalidate()
            setChecked(false)
          }, 1000);

        }, 2000);

      } else {
        setSpinner(false)
        setListening(true)
        setNotChecked(true)
        seterror('Incorrect OTP, please try Re-entering the OTP');
        setTimeout(() => {
          setListening(false)
          setNotChecked(false)
        }, 2000);
      }

    } catch (error) {
      setListening(true)
      seterror(error)
      setNotChecked(true)
      setTimeout(() => {
        setNotChecked(false)
        setListening(false)
      }, 2000);
    }
  };

  return (
    <div className="box_login box center">
      <ErrorMessage error={error} listening={listening} setListening={setListening} seterror={seterror} />
      <div className="center inputrow flexrow">
        <input className='input' type='text' maxLength="6" onChange={handleOTPChange} required />
        {checked && <MdOutlineDone className='icon_search' color='#a0de59' />}
        {Notchecked && <MdOutlineClose className='icon_search' color='#d22020' />}
        {/* <input className='input_otp' type='text' maxLength="1" onChange={handleOTPChange}/>
          <input className='input_otp' type='text' maxLength="1" onChange={handleOTPChange}/> */}
      </div>
     
      <button onClick={verifyOTP}>{spinner ? <img className="center" src="/images/spinnerButton.gif" style={{ height: '30px', width: '30px', position: "relative" }} /> : <span>VALIDATE-L</span>}</button>

      
      {/* <button onClick={onclickvalidate}>VALIDATE-L</button> */}
      <button onClick={() => actions.handleActionChange("GetOTP")}>BACK</button>
    </div>
  );
};
export default OTPInput;