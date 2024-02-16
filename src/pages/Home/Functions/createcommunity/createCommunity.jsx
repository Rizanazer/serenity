import { useState } from "react";
import "./createCommunity.css"
import { CgSearch } from "react-icons/cg";
var CreateCommunity = ({ setCreateAlert }) => {
    const [Next, setNext] = useState(false);
    return (
        <>
            {
                Next ?
                    <div className="box create center flexcolumn">
                        <div className="name_members center flexcolumn">
                            <span className="bold"> Add Members</span>

                            <div className="groupname flexrow center">
                                <CgSearch className="icon_search" />
                                <input type="text" />
                            </div>
                        </div>
                        <div className="box create_gp_Members">
            
                            <div className="member_box flexrow" onClick={() => { }}>
                                <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" />
                                <span className="bold pointer">arif</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                            <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" />
                                <span className="bold pointer">riza</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                            <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" />
                                <span className="bold pointer">arjun</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                            <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" />
                                <span className="bold pointer">ebin</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                            <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" />
                                <span className="bold pointer">arif</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                            <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" />
                                <span className="bold pointer">riza</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                            <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" />
                                <span className="bold pointer">arjun</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                            <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" />
                                <span className="bold pointer">ebin</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                            <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" />
                                <span className="bold pointer">arif</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                            <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" />
                                <span className="bold pointer">riza</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                            <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" />
                                <span className="bold pointer">arjun</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                            <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" />
                                <span className="bold pointer">ebin</span>
                            </div>
                        </div>
                        <div className="txtbtn flexrow ">
                            <span className="bold pointer txtbtn_clr" onClick={() => { setCreateAlert(false) }}>cancel</span>
                            <span className="bold pointer txtbtn_clr" onClick={() => { }}>create</span>
                        </div>

                    </div>

                    :
                    <div className="box create center flexcolumn">
                        <div className="name_image flexrow center">
                            <img src="images/profilepic.jpg" className="circle" alt="" />
                            <div className="groupname flexcolumn">
                                <span className="bold">Group Name</span>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="txtbtn flexrow ">
                            <span className="bold pointer txtbtn_clr" onClick={() => { setCreateAlert(false) }}>cancel</span>
                            <span className="bold pointer txtbtn_clr" onClick={() => { setNext(true) }}>Next</span>
                        </div>

                    </div>

            }
        </>
    );
}
export default CreateCommunity;