import React, { useState } from 'react';
import './loginsignup.css';
import { Link } from "react-router-dom";
import { FaGoogle, FaApple, FaTwitter, FaFacebook } from "react-icons/fa";

const Login = ({ handleActionChange }) =>
(

  <div className="box">
    <input placeholder='Email' />
    <input placeholder='Password' />
    <button onClick={()=>handleActionChange("GetOTP")}>LOGIN</button>
    <div className="horiz">
      <hr className='line' />or<hr className='line' />
    </div>
    <div className="horiz">
      <FaGoogle className='icon' />
      <FaTwitter className='icon' />
      <FaFacebook className='icon' />
      <FaApple className='icon' />
    </div>
  </div>

);
const MobileNumberInput = ({ handleActionChange }) =>
(

  <div className="box">
    <input placeholder='MobileNumber' />
    <button onClick={()=>handleActionChange("VALIDATE")}>GetOTP</button>
    <button onClick={()=>handleActionChange("LOGIN")}>BACK</button>
  </div>

);
const OTPInput = ({ handleActionChange }) =>
(

  <div className="box">
    <input placeholder='OTP' />
    <button onClick={()=>{window.location="/dashboard"}}>VALIDATE</button>
    <button onClick={()=>handleActionChange("GetOTP")}>BACK</button>
  </div>

);
const Loginsignup = (props) => {
  const [action, setAction] = useState("LOGIN");

  const handleActionChange = (newAction) => {
    setAction(newAction);
  };

  return (
    <div className="container bg center">
      {action === "LOGIN" && <Login handleActionChange={handleActionChange} />}
      {action === "GetOTP" && <MobileNumberInput handleActionChange={handleActionChange} />}
      {action === "VALIDATE" && <OTPInput handleActionChange={handleActionChange} />}
    </div>
  );
};

export default Loginsignup;
