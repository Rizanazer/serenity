import { useState } from "react/cjs/react.production.min";
import "./Notification.css";
import { MdEdit,MdEditOff  } from "react-icons/md";
function Notification_Settings({}) {
    return (
        <>
            <div className="h_w_full flex flexrow  zindex2 profile_whole">
                <div className="triangle notification_triangle_position flex"></div>
                <div className="box profilesection flex flexrow center">

                    <div className="section1 profilesection2 flex flexcolumn gap20">
                        <span className="box padding20 delete_self center nobordershadow">Notification</span>
                        


                    </div>

                    <div className="section2 profilesection1 flex flexcolumn">
                       
                        
                    </div>
                </div>
            </div>

        </>
    );
}
export default Notification_Settings;