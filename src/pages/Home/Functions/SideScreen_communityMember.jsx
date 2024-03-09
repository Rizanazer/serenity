import { MdArrowBack, MdReport, MdOutlinePersonAddAlt, MdMessage, MdGroups, MdBlockFlipped, MdLocationPin } from "react-icons/md";
import { IoMdHeartDislike } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";



var SideScreenCommunityMemberFn = ({ handleClick, data, member, selectedUser }) => {
    //status of anonymous :not used now but soon
    const [AnonymsGps, setAnonymsGps] = useState(true);
    const u_id = localStorage.getItem('userid')
    const [userData,setUserData] = useState(null)
    const [sideScreenGroupList,setSideScreenGroupList] = useState(null)
    async function addfriend() {
        if (u_id != selectedUser.userid) {
            console.log(selectedUser.userid);

            const response = await axios.post('/addfriend', { userid: u_id, friendtobe: selectedUser.userid })
        } else {
            console.log(`both same users`);
        }

    }
    useEffect(()=>{
        async function sidescreengrouplist(){
            try {
                const result = await axios.post('/sidescreengroupnames',{u_id:selectedUser.userid})
                setSideScreenGroupList(result.data.names)
                setUserData(result.data.userdata)
                console.log(result)
            } catch (error) {
                console.error(error)
            }
            
        }
        sidescreengrouplist()
    },[selectedUser])
    return (
        <>
            <div className="section3_back">
                <MdArrowBack className="icon nobordershadow" onClick={() => { handleClick(); member(); }} />
            </div>
            <div className="section3_1">
                <div className="section3_1_1">
                {/* <img alt=""src={`/uploads/profilePictures/user.png`}  /> */}
                    {/* <img src={`/uploads/profilePictures/user.png`} className="section3_1_1" alt="" /> */}
                    <img src={`/uploads/profilePictures/${userData?.profilePicture}`} className="section3_1_1" alt="" />
                </div>
                <div className="section3_1_2 center flexcolumn">
                    {/* continue from here */}
                    <div className="section3_textArea profile_text center">
                        <span className="light">SerenityScore:<span className="bold">90.99</span></span>
                        <div className="textlength_head center">
                            <span className="bold alignself_center">{selectedUser.username}</span>
                        </div>
                        <div className="textlength_para center">
                            <span className="light alignself_center">statusssssss</span>
                        </div>
                    </div>
                    <div className="section3_features">
                        <MdOutlinePersonAddAlt className="icons_1" onClick={() => addfriend(selectedUser.userid)} />
                        <MdMessage className="icons_1" />
                        <IoMdHeartDislike className="icons_2" />
                    </div>
                    <div className="section3_location flexrow center">
                        <MdLocationPin className="icon nobordershadow" />
                        <span className="bold">Kerala,India</span>
                    </div>

                </div>
            </div>
            <div className={AnonymsGps ? "section3_2 flexcolumn" : "section3_2 flexcolumn blur"}>
                <div className="center spacebetween">
                    <span className="bold">Group Participations</span>
                    <MdGroups className="icon_search" />
                </div>
                {sideScreenGroupList && sideScreenGroupList.map((name,i)=>(
                    <div className="Group_Participations box nobordershadow">
                    <div className="group_box flexrow">
                        <img src="images/groupprofile.jpg" className="icon_search" />
                        <span className="bold">{name}</span>
                    </div>
                </div>)
                )}
                
            </div>

            <div className="section3_3">

            </div>
        </>
    );

}
export default SideScreenCommunityMemberFn;