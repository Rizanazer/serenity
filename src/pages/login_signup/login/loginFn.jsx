import ErrorMessage from "pages/Home/Functions/errormessage";
import { useEffect } from "react";
import { FaGoogle, FaApple, FaTwitter, FaFacebook } from "react-icons/fa";
const Login = ({ actions, userData,error, seterror, listening, setListening, spinner}) =>{
return(
  <div className="box_login box center">
     <ErrorMessage error={error} listening={listening} setListening={setListening} seterror={seterror} />
     
    <input type="email" placeholder='Email' onChange={actions.handleInputChange} value={userData.mail} name="mail" required/>
    <input type="password" placeholder='Password' onChange={actions.handleInputChange} value={userData.pass} name="pass" required/>
    <button onClick={actions.handleClick}>{spinner ?<img className="center" src="/images/spinnerButton.gif"  style={{height:'30px',width:'30px',position:"relative"}} />: <span>LOGIN</span>}</button>
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

);}
export default Login;