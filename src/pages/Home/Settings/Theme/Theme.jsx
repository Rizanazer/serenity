// import { useState } from "react/cjs/react.production.min";
import { useState } from "react";
import "./Theme.css";
import { MdEdit,MdEditOff  } from "react-icons/md";
function Theme_Settings({}) {
    
//    function ToggleGenderEdit(){
//         setGender(prev=>!prev);
//         setDOB(false);
//         setPassword(false);
//     }
//    function ToggleDOBEdit(){
//         setDOB(prev=>!prev);
//         setGender(false);
//         setPassword(false);
//     }
//    function TogglePasswordEdit(){
//         setPassword(prev=>!prev);
//         setDOB(false);
//         setGender(false);
//     }

    return (
        <>
            <div className="h_w_full flex flexrow  zindex2 profile_whole">
                <div className="triangle theme_triangle_position flex"></div>
                <div className="box profilesection flex flexrow center">

                    <div className="section1 profilesection2 flex flexcolumn gap20">
                        <span className="box padding20 delete_self center nobordershadow">Theme Setting</span>
                        {/* <span className="box padding20 delete_self center nobordershadow" onClick={() => { }}>Update Account</span> */}


                    </div>

                    <div className="section2 profilesection1 flex flexcolumn">
                        
                    </div>
                </div>
            </div>

        </>
    );
}
export default Theme_Settings;