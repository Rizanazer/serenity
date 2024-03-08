import { MdArrowBack, MdOutlinePersonAddAlt, MdMessage, MdGroups, MdBlockFlipped, MdLocationPin } from "react-icons/md";
import { IoMdHeartDislike } from "react-icons/io";
var SideScreenPersonalFn = ({ handleClick, data }) => {
    return (
        <>
            <div className="section3_back">
                <MdArrowBack className="icon nobordershadow" onClick={() => { handleClick() }} />
            </div>
            <div className="section3_1">
                <div className="section3_1_1">
                    <img src={'/uploads/data'} className="section3_1_1" alt="" />
                </div>
                <div className="section3_1_2 center flexcolumn">
                    {/* continue from here */}
                    <div className="section3_textArea profile_text">
                        <span className="bold alignself_center">{data.username}</span>
                        <span className="light">status_text</span>
                    </div>
                    <div className="section3_features">
                        <MdBlockFlipped className="icons_1" />
                        <IoMdHeartDislike className="icons_2" />
                    </div>
                    <div className="section3_location flexrow center">
                        <MdLocationPin className="icon nobordershadow" />
                        <span className="bold">Kerala,India</span>
                    </div>

                </div>
            </div>
            <div className="section3_2 flexcolumn">
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
export default SideScreenPersonalFn;