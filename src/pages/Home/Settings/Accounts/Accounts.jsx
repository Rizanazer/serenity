import { useState } from "react/cjs/react.production.min";
import "./Accounts.css";
import { MdEdit,MdEditOff  } from "react-icons/md";
function AccountSettings({Gender,DOB,Password,setGender,setDOB,setPassword}) {
    const userdata = JSON.parse(localStorage.getItem('userdata'))
   function ToggleGenderEdit(){
        setGender(prev=>!prev);
        setDOB(false);
        setPassword(false);
    }
   function ToggleDOBEdit(){
        setDOB(prev=>!prev);
        setGender(false);
        setPassword(false);
    }
   function TogglePasswordEdit(){
        setPassword(prev=>!prev);
        setDOB(false);
        setGender(false);
    }

    return (
        <>
            <div className="h_w_full flex flexrow  zindex2 profile_whole">
                <div className="triangle account_triangle_position flex"></div>
                <div className="box profilesection flex flexrow center">

                    <div className="section1 profilesection2 flex flexcolumn gap20">
                        <span className="box padding20 delete_self center nobordershadow">Delete Account</span>
                        <span className="box padding20 delete_self center nobordershadow" onClick={() => { }}>Update Account</span>


                    </div>

                    <div className="section2 profilesection1 flex flexcolumn">
                        <div className=" box joinbtn center padding20 redHover" onClick={() => { }}>Delete Account</div>
                        <div className="box basicprofileinfo flex flexcolumn gap10">
                          <div className="flex flexrow gap10 center">
                                <span className="light">Email :</span>
                                <span className="bold">{userdata.email}</span>
                                {/* <MdEdit className="violetHover"/> */}
                            </div>
                            <div className="flex flexrow gap10 center">
                                <span className="light">Mobile No :</span>
                                <span className="bold">{userdata.phone}</span>
                                {/* <MdEdit className="violetHover"/> */}
                            </div>
                            <div className="flex flexrow gap10 center">
                                <span className="light">Password :</span>
                                {Password?
                                <>
                                <input type="text" className="bold edit_account_elmt padding10"/>
                                <MdEditOff  className="violetHover" onClick={()=>{TogglePasswordEdit()}}/>
                                </>
                                :
                                <>
                                 <span className="bold">****</span>
                                <MdEdit className="violetHover" onClick={()=>{TogglePasswordEdit()}}/>
                                </>}
                               
                              
                            </div>
                            <hr className='line' />
                            <div className="flex flexrow gap10 center">
                                <span className="light">Gender :</span>
                                {Gender?
                                <>
                                <input type="text" className="bold edit_account_elmt padding10"/>
                                <MdEditOff  className="violetHover" onClick={()=>{ToggleGenderEdit()}}/>
                                </>
                                :
                                <>
                                <span className="bold">Male</span>
                                <MdEdit className="violetHover" onClick={()=>{ToggleGenderEdit()}}/>
                                </>}
                                
                            </div>
                            <div className="flex flexrow gap10 center">
                                <span className="light">Date of Birth :</span>
                                {DOB?
                                <>
                                <input type="text" className="bold edit_account_elmt padding10"/>
                                <MdEditOff  className="violetHover" onClick={()=>{ToggleDOBEdit()}}/>
                                </>
                                :
                                <>
                                  <span className="bold">23/04/2001</span>
                                <MdEdit className="violetHover" onClick={()=>{ToggleDOBEdit()}}/>
                                </>}
                                    
                            </div>
                            <hr className='line' />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default AccountSettings;