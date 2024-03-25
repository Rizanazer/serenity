import { MdArrowBack, MdReport, MdGroups, MdBlockFlipped, MdLocationPin, MdEdit, MdViewList } from "react-icons/md";
import { IoMdHeartDislike } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";
import SideScreenCommunityMemberFn from "./SideScreen_communityMember";
import axios from "axios";
import { useEffect, useState } from "react";

var SideScreenCommunityDetailsFn = ({ setIndividualCommunity, handleClick, data, actions,setviewprofileImage,viewprofileImage }) => {
    const userdata = JSON.parse(localStorage.getItem('userdata'))
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
    async function exitcommunity(c_id) {
        actions.setViewChat(false)
        actions.setSideScreen(false)

        try {
            const response = await axios.post('/exitcommunity', { c_id: c_id, u_id: localStorage.getItem('userid') })
            console.log(response);
            userdata.communities = userdata.communities.filter(id => id !== c_id);
            localStorage.setItem('userdata', JSON.stringify(userdata))
            const filteredcommunities = data.individualCommunity.map((c) => {
                if (c._id !== c_id) {
                    return c;
                }
                return null;
            }).filter((c) => c !== null);
            actions.setIndividualCommunity(filteredcommunities);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div className="section3_back">
                <MdArrowBack className="icon nobordershadow" onClick={() => { handleClick() }} />
            </div>
            <div className="section3_1">
                <div className="section3_1_1" >
                   
                    <img src={`uploads/communityIcons/${data.selectedCommunityIcon}`} className="section3_1_1" alt="" />
                    <div className="section3_1_1-overlay center">
                        <MdEdit className="icon_search" color="#fff" onClick={()=>{}}/>
                        <MdViewList className="icon_search" color="#fff" onClick={() => {setviewprofileImage(data.selectedCommunityIcon)
                    }}/>

                    </div>
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
                        <GiExitDoor className="icons_2" onClick={() => exitcommunity(data.selectedCommunity)} />
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
                    <div className="Group_Participations box nobordershadow  flexcolumn spacebetween flex " >
                        {memberNames && memberNames.map((elem, i) => (
                            <div className="group_box flex " onClick={() => { }} key={i}>
                                <img src={`uploads/profilePictures/${elem[1]}`} className="icon_search" />
                                <span className="bold pointer">{elem[0]}</span>
                            </div>
                        ))}
                        {/* <span className="light">active</span> */}
                    </div>
                </div>
            </div>

            <div className="section3_3">
            </div>
        </>
    );

}
export default SideScreenCommunityDetailsFn;