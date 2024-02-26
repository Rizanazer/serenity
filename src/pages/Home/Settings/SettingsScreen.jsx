import "./SettingsScreen.css"
import { MdArrowBack,MdReport, MdGroups, MdBlockFlipped, MdLocationPin } from "react-icons/md";

import { useNavigate } from "react-router-dom";
function SettingsScreen({handleClick}) {

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
          <MdArrowBack className="icon nobordershadow" onClick={() => { handleClick() }} />
        </div>
        <div className="box nobordershadow settings_content">
        <div className=" box joinbtn" onClick={logout}>
          LOGOUT
        </div>
        </div>
        
      </div>
    </>
  );
}
export default SettingsScreen;  