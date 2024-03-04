import React, { useEffect, useState } from 'react';
import './loginsignup.css';
import { Link } from "react-router-dom";
import { FaGoogle, FaApple, FaTwitter, FaFacebook } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NumberCheck = (event) => {
  const inputValue = event.target.value;
  const numbersOnly = inputValue.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
  event.target.value = numbersOnly; // Update the input value to contain only numbers
}; 

const Login = ({ actions ,userData }) =>
(

  <div className="box_login box center">
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
    <div className="create_account">
      <span>dont have an account?</span>
      <span className='text_btn' onClick={()=>{actions.handleActionChange("Create_Account")}}>Create Now!!!</span>
    </div>
  </div>

);
const CreateAccount = ({ actions  }) =>
(

  <div className="box_login box center">
    <input type="file" accept="image/*" name="profilePicture"onChange={actions.handleImageChange} />
    <input placeholder='Username' name="username" onChange={actions.handeleregchange} />
    <input placeholder='Email' name="email" onChange={actions.handeleregchange} />
    <input placeholder='Password' name="password" onChange={actions.handeleregchange} />
    <input placeholder='Re-Password' name="re_pass" onChange={actions.handeleregchange} />
    <input placeholder='MobileNumber' name="phone"onChange={actions.handeleregchange}/>
    <div className='viewerror'>
    {/* {userData.viewError && <p className='errortext'>Error in Credentials  </p>} */}
    </div>
    <button onClick={()=>{actions.handleActionChange("More_Details")}}>Enter More</button>
    <div className="horiz">
      <hr className='line' />or<hr className='line' />
    </div>
    <div className="horiz">
      <FaGoogle className='icon' />
      <FaTwitter className='icon' />
      <FaFacebook className='icon' />
      <FaApple className='icon' />
    </div>
    <div className="create_account">
      <span>have an account?</span>
      <span className='text_btn' onClick={()=>{actions.handleActionChange("LOGIN")}}>Login Now!!!</span>
    </div>
  </div>

);
const CreateAccount_details = ({ actions  }) =>
(

  <div className="box_login box center">
    <input type='date' placeholder='dateofbirth' name="dob" onChange={actions.handeleregchange} />
    <input placeholder='gender' name="gender" onChange={actions.handeleregchange} />
    <input placeholder='likes' name="likes" onChange={actions.handeleregchange} />
    <input placeholder='hobbies' name="hobbies" onChange={actions.handeleregchange}/>
    <input placeholder='dislikes' name="dislikes" onChange={actions.handeleregchange}/>
    <div className='viewerror'>
    {/* {userData.viewError && <p className='errortext'>Error in Credentials  </p>} */}
    </div>
    <button onClick={actions.register}>Create Account</button>
    {/* <div className="horiz">
      <hr className='line' />or<hr className='line' />
    </div>
    <div className="horiz">
      <FaGoogle className='icon' />
      <FaTwitter className='icon' />
      <FaFacebook className='icon' />
      <FaApple className='icon' />
    </div> */}
    {/* <div className="create_account">
      <span>have an account?</span>
      <span className='text_btn' onClick={()=>{actions.handleActionChange("LOGIN")}}>Login Now!!!</span>
    </div> */}
  </div>

);
const MobileNumberInput = ({ actions }) =>
(

  <div className="box_login box center">
    <input type='tel' placeholder='MobileNumber' maxLength="10" onChange={NumberCheck}/>
    <button onClick={()=>actions.handleActionChange("VALIDATE")}>GetOTP</button>
    <button onClick={()=>actions.handleActionChange("LOGIN")}>BACK</button>
  </div>

);
const OTPInput = ({ actions }) =>
(

  <div className="box_login box center">
    <div className="center inputrow flexrow">
    <input className='input_otp ' type='text' maxLength="1" onChange={NumberCheck}/>
    <input className='input_otp' type='text' maxLength="1" onChange={NumberCheck}/>
    <input className='input_otp' type='text' maxLength="1" onChange={NumberCheck}/>
    <input className='input_otp' type='text' maxLength="1" onChange={NumberCheck}/>
    </div>
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
  const [regData, setRegData] = useState({
      username: '',
      password:'',
      age: '',
      email:'',
      phone:'',
      gender:'',
      likes:'',
      dislikes:'',
      hobbies:'',
      profilePicture:null
      });
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        setRegData({ ...regData, profilePicture: file });
      };
      
      const handeleregchange = (event) =>{
        const {name, value} = event.target
        setRegData({...regData,[name]:value})
        console.log(regData);
      };

      async function register() {
        try {
          const formData = new FormData();
          for (const key in regData) {
            formData.append(key, regData[key]);
            console.log(`${key}:`, formData.get(key));
          }
          console.log(formData);
          const response = await axios.post('/register', formData);
          if (response.data.success === true) {
            handleActionChange("VALIDATE");
            localStorage.setItem('userdata', JSON.stringify(response.data.result));
            localStorage.setItem('username', response.data.result.username);
            localStorage.setItem('userid', response.data.result._id);
          }
        } catch (error) {
          console.error(error);
        }
      }
      
        
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
    {action === "More_Details"&&<CreateAccount_details actions={{handleActionChange,register,handeleregchange}} />}
    {action === "Create_Account"&&<CreateAccount actions={{handleActionChange,handeleregchange,handleImageChange}} />}
  </div>
);
};

export default Loginsignup;