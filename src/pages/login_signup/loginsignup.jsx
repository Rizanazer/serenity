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
const Login = ({ actions, userData }) =>
(

  <div className="box_login box center">
    <input placeholder='Email' onChange={actions.handleInputChange} value={userData.mail} name="mail" />
    <input placeholder='Password' onChange={actions.handleInputChange} value={userData.pass} name="pass" />
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
      <span className='text_btn' onClick={() => { actions.handleActionChange("Create_Account") }}>Create Now!!!</span>
    </div>
  </div>

);
const CreateAccount = ({ actions }) =>
(

  <div className="box_login box center">
    <input type="file" accept="image/*" name="profilePicture" onChange={actions.handleImageChange} />
    <input placeholder='Username' name="username" onChange={actions.handeleregchange} />
    <input placeholder='Email' name="email" onChange={actions.handeleregchange} />
    <input placeholder='Password' name="password" onChange={actions.handeleregchange} />
    <input placeholder='Re-Password' name="re_pass" onChange={actions.handeleregchange} />
    <input placeholder='MobileNumber' name="phone" onChange={actions.handeleregphchange} />
    <div className='viewerror'>
      {/* {userData.viewError && <p className='errortext'>Error in Credentials  </p>} */}
    </div>
    <button onClick={() => { actions.handleActionChange("More_Details"); }}>Enter More</button>
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
      <span className='text_btn' onClick={() => { actions.handleActionChange("LOGIN") }}>Login Now!!!</span>
    </div>
  </div>

);
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
      <input placeholder='likes' name="likes" onChange={actions.handeleregchange} />
      <input placeholder='hobbies' name="hobbies" onChange={actions.handeleregchange} />
      <input placeholder='dislikes' name="dislikes" onChange={actions.handeleregchange} />
      <div className='viewerror'>
        {/* {userData.viewError && <p className='errortext'>Error in Credentials  </p>} */}
      </div>
      <button onClick={() => { actions.register(); sendOTP() }}>Create Account</button>
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
}

const MobileNumberInput = ({ actions, phno, setPhno,regMobile }) => {
  // const userdata = JSON.parse(localStorage.getItem('userdata'))
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
  // console.log(phoneNumber);
  // console.log(regMobile);
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
      <input type='tel' placeholder='MobileNumber' maxLength="10" value={phoneNumber} onChange={handleNumberChange} />
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
        localStorage.setItem('validation',true)
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
        <input className='input' type='text' maxLength="6" onChange={handleOTPChange} />
        {/* <input className='input_otp' type='text' maxLength="1" onChange={handleOTPChange}/>
        <input className='input_otp' type='text' maxLength="1" onChange={handleOTPChange}/> */}
      </div>
      {notification && (
        <div className="box nopadding">{notification}</div>
      )}
      {/* <button onClick={verifyOTP}>VALIDATE</button> */}

      {/* <button onClick={() => window.location = "/dashboard"}>VALIDATE</button> */}
      <button onClick={onclickvalidate}>VALIDATE</button>
      <button onClick={() => actions.handleActionChange("GetOTP")}>ddBACK</button>
    </div>
  );
};

const OTPInputRegister = ({ actions, phno, setPhno,navigate }) => {
  const [otp, setOTP] = useState('');
  const [notification, setNotification] = useState(null);
  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post('/verify-otp', { mobilenumber: phno, otpCode: otp });
      if (response) {
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
        <input className='input' type='text' maxLength="6" onChange={handleOTPChange} />

      </div>
      {notification && (
        <div className="box nopadding">{notification}</div>
      )}
      {/* <button onClick={verifyOTP}>VALIDATE</button> */}

      <button onClick={() =>window.location = "/dashboard" }>VALIDATE</button>
      <button onClick={() => actions.handleActionChange("Create_Account")}>BACK</button>
    </div>
  );
};

const Loginsignup = ({setValidation}) => {
  const [action, setAction] = useState("LOGIN");
  const [Mobile, setMobile] = useState(null);  
  const handleActionChange = (newAction) => {
    setAction(newAction);
  };

  ////////////////////////////////////////////////////////
  const navigate = useNavigate()
  const [viewError, setViewError] = useState(false);
  const [phno, setPhno] = useState(null);
  const [userData, setUserData] = useState({
    mail: '',
    pass: ''
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUserData({ ...userData, [name]: value })
  };
  const [regData, setRegData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    gender: '',
    likes: '',
    dislikes: '',
    hobbies: '',
    profilePicture: null
  });
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // console.log(file)

    setRegData({ ...regData, profilePicture: file });
    // console.log("regData---------------------------------")
    // console.log(regData)
  };

  const handeleregchange = (event) => {
    const { name, value } = event.target
    setRegData({ ...regData, [name]: value })
    // console.log(regData);
  };
  const handeleregphchange = (event) => {
    const { name, value } = event.target
    setPhno(value)
    setRegData({ ...regData, [name]: value })

  };

      async function register() {
        try {
          const formData = new FormData();
          for (const key in regData) {
            formData.append(key, regData[key]);
            // console.log(`${key}:`, formData.get(key));
          }
          // console.log(formData);
          const response = await axios.post('/register', formData);
          if (response.data.success === true) {
            handleActionChange("VALIDATE_Register");
            localStorage.setItem('userdata', JSON.stringify(response.data.result));
            localStorage.setItem('username', response.data.result.username);
            localStorage.setItem('userid', response.data.result._id);
          }
        } catch (error) {
          console.error(error);
        }
      }
      
      
const handleClick = async () => {
 
  // console.log('Button clicked!');
  // console.log(userData);
  await axios.post('/login', userData)
    .then(response => {
      
      if(response.data.success ===true){
        // console.log('Server response:', response.data);
        handleActionChange('GetOTP')
        const phone=response.data.userdata.phone; 
        setMobile(phone)
        localStorage.setItem('userdata', JSON.stringify(response.data.userdata));
        localStorage.setItem('username', response.data.userdata.username);
        localStorage.setItem('userid', response.data.userdata._id)
        //console.log("heheeee : " + localStorage.getItem('username'));
       //navigate('/dashboard')
      }else{
        // console.log('Server response:', response.data);
        setViewError(true)
        setTimeout(() => {
          setViewError(false);
        }, 3000);

        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    // console.log(userData)

  };
  const handlereg = () => {
    navigate('/registration')
  }
  ///////////////////////////////////////////////////////
  function onclickvalidate(){
    navigate('/dashboard')
    localStorage.setItem('validation',"true")

  }
  return (

    <div className="container bg center" >
      {action === "LOGIN" && <Login actions={{ handleActionChange, handleInputChange, handleClick, handlereg, setViewError }} userData={{ userData, viewError }} />}
      {action === "GetOTP" && <MobileNumberInput actions={{ handleActionChange }} phno={phno} setPhno={setPhno} regMobile={Mobile} />}
      {action === "VALIDATE" && <OTPInput onclickvalidate={onclickvalidate} actions={{ handleActionChange }} phno={phno} setPhno={setPhno} />}
      {action === "More_Details" && <CreateAccount_details actions={{ handleActionChange, register, handeleregchange }} phno={phno}/>}
      {action === "Create_Account" && <CreateAccount actions={{ handleActionChange, handeleregchange, handleImageChange, handeleregphchange }} />}
      {action === "VALIDATE_Register" && <OTPInputRegister navigate={navigate}actions={{ handleActionChange }} phno={phno} setPhno={setPhno} />}
    </div>
  );
};

export default Loginsignup;