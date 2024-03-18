import { MdArrowBack, MdReport, MdOutlinePersonAddAlt, MdMessage, MdGroups, MdBlockFlipped, MdLocationPin } from "react-icons/md";
import { IoMdHeartDislike } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";



var SideScreenCommunityMemberFn = ({ handleClick, data, member, selectedUser }) => {
    //status of anonymous :not used now but soon
    const [AnonymsGps, setAnonymsGps] = useState(null);
    const [AddFriends, setAddFriends] = useState(true);
    // const [Friends, setFriends] = useState([]);
    const [sernityscore, setsernityscore] = useState(null);
    const [location, setLocation] = useState(null);
    const u_id = localStorage.getItem('userid')
    const [userData, setUserData] = useState(null)
    const [sideScreenGroupList, setSideScreenGroupList] = useState(null)
    async function addfriend() {
        if (u_id != selectedUser.userid) {
            console.log(selectedUser.userid);

            const response = await axios.post('/addfriend', { userid: u_id, friendtobe: selectedUser.userid })
        } else {
            console.log(`both same users`);
        }

    }
    async function sidescreengrouplist() {
        try {
            const result = await axios.post('/sidescreengroupnames', { u_id: selectedUser.userid })
            setSideScreenGroupList(result.data.names)
            setUserData(result.data.userdata)
            setAnonymsGps(result.data.userdata.anonymity)
            setsernityscore(result.data.userdata.serenityscore)
            setLocation(result.data.userdata.location)
            result.data.userdata.friends.includes(u_id)?
                setAddFriends(false):setAddFriends(true)
            
        } catch (error) {
            console.error(error)
        }

    }
    useEffect(() => {
       
        sidescreengrouplist()
    }, [selectedUser])
    return (
        <>
            <div className="section3_back">
                <MdArrowBack className="icon nobordershadow" onClick={() => { handleClick(); member(); }} />
            </div>
            <div className="section3_1">
                <div className="section3_1_1">

                    <img src={`/uploads/profilePictures/${userData?.profilePicture}`} className="section3_1_1" alt="" />
                </div>
                <div className="section3_1_2 center flexcolumn">
                    {/* continue from here */}
                    <div className="section3_textArea profile_text center">
                        <span className="light">SerenityScore:<span className="bold">{sernityscore}</span></span>
                        <div className="textlength_head center">
                            {AnonymsGps ? <span className="bold alignself_center">Anonymous</span> : <span className="bold alignself_center">{selectedUser.username}</span>}

                        </div>
                        <div className="textlength_para center">
                            {AnonymsGps ? <span className="light alignself_center">target's status is hidden!</span> : <span className="light alignself_center">{selectedUser.status}</span>}

                        </div>
                    </div>
                    <div className="section3_features">
                        {AddFriends&&<MdOutlinePersonAddAlt className="icons_1" onClick={() => {
                              
                              addfriend(selectedUser.userid)}} />}
                        <MdMessage className="icons_1" />
                        <IoMdHeartDislike className="icons_2" />
                    </div>
                    <div className="section3_location flexrow center">
                        <MdLocationPin className="icon nobordershadow" />
                        <span className="bold">{location}</span>
                    </div>

                </div>
            </div>
            {
                AnonymsGps ?
                    <div className="section3_2 flexcolumn">
                        <div className="center spacebetween">
                            <span className="bold">Group Participations</span>
                            <MdGroups className="icon_search" />
                        </div>

                        <div className="Group_Participations box nobordershadow">
                            <span className="light">user's data is hidden</span>
                        </div>

                    </div>
                    :
                    <div className="section3_2 flexcolumn scroll">
                        <div className="center spacebetween">
                            <span className="bold">Group Participations</span>
                            <MdGroups className="icon_search" />
                        </div>
                        <div className="Group_Participations box nobordershadow scroll">
                            {sideScreenGroupList && sideScreenGroupList.map((name, i) => (
                                <div className="group_box flexrow" key={i}>
                                    <img src="images/groupprofile.jpg" className="icon_search" />
                                    <span className="bold">{name}</span>
                                </div>)
                            )}
                        </div>

                    </div>

            }

            <div className="section3_3">

            </div>
        </>
    );

}
export default SideScreenCommunityMemberFn;