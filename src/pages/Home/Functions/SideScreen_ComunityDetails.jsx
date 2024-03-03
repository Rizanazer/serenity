import { MdArrowBack, MdReport, MdGroups, MdBlockFlipped, MdLocationPin } from "react-icons/md";
import { IoMdHeartDislike } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";
import SideScreenCommunityMemberFn from "./SideScreen_communityMember";
import axios from "axios";
import { useEffect, useState } from "react";
var SideScreenCommunityDetailsFn = ({ handleClick, data, member }) => {
    console.log(data.selectedCommunity);
    const [memberNames, setMembernames] = useState([])
    useEffect(() => {
        async function getmemberdata() {
            try {
                const response = await axios.post('/getmemberdata', { c_id: data.selectedCommunity })
                setMembernames(response.data.names)
                // console.log(memberNames)
                console.log(response.data.names)
            } catch (error) {
                console.log('error fetching membername')
            }
        }
        getmemberdata()
    }, [data.selectedCommunity])
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

                    <div className="section3_textArea profile_text center">

                        <div className="textlength_head center">
                            <span className="bold alignself_center">{data.selectedCommunityName}</span>
                        </div>
                        <div className="textlength_para center">
                            <span className="light">{data.description}</span>
                        </div>
                    </div>

                    <div className="section3_features">
                        <MdReport className="icons_2" />
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
                <div className="center spacebetween ">
                    <span className="bold ">Group Members</span>
                    <MdGroups className="icon_search" />
                </div>
                <div className="box nopadding nobordershadow padding5 scroll nocircleradius">
                {memberNames && memberNames.map((elem, i) => (
                        <div className="Group_Participations box nobordershadow  flexrow spacebetween flex " key={i}>
                            <div className="group_box " onClick={() => { member() }}>
                                <img src="images/profileimg_chat.jpg" className="icon_search" />
                                <span className="bold pointer">{elem}</span>
                            </div>
                            <span className="light">active</span>
                        </div>
                        ))}
                    </div>
            </div>

            <div className="section3_3">
            </div>
        </>
    );

}
export default SideScreenCommunityDetailsFn;