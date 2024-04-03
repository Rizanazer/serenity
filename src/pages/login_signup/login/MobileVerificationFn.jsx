import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorMessage from 'pages/Home/Functions/errormessage';
import { MdOutlineClose, MdOutlineDone } from "react-icons/md";

const MobileNumberInput = ({ actions, phno, setPhno, regMobile, error, seterror, listening, setListening, }) => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [validate, setValidate] = useState(false);
  const [spinner, setSpinner] = useState(false)
  const [checked, setChecked] = useState(false);
  const [Notchecked, setNotChecked] = useState(false);

  useEffect(() => {
    if (listening) {
      const timer = setTimeout(() => {
        setListening(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [listening]);

  useEffect(() => {
    if (Number(phoneNumber) === regMobile) {
      setSpinner(true)
      setTimeout(() => { sendOTP(); setValidate(false) }
        , 2000)
    } else {
      if (phoneNumber != null) {
        setSpinner(true)
        setTimeout(() => {
          setSpinner(false)
          setListening(true)
          seterror("Phone Number Not Registered with current User..")
          setValidate(false)
        }
          , 2000)

      }

    }
  }, [validate])
  const handleNumberChange = (e) => {
    const inputValue = e.target.value;
    const numbersOnly = inputValue.replace(/[^0-9]/g, '');
    e.target.value = numbersOnly;
    setPhoneNumber(e.target.value);
    setPhno(e.target.value)
  };

  const sendOTP = async () => {
    try {
      const response = await axios.post('/send-otp', { mobilenumber: phoneNumber });
      const message = response.data.message;
      if (response) {

        if (message === 'OTP sent successfully') {
          setChecked(true)
          setSpinner(false)
          setTimeout(() => {
            actions.handleActionChange("VALIDATE")
            setChecked(false)
            setSpinner(false)
          }, 2000);

        }
        else {
          setNotChecked(true)
          setListening(true)
          seterror("incorrect Number...please ReEnter..")
          setTimeout(() => {
            actions.handleActionChange("GetOTP")
            setNotChecked(false)
            setSpinner(false)
          }, 2000);
        }
      }


    } catch (error) {
      setSpinner(true)
      console.error('Error sending OTP:', error);
      setNotChecked(true)
      setListening(true)
      seterror("incorrect Number...please ReEnter..")
      setTimeout(() => {
        actions.handleActionChange("GetOTP")
        setNotChecked(false)
        setSpinner(false)
      }, 2000);
    }
  };

  return (
    <div className="box_login box center">
      <ErrorMessage error={error} listening={listening} setListening={setListening} seterror={seterror} />
      <div className="flex flexrow">
        <input type='tel' placeholder='MobileNumber' maxLength="10" value={phoneNumber} onChange={handleNumberChange} required />
        {checked && <MdOutlineDone className='icon_search' color='#a0de59' />}
        {Notchecked && <MdOutlineClose className='icon_search' color='#d22020' />}
      </div>

      <button onClick={() => { setValidate(true) }}>

        {spinner ? <img className="center" src="/images/spinnerButton.gif"
          style={{ height: '30px', width: '30px', position: "relative" }} /> : <span>SEND-OTP</span>}</button>



      {/* <button onClick={() => actions.handleActionChange("VALIDATE")}>next</button> */}
      <button onClick={() => actions.handleActionChange("LOGIN")}>BACK</button>
    </div>
  );
};
export default MobileNumberInput;
