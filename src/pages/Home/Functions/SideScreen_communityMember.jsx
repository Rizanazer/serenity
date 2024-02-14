import { MdArrowBack, MdReport ,MdOutlinePersonAddAlt, MdMessage, MdGroups, MdBlockFlipped, MdLocationPin } from "react-icons/md";
import { IoMdHeartDislike } from "react-icons/io";
import { useState } from "react";

var SideScreenCommunityMemberFn = ({ handleClick, data,member }) => {
    //status of anonymous :not used now but soon
    const[AnonymsGps,setAnonymsGps]=useState(true);
    return (
        <>
            <div className="section3_back">
                <MdArrowBack className="icon nobordershadow" onClick={() => { handleClick();member(); }} />
            </div>
            <div className="section3_1">
                <div className="section3_1_1">
                    <img src={data.image} className="section3_1_1" alt="" />
                </div>
                <div className="section3_1_2 center flexcolumn">
                    {/* continue from here */}
                    <div className="section3_textArea profile_text">
                    <span className="light">SerenityScore:<span className="bold">90.99</span></span>
                        <span className="bold alignself_center">{data.username}</span>
                        <span className="light alignself_center">status_text</span>
                        
                    </div>
                    <div className="section3_features">
                        <MdOutlinePersonAddAlt className="icons_1"/>
                        <MdMessage className="icons_1"/>
                        <IoMdHeartDislike className="icons_2"/>
                    </div>
                    <div className="section3_location flexrow center">
                        <MdLocationPin className="icon nobordershadow" />
                        <span className="bold">Kerala,India</span>
                    </div>

                </div>
            </div>
            <div className={AnonymsGps?"section3_2 flexcolumn":"section3_2 flexcolumn blur"}>
                <div className="center spacebetween">
                    <span className="bold">Group Participations</span>
                    <MdGroups className="icon_search" />
                </div>
                <div className="Group_Participations box nobordershadow">
                    <div className="group_box flexrow">
                        <img src="images/groupprofile.jpg" className="icon_search" />
                        <span className="bold">group1</span>
                    </div>
                    <div className="group_box flexrow">
                    <img src="images/groupprofile.jpg" className="icon_search" />
                        <span className="bold">group2</span>
                    </div>
                    <div className="group_box flexrow">
                    <img src="images/groupprofile.jpg" className="icon_search" />
                        <span className="bold">group3</span>
                    </div>
                    <div className="group_box flexrow">
                    <img src="images/groupprofile.jpg" className="icon_search" />
                        <span className="bold">group4</span>
                    </div>
                    

                </div>
                

            </div>

            <div className="section3_3">

            </div>
        </>
    );

}
export default SideScreenCommunityMemberFn;