import React, { useState } from "react";
import "./AddFriends.css";
import Add_Friends from "./AddFriends";
import { MdArrowBack, MdLocationPin } from "react-icons/md";
function AddFriendsScreen() {
  var [ViewChat, setViewChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  var [AddFriends, setAddFriends] = useState([
    { "username": "albert", "image": "images/profileimg_chat.jpg", "Status": "lorem ipsum dolor", "viewchat": () => { setViewChat(true) }, },
    { "username": "jennifer", "image": "images/profileimg_chat.jpg", "Status": "sed do eiusmod tempor incididunt", "viewchat": () => { setViewChat(true) }, },
    { "username": "michael", "image": "images/profilepic.jpg", "Status": "ut enim ad minim veniam", "viewchat": () => { setViewChat(true) }, },
    { "username": "emily", "image": "images/profileimg_chat.jpg", "Status": "quis nostrud", "viewchat": () => { setViewChat(true) }, },
    { "username": "daniel", "image": "images/profileimg_chat.jpg", "Status": "duis aute irure dolor in", "viewchat": () => { setViewChat(true) }, },
    { "username": "albert", "image": "images/profileimg_chat.jpg", "Status": "lorem ipsum dolor", "viewchat": () => { setViewChat(true) }, },
  ]
  );
  return (
    <>
      <div className="section1 box">
        {AddFriends.map((el, i) => <Add_Friends data={el} key={i} handleClick={() => { setSelectedChat(el) }} addFriendsAlert={() => { }} />)}
      </div>
      <div className="section2 box center">
        <div className="alert flexcolumn">
          <div className="back_btn">
            <MdArrowBack className="icon nobordershadow" onClick={() => { }} />
          </div>
          <div className="center alert_content">
            <img src="images/profileimg_chat.jpg" alt="image" className="circle profile_pic" />
            <span className="bold">name</span>
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
            <span className="light">
              the facts that you need to know about this person:
            </span>
            <div className="personality  flexrow">
              <div className="likes flexcolumn">
                <span className="textcover">#likes cats</span>
                <span className="textcover">#likes anime</span>
              </div>
              <div className="dontlike">
                <span className="textcover">#don't likes crowed Area</span>
              </div>
            </div>
             
            <div className="txtbtn flexrow ">
                <span className="bold pointer txtbtn_clr" onClick={() => { }}>accept</span>
                <span className="bold pointer txtbtn_clr" onClick={() => { }}>reject</span>
              </div>
          </div>
        </div>

      </div>
    </>
  );
}
export default AddFriendsScreen;  