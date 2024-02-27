import { MdArrowBack,MdReport, MdGroups, MdBlockFlipped, MdLocationPin } from "react-icons/md";
import { IoMdHeartDislike } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";
import SideScreenCommunityMemberFn from "./SideScreen_communityMember";
var SideScreenCommunityDetailsFn = ({ handleClick, data, member }) => {
    return (
        <>
            <div className="section3_back">
                <MdArrowBack className="icon nobordershadow" onClick={() => { handleClick() }} />
            </div>
            <div className="section3_1">
                <div className="section3_1_1">
                    <img src={data.image} className="section3_1_1" alt="" />
                </div>
                <div className="section3_1_2 center flexcolumn">
                    {/* continue from here */}
                    <div className="section3_textArea profile_text">
                        <span className="bold alignself_center">{data.selectedCommunityName}</span>
                        <span className="light">Group Discription</span>
                    </div>
            
                    <div className="section3_features">
                        <MdReport  className="icons_2" />
                        <GiExitDoor className="icons_2" />
                        <IoMdHeartDislike className="icons_2" />
                    </div>
                    {/* <div className="section3_location flexrow center">
                        <MdLocationPin className="icon nobordershadow" />
                        <span className="bold">Kerala,India</span>
                    </div> */}

                </div>
            </div>
            <div className="section3_2 flexcolumn">
                <div className="center spacebetween">
                    <span className="bold">Group Members</span>
                    <MdGroups className="icon_search" />
                </div>
                <div className="Group_Participations box nobordershadow">
                    <div className="group_box flexrow" onClick={()=>{member()}}>
                        <img src="images/profileimg_chat.jpg" className="icon_search" />
                        <span className="bold pointer">arif</span>
                    </div>
                    <div className="group_box flexrow" onClick={()=>{member()}}>
                    <img src="images/profileimg_chat.jpg" className="icon_search" />
                        <span className="bold pointer">riza</span>
                    </div>
                    <div className="group_box flexrow" onClick={()=>{member()}}>
                    <img src="images/profileimg_chat.jpg" className="icon_search" />
                        <span className="bold pointer">arjun</span>
                    </div>
                    <div className="group_box flexrow" onClick={()=>{member()}}>
                    <img src="images/profileimg_chat.jpg" className="icon_search" />
                        <span className="bold pointer">ebin</span>
                    </div>
                    

                </div>

            </div>

            <div className="section3_3">

            </div>
        </>
    );

}
export default SideScreenCommunityDetailsFn;