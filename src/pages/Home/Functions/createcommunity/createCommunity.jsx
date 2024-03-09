import { useEffect, useState } from "react";
import "./createCommunity.css"
import { CgSearch } from "react-icons/cg";
import axios from "axios"
import mongoose from "mongoose";
var CreateCommunity = ({ setCreateAlert,fetchCommunityDetails }) => {
    const [Next, setNext] = useState(false);
    const [friendList,setFriendList] = useState([])
    const userdata = JSON.parse(localStorage.getItem('userdata'))
    useEffect(()=>{
        async function fetchfriends(){
            try {
                const response = await axios.post('/getfriendlist',{friendids:userdata.friends})
                setFriendList(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchfriends()
    },[])
    const [createCommunityData,setCreateCommunityData] = useState({
        c_name:'',
        c_desc:"",
        communityIcon:null,
        selectedMembers:[]
    })
    
    const handleInputChange =(event) =>{
        const {name, value} = event.target
        setCreateCommunityData({...createCommunityData,[name]:value})
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setCreateCommunityData({ ...createCommunityData, communityIcon: file });
      };
      const handleCheckboxChange = (event, memberId) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setCreateCommunityData({
            ...createCommunityData,
            selectedMembers: [
                ...createCommunityData.selectedMembers,memberId]
        });
            console.log(`its checked`+createCommunityData.selectedMembers);
            console.log(typeof(createCommunityData.selectedMembers));

        } else {
            setCreateCommunityData({
                ...createCommunityData,
                selectedMembers: createCommunityData.selectedMembers.filter(id => id !== memberId)
            });
        }
    };
    
    async function createCommunity() {
        const createdBy = localStorage.getItem("userid");
        const formData = new FormData()
        for (const key in createCommunityData) {
            if (key === 'selectedMembers') {
              createCommunityData[key].forEach(memberId => {
                formData.append(key, memberId);
              });
            } else {
              formData.append(key, createCommunityData[key]);
            }
          }
        formData.append('createdby',createdBy)
        // const senddata = { createdby: createdBy, c_name: createCommunityData.c_name, c_desc: createCommunityData.c_desc };
        try {
            const response = await axios.post('/createcommunity', formData);
            setCreateAlert(false);
            console.log("❤️");
            await fetchCommunityDetails();
            console.log(response.data);
        } catch (error) {
            console.error(error);
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

                            {friendList&&friendList.map((elem,key)=>(
                                <div className="member_box flexrow" onClick={() => { }}>
                                <input type="checkbox" onChange={(e) => handleCheckboxChange(e, elem._id)} />
                                <img src="images/profileimg_chat.jpg" className="icon_member" />
                                <span className="bold pointer">{elem.username}</span>
                            </div>
                            ))
                            }
                            
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
                            <input type="file" accept="image/*" name="communityIcon" onChange={handleImageChange} />            
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