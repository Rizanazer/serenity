import React, { useState } from 'react';
import './loginsignup.css';
import { Link } from "react-router-dom";
import { FaGoogle, FaApple, FaTwitter, FaFacebook } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ actions ,userData }) =>
(

  <div className="box">
    <input placeholder='Email' onChange={actions.handleInputChange} value={userData.mail} name="mail" />
    <input placeholder='Password' onChange={actions.handleInputChange} value={userData.pass} name = "pass"/>
    <div className='viewerror'>
    {userData.viewError && <p className='errortext'>Error in Credentials  </p>}
    </div>
    <button onClick={actions.handleClick}>LOGIN</button>
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
const MobileNumberInput = ({ actions }) =>
(

  <div className="box">
    <input placeholder='MobileNumber' />
    <button onClick={()=>actions.handleActionChange("VALIDATE")}>GetOTP</button>
    <button onClick={()=>actions.handleActionChange("LOGIN")}>BACK</button>
  </div>

);
const OTPInput = ({ actions }) =>
(

  <div className="box">
    <input placeholder='OTP' />
    <button onClick={()=>{window.location="/dashboard"}}>VALIDATE</button>
    <button onClick={()=>actions.handleActionChange("GetOTP")}>BACK</button>
  </div>

);
const Loginsignup = (props) => {
  const [action, setAction] = useState("LOGIN");

  const handleActionChange = (newAction) => {
    setAction(newAction);
  };

  ////////////////////////////////////////////////////////
const navigate = useNavigate()
const [viewError, setViewError] = useState(false);

const [userData, setUserData] = useState({
  mail: '',
  pass: ''
});
const handleInputChange = (event) =>{
  const {name, value} = event.target
  setUserData({...userData,[name]:value})
};

const handleClick = async () => {
  console.log('Button clicked!');
  console.log(userData);
  await axios.post('/login', userData)
    .then(response => {
      
      if(response.data.success ===true){
        console.log('Server response:', response.data);
        handleActionChange('GetOTP')
        console.log(response.data.success); 
        localStorage.setItem('userdata', JSON.stringify(response.data.userdata));
        localStorage.setItem('username', response.data.userdata.username);
        localStorage.setItem('userid', response.data.userdata._id)
        //console.log("heheeee : " + localStorage.getItem('username'));
       //navigate('/dashboard')
      }else{
        console.log('Server response:', response.data);
        setViewError(true)
        setTimeout(() => {
          setViewError(false);
        }, 3000);

      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  console.log(userData)
  
};
const handlereg = ()=>{
  navigate('/registration')
}
///////////////////////////////////////////////////////

return (
  <div className="container bg center" >
    {action === "LOGIN" && <Login actions={{handleActionChange, handleInputChange, handleClick,handlereg,setViewError}} userData={{userData,viewError}} />}
    {action === "GetOTP" && <MobileNumberInput actions={{handleActionChange}} />}
    {action === "VALIDATE" && <OTPInput actions={{handleActionChange}} />}
  </div>
);
};

export default Loginsignup;
