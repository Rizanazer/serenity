import React, { useEffect, useState } from 'react';
import './loginsignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from './login/loginFn';
import CreateAccount from './Register/createAccountFn';
import CreateAccount_details from './Register/moreDetails';
import MobileNumberInput from './login/MobileVerificationFn';
import OTPInput from './login/otpVerification';
import OTPInputRegister from './Register/otpVerificationRegister';
// const NumberCheck = (event) => {
//   const inputValue = event.target.value;
//   const numbersOnly = inputValue.replace(/[^0-9]/g, '');
//   event.target.value = numbersOnly; 
// };
const Loginsignup = ({setValidation}) => {
  const [spinner,setSpinner] = useState(false)
  const [action, setAction] = useState("LOGIN");
  const [Mobile, setMobile] = useState(null);  
  const [error, seterror] = useState("");
  const [listening, setListening] = useState(false);
  const navigate = useNavigate()
  const [viewError, setViewError] = useState(false);
  const [phno, setPhno] = useState(null);
  const [userID, setuserID] = useState(null);
  const [userData, setUserData] = useState({
    mail: '',
    pass: ''
  });
  const handleActionChange = (newAction) => {
    setAction(newAction);
  };
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
    setRegData({ ...regData, profilePicture: file });
  };

  const handeleregchange = (event) => {
    const { name, value } = event.target
    setRegData({ ...regData, [name]: value })
  };
  const handeleregphchange = (event) => {
    const inputValue = event.target.value;
    const numbersOnly = inputValue.replace(/[^0-9]/g, '');
    event.target.value = numbersOnly; 
    const { name, value } = event.target
    setPhno(value)
    setRegData({ ...regData, [name]: value })

  };

      async function register() {
        try {
          const formData = new FormData();
          for (const key in regData) {
            formData.append(key, regData[key]);
          }
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
      
      const updateSerenityScore = async (userId, newScore) => {
        try {
            const response = await fetch('/update-serenity-score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, newScore })
            });
            if (!response.ok) {
                throw new Error('Failed to update serenity score');
            }
            const data = await response.json();
            console.log(data.message); // Log success message
        } catch (error) {
            console.error('Error updating serenity score:', error.message);
        }
    };    

const handleClick = async () => {

  await axios.post('/login', userData)
    .then(response => {
      if(response.data.success ===true){
        const phone=response.data.userdata.phone; 
        setMobile(phone)
        setuserID(response.data.userdata._id)
        const SerenityScore=response.data.userdata.serenityscore
        localStorage.setItem('userdata', JSON.stringify(response.data.userdata));
        localStorage.setItem('username', response.data.userdata.username);
        localStorage.setItem('userid', response.data.userdata._id)
        setSpinner(true)
        setTimeout(() => {
          if(SerenityScore&&SerenityScore<=50){
            seterror("Cannot Enter Due to Misconduct of the User")
            setListening(true)
            setSpinner(false)
          }
          else{
            handleActionChange('GetOTP')
            setListening(false)
            setSpinner(false)
          }
        }, 3000);
        
      }else{
        // setViewError(true)
        setSpinner(true)
        setTimeout(() => {
          setListening(true)
          seterror("The email address or password you entered isn't connected to an account.")
          setSpinner(false)
          setTimeout(() => {
           
            setListening(false)
          }, 1000);
          
        }, 3000);

        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const handlereg = () => {
    navigate('/registration')
  }
  function onclickvalidate(){
    const userScore1=100;
    updateSerenityScore(userID, userScore1);
    navigate('/dashboard')
    localStorage.setItem('validation',"true")

  }
  return (

    <div className="container bg center" >
      {action === "LOGIN" && <Login actions={{ handleActionChange, handleInputChange, handleClick, handlereg, setViewError }} userData={{ userData, viewError }} 
      error={error} listening={listening} setListening={setListening} seterror={seterror} spinner={spinner}/>}
      {action === "GetOTP" && <MobileNumberInput actions={{ handleActionChange }} phno={phno} setPhno={setPhno} regMobile={Mobile} 
      error={error} listening={listening} setListening={setListening} seterror={seterror} />}
      {action === "VALIDATE" && <OTPInput onclickvalidate={onclickvalidate} actions={{ handleActionChange }} phno={phno} setPhno={setPhno} 
      error={error} listening={listening} setListening={setListening} seterror={seterror} />}
      {action === "More_Details" && <CreateAccount_details actions={{ handleActionChange, register, handeleregchange }} phno={phno}/>}
      {action === "Create_Account" && <CreateAccount actions={{ handleActionChange, handeleregchange, handleImageChange, handeleregphchange }} />}
      {action === "VALIDATE_Register" && <OTPInputRegister onclickvalidate={onclickvalidate}actions={{ handleActionChange }} phno={phno} setPhno={setPhno}
      error={error} listening={listening} setListening={setListening} seterror={seterror} />}
    </div>
  );
};

export default Loginsignup;