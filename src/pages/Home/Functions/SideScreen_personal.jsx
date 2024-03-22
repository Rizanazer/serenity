import { MdArrowBack, MdOutlinePersonAddAlt, MdMessage, MdGroups, MdBlockFlipped, MdLocationPin } from "react-icons/md";
import { IoMdHeartDislike } from "react-icons/io";
import { useEffect,useState } from "react";
import axios from "axios";
var SideScreenPersonalFn = ({ handleClick, data,selectedFriend ,fetchfriends}) => {
    const [userData,setUserData] = useState(null)
    const [sideScreenGroupList,setSideScreenGroupList] = useState([])
    useEffect(()=>{
        async function sidescreengrouplist(){
            try {
                const result = await axios.post('/sidescreengroupnames',{u_id:selectedFriend})
                setSideScreenGroupList(result.data.userdata)
                setUserData(result.data.user)
                console.log(result)
            } catch (error) {
                console.error(error)
            }
            
        }
        sidescreengrouplist()
    },[selectedFriend])

    async function unfriend(){
        try {
            const response = axios.post('/unfriend',{u_id:localStorage.getItem('userid'),f_id:userData._id})
            fetchfriends()
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
                <div className="section3_1_1">
                    <img src={`/uploads/profilePictures/${userData?.profilePicture}`} className="section3_1_1" alt="" />
                </div>
                <div className="section3_1_2 center flexcolumn">
                    {/* continue from here */}
                    <div className="section3_textArea profile_text">
                        <span className="bold alignself_center">{userData?.username}</span>
                        <span className="light">{userData?.status}</span>
                    </div>
                    <div className="section3_features">
                        <MdBlockFlipped className="icons_1" />
                        <IoMdHeartDislike className="icons_2" onClick={unfriend} />
                    </div>
                    <div className="section3_location flexrow center">
                        <MdLocationPin className="icon nobordershadow" />
                        <span className="bold">{userData?.location}</span>
                    </div>

                </div>
            </div>
            <div className="section3_2 flexcolumn">
                <div className="center spacebetween">
                    <span className="bold">Group Participations</span>
                    <MdGroups className="icon_search" />
                </div>
                {sideScreenGroupList && sideScreenGroupList?.map((name,i)=>(
                    <div className="Group_Participations box nobordershadow">
                    <div className="group_box flexrow">
                        <img src={`uploads/communityIcons/${name.communityIcon}`} className="icon_search" />
                        <span className="bold" key={i}>{name.communityName}</span>
                    </div>
                </div>)
                )}
                

                </div>

            <div className="section3_3">

            </div>
        </>
    );

}
export default SideScreenPersonalFn;