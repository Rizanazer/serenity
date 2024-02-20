import { MdArrowBack,MdReport, MdGroups, MdBlockFlipped, MdLocationPin } from "react-icons/md";
import { IoMdHeartDislike } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";
import SideScreenCommunityMemberFn from "./SideScreen_communityMember";
var SideScreenCommunityJoinFn = ({ handleClick, data, }) => {
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
                        <span className="bold alignself_center">{data.groupname}</span>
                        <span className="light">Group Discription</span>
                    </div>
            
                    <div className="section3_features">
                        <MdReport  className="icons_2" />
                        <GiExitDoor className="icons_2" />
                        <IoMdHeartDislike className="icons_2" />
                    </div>
                    

                </div>
            </div>
            <div className="section3_2 flexcolumn transparent">
               

            </div>

            <div className="section3_3">

            </div>
        </>
    );

}
export default SideScreenCommunityJoinFn;