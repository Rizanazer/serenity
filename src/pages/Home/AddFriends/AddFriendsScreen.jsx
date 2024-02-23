import React, { useEffect, useState } from "react";
import "./AddFriends.css";
import Add_Friends from "./AddFriends";
import { MdArrowBack, MdLocationPin } from "react-icons/md";
import axios from "axios";
function AddFriendsScreen() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedUserData,setSelectedUserdata] = useState(null)
  const u_id = localStorage.getItem('userid')
  useEffect(()=>{
    if(selectedUserData){

      console.log(selectedUserData.username)
    }
  },[selectedUserData])
  useEffect(()=>{
    async function retrieverequests(){
      try {
        const u_id = localStorage.getItem('userid')
        const response = await axios.post('/fetchrequests',{u_id:u_id})
        console.log(response.data);
        setAddFriends(response.data.friendrequests)
      } catch (error) {
        console.error(error)
      }
    }
    retrieverequests()
  },[])

  useEffect(()=>{
    AddFriends.forEach((element)=>{
      if(element._id === selectedRequest){
        setSelectedUserdata(element)
      }
    })
  },[selectedRequest])
  var [AddFriends, setAddFriends] = useState([]);

  async function acceptRequest(u_id,tobefriend){
    const response = await axios.post("/accept",{u_id:u_id,tobefriend:tobefriend})
    
  }

  async function rejectRequest(u_id,tobefriend){ 
    const response = await axios.post('/reject',{u_id:u_id,tobefriend:tobefriend})
  }
  return (
    <>{AddFriends.length>0?(
      <div className="section1 box">
        {AddFriends.map((el, i) => <Add_Friends data={el} key={i} handleClick={() => { setSelectedRequest(el._id) }} addFriendsAlert={() => { }} />)}
      </div>):(<div className="box chat pointer center">No Requests</div>)}
      {selectedUserData ?(
      <div className="section2 box center">
        <div className="alert flexcolumn">
          <div className="back_btn">
            <MdArrowBack className="icon nobordershadow" onClick={() => {setSelectedUserdata(null); setSelectedRequest(null) ;}} />
          </div>
          <div className="center alert_content">
            <img src="images/profileimg_chat.jpg" alt="image" className="circle profile_pic" />
            <span className="bold">{selectedUserData.username}</span>
            <span className="light">Personal_Status</span>
            <div className="serenity_score">
              <span>SerinityScore:</span>
              <span>90</span>
            </div>
            <div className="personality_prediction">
                <span className="">Personality : </span>
                <span className="">Shy</span>
              </div>
            <div className="section3_location flexrow center">
              <MdLocationPin className="" />
              <span className="bold">Kerala,India</span>
            </div>
            <span className=" alignAll">
              the facts that you need to know about this person:
            </span>
            <div className="personality  flexrow">
              <div className="likes flexcolumn">
                <span className="textcover">#likes cats</span>
                <span className="textcover">#likes anime</span>
              </div>
              <div className="dontlikes">
                <span className="textcover">#don't likes crowed Area</span>
              </div>
            </div>
             
            <div className="txtbtn gap flexrow ">
                <span className="bold box joinbtn" onClick={()=>acceptRequest(u_id,selectedUserData._id)}>accept</span>
                <span className="bold box joinbtn" onClick={()=>rejectRequest(u_id,selectedUserData._id)}>reject</span>
              </div>
          </div>
        </div>

      </div>):<div className="section2"></div>}
    </>
  );
}
export default AddFriendsScreen;  