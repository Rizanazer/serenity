import { FaGoogle, FaApple, FaTwitter, FaFacebook } from "react-icons/fa";
const CreateAccount = ({ actions }) =>
(

  <div className="box_login box center">
    <input type="file" accept="image/*" name="profilePicture" onChange={actions.handleImageChange} required/>
    <input placeholder='Username' name="username" onChange={actions.handeleregchange} required/>
    <input placeholder='Email' name="email" onChange={actions.handeleregchange} required/>
    <input placeholder='Password' name="password" onChange={actions.handeleregchange} required/>
    <input placeholder='Re-Password' name="re_pass" onChange={actions.handeleregchange} required/>
    <input placeholder='MobileNumber' name="phone" onChange={actions.handeleregphchange} maxLength={10} required/>
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
export default CreateAccount;