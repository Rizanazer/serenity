import { FaGoogle, FaApple, FaTwitter, FaFacebook } from "react-icons/fa";
const Login = ({ actions, userData,error, seterror, listening, setListening,userScore }) =>
(

  <div className="box_login box center">
    <input placeholder='Email' onChange={actions.handleInputChange} value={userData.mail} name="mail" required/>
    <input placeholder='Password' onChange={actions.handleInputChange} value={userData.pass} name="pass" required/>
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
export default Login;