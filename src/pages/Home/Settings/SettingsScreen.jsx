import "./SettingsScreen.css"
import { MdArrowBack,MdArrowForwardIos, MdArrowBackIos ,MdReport, MdGroups, MdBlockFlipped, MdLocationPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function SettingsScreen({ handleClick,setscreen,profileView,accounts,accountcheck,closeother }) {

  const navigate = useNavigate()

  function logout() {
    localStorage.clear()
    console.log(`Logging out`);
    navigate('/')
  }
  return (

    <>
      <div className="box settings">
        <div className="settings_back">
          <MdArrowBack className="icon nobordershadow white" onClick={() => { handleClick() }} />
          <div className=" box profile_box nobordershadow settings_back ">
            <div className="flex flexrow stretch settings_content" onClick={setscreen}>
              <div className="flex img_profile_name flexrow gap10 center pointer">
                <img src="images/profilepic.jpg" alt="image" className="icon profile_chat_img"/>
                <span className="bold white">username</span>
              </div>
              {profileView?<MdArrowBackIos className="icon nobordershadow white"/>:<MdArrowForwardIos className="icon nobordershadow white"/>}
              
              
            </div>
          </div>
        </div>
        <div className="box nobordershadow settings_content">
          <div className={accountcheck?" box joinbtn selectedBtn":" box joinbtn"} onClick={accounts}>
            Accounts
          </div>
          <div className=" box joinbtn" onClick={()=>{logout();closeother()}}>
            LogOut
          </div>
        </div>

      </div>
    </>
  );
}
export default SettingsScreen;  