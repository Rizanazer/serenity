import "./SettingsScreen.css"
import { useNavigate } from "react-router-dom";
function SettingsScreen() {

  const navigate = useNavigate()

  function logout(){
      localStorage.clear()
      console.log(`Logging out`);
      navigate('/')
  }
  return (
    
    <>

      <div className="section1">
        
        <div className="box settings">
        <div className=" box joinbtn" onClick={logout}>
          LOGOUT
        </div>
        </div>
      </div>
      <div className="section2"></div>
    </>
  );
}
export default SettingsScreen;  