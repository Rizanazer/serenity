import React, { useEffect, useState } from "react";
import "./AddFriends.css";
import Add_Friends from "./AddFriends";
import { MdArrowBack, MdLocationPin } from "react-icons/md";
import axios from "axios";
function AddFriendsScreen() {
  // var [Likes, setLikes] = useState([]);
  // var [DisLikes, setDisLikes] = useState([]);
  // var [Hobies, setHobies] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedUserData, setSelectedUserdata] = useState(null)
  const u_id = localStorage.getItem('userid')
  const userdata = JSON.parse(localStorage.getItem('userdata'))
  async function retrieverequests() {
    try {
      const u_id = localStorage.getItem('userid')
      const response = await axios.post('/fetchrequests', { u_id: u_id })
      console.log(response.data.friendrequests);
      setAddFriends(response.data.friendrequests)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {

    retrieverequests()

  }, [])

  useEffect(() => {
    AddFriends.forEach((element) => {
      if (element._id === selectedRequest) {
        setSelectedUserdata(element)
      }
    })
  }, [selectedRequest])
  var [AddFriends, setAddFriends] = useState([]);

  async function acceptRequest(u_id, tobefriend) {
    const username = localStorage.getItem('username')

    const tobefriend_username = selectedUserData?.username

    const response = await axios.post("/accept", { u_id: u_id, tobefriend: tobefriend, tobefriend_username: tobefriend_username, username: username })
    if (response.success === true) {
      const updatedUserdata = {
        ...userdata,
        friends: [...userdata.friends, response.data.tobefriend]
    };

    localStorage.setItem('userdata', JSON.stringify(updatedUserdata));
    }
    //////////localstorage updation


  }

  async function rejectRequest(u_id, tobefriend) {
    const response = await axios.post('/reject', { u_id: u_id, tobefriend: tobefriend })
    if (response.success === true) {
      setAddFriends((prev) => prev.filter(item => item._id !== tobefriend))
    }
  }
  return (
    <>{AddFriends.length > 0 ? (
      <div className="section1 box section_margin">
        {AddFriends.map((el, i) => <Add_Friends data={el}  key={i} handleClick={() => {
          setSelectedRequest(el._id);

        }} addFriendsAlert={() => { }} />)}
      </div>) : (<div className=" pointer center section1 section_margin box">No Requests</div>)}
      {selectedUserData ? (

        <div className="section2 box center">
          {/* {setLikes(selectedUserData.likes)}
          {setDisLikes(selectedUserData.dislikes)}
          {setHobies(selectedUserData.hobbies)} */}
          <div className="alert flexcolumn">
            <div className="back_btn">
              <MdArrowBack className="icon nobordershadow" onClick={() => { setSelectedUserdata(null); setSelectedRequest(null); }} />
            </div>
            <div className="center alert_content">
              <img src={`/uploads/profilePictures/${selectedUserData.profilePicture}`} alt="image" className="circle profile_pic" />
              <span className="bold">{selectedUserData.username}</span>
              <span className="light">{selectedUserData.status}</span>
              <div className="serenity_score">
                <span>SerinityScore:</span>
                <span>{selectedUserData.serenityscore}</span>
              </div>
              {/* <div className="personality_prediction">
                <span className="">Personality : </span>
                <span className="">Shy</span>
              </div> */}
              <div className="section3_location flexrow center">
                <MdLocationPin className="" />
                <span className="bold">Kerala,India</span>
              </div>
              <span className=" alignAll">
                the facts that you need to know about this person:
              </span>
              <div className="profile_preferences alignself_cntr flex flexrow gap10 scroll">
              {Array.isArray(selectedUserData.likes) && selectedUserData.likes.map((el, i) => (
                    <div className="box padding5 preference_item" key={i}>
                      <span className="light">#likes_{el}</span>
                    </div>))}

                    {Array.isArray(selectedUserData.hobbies) && selectedUserData.hobbies.map((el, i) => (
                    <div className="box padding5 preference_item" key={i}>
                      <span className="light">#{el}</span>
                    </div>))}

                    {Array.isArray(selectedUserData.dislikes) && selectedUserData.dislikes.map((el, i) => (
                    <div className="box padding5 preference_item" key={i}>
                      <span className="light">#dont_like_{el}</span>
                    </div>))}
            </div>
              {/* <div className="personality  flexrow">
                <div className="likes flexcolumn gap20">

                  

                  



                </div>
                <div className="dontlikes">
                  
                </div>
              </div> */}

              <div className="txtbtn gap10 flexrow ">
                <span className="bold box joinbtn" onClick={() => {acceptRequest(u_id, selectedUserData._id);retrieverequests();setSelectedUserdata() }}>accept</span>
                <span className="bold box joinbtn" onClick={() => {rejectRequest(u_id, selectedUserData._id); retrieverequests();setSelectedUserdata()}}>reject</span>
              </div>
            </div>
          </div>

        </div>) : <div className="section2 box center"></div>}
    </>
  );
}
export default AddFriendsScreen;  