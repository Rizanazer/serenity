import { useEffect, useState } from "react";
import "./createCommunity.css"
import { CgSearch } from "react-icons/cg";
import axios from "axios"
var CreateCommunity = ({ setCreateAlert,setIndividualCommunity }) => {
    const [Next, setNext] = useState(false);
    const [createCommunityData,setCreateCommunityData] = useState({c_name:'',c_desc:""})
   
    const handleInputChange =(event) =>{
        const {name, value} = event.target
        setCreateCommunityData({...createCommunityData,[name]:value})
    };
    
    async function createCommunity(){
        const createdBy = localStorage.getItem("userid")
        const senddata = {createdby:createdBy,c_name:createCommunityData.c_name,c_desc:createCommunityData.c_desc}
        try {
            const response = await axios.post('/createcommunity',senddata)
            setCreateAlert(false)
            //console.log(response);
            //setScreen('CommunityMessage')
             setIndividualCommunity((prev)=>[...prev,response.data.result])
             console.log(response.data);
        } catch (error) {
            console.error(error)
        }
       
    }

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
                                <img src="images/profileimg_chat.jpg" className="icon_member" alt=""/>
                                <span className="bold pointer">riza</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                                <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" alt=""/>
                                <span className="bold pointer">arjun</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                                <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" alt=""/>
                                <span className="bold pointer">ebin</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                                <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" alt=""/>
                                <span className="bold pointer">arif</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                                <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" alt=""/>
                                <span className="bold pointer">riza</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                                <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" alt=""/>
                                <span className="bold pointer">arjun</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                                <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" alt=""/>
                                <span className="bold pointer">ebin</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                                <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" alt=""/>
                                <span className="bold pointer">arif</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                                <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" alt=""/>
                                <span className="bold pointer">riza</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                                <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" alt=""/>
                                <span className="bold pointer">arjun</span>
                            </div>
                            <div className="member_box flexrow" onClick={() => { }}>
                                <input type="checkbox" />
                                <img src="images/profileimg_chat.jpg" className="icon_member" alt=""/>
                                <span className="bold pointer">ebin</span>
                            </div>
                        </div>
                        <div className="txtbtn flexrow ">
                            <span className="bold pointer txtbtn_clr" onClick={() => { setCreateAlert(false) }}>cancel</span>
                            <span className="bold pointer txtbtn_clr" onClick={createCommunity}>create</span>
                        </div>

                    </div>

                    :
                    <div className="box create center flexcolumn">
                        <div className="name_image flexrow center">
                            <img src="images/profilepic.jpg" className="circle" alt="" />
                            <div className="groupname flexcolumn">
                                <span className="bold">Group Name</span>
                                <input type="text" value={createCommunityData.c_name} name="c_name" onChange={handleInputChange}/>
                                <span className="light">Group Description</span>
                                <input type="text" value={createCommunityData.c_desc} name="c_desc" onChange={handleInputChange}/>
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