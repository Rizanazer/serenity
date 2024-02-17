import React, { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { MdOutlineMenu ,MdClose, MdArrowBack, MdMoreVert, MdOutlineImage, MdSend, MdOutlineKeyboardVoice, MdOutlineInsertEmoticon } from "react-icons/md";
import GroupList from "../Functions/GroupList";
import UpperChatInfo from "../Functions/UpperChatInfo";
import Menu from "../Functions/Menu/menu";
import SideScreenCommunityDetailsFn from "../Functions/SideScreen_ComunityDetails";
import SideScreenCommunityMemberFn from "../Functions/SideScreen_communityMember";
import axios from "axios";

function CommunityMsgScreen({screen,create}) {
  ///////////////////////////
  const [selectedCommunityName,setSelectedCommunityName] = useState(null)

  //////////////////////////
  const [ChatSearch, SetChatSearch] = useState(false);
  var [ViewChat, setViewChat] = useState(false);
  var [SideScreen, setSideScreen] = useState(false);
  var [selectedChat, setSelectedChat] = useState(null);
  const [More, setMore] = useState(false);
  const toggleMore = () => {
    setMore(prevState => !prevState);
  };
  const [Moreadj,setMoreadj]=useState(false);
  var [Member,setMember]=useState(false);
  var [GroupName, setGroupName] = useState([
    { "groupname": "Group 1", "image": "images/groupprofile.jpg", "message": "lorem ipsum dolor", "viewchat": () => { setViewChat(true) } },
    { "groupname": "Group 2", "image": "images/groupprofile.jpg", "message": "sed do eiusmod tempor incididunt", "viewchat": () => { setViewChat(true) } },
    { "groupname": "Group 3", "image": "images/groupprofile.jpg", "message": "ut enim ad minim veniam", "viewchat": () => { setViewChat(true) } },
    { "groupname": "Group 4", "image": "images/groupprofile.jpg", "message": "quis nostrud", "viewchat": () => { setViewChat(true) } },
    { "groupname": "Group 5", "image": "images/groupprofile.jpg", "message": "duis aute irure dolor in", "viewchat": () => { setViewChat(true) } },
    { "groupname": "Group 6", "image": "images/groupprofile.jpg", "message": "lorem ipsum dolor", "viewchat": () => { setViewChat(true) } },
    { "groupname": "Group 7", "image": "images/groupprofile.jpg", "message": "sed do eiusmod tempor incididunt", "viewchat": () => { setViewChat(true) } },
    { "groupname": "Group 8", "image": "images/groupprofile.jpg", "message": "ut enim ad minim veniam", "viewchat": () => { setViewChat(true) } },
    { "groupname": "Group 9", "image": "images/groupprofile.jpg", "message": "quis nostrud", "viewchat": () => { setViewChat(true) } },
    { "groupname": "Group 10", "image": "images/groupprofile.jpg", "message": "duis aute irure dolor in", "viewchat": () => { setViewChat(true) } }

  ]
  );
  var [text, setText] = useState("");
  var [messages, setMessages] = useState([]);

  const send = async () => {
    if (text.length > 0) {
      setMessages([...messages, text])
    }
  }
  return (
    <>
      <div className="section1 box">
        <div className="box searchbox flexrow spacebetween">
          <input type="text" placeholder="Search for Existing Chats" className="nobordershadow widthmax" onChange={()=>{}}/>
          <Menu setScreen={screen} setCreateAlert={create}/>
        </div>
        {GroupName.map((el, i) => <GroupList data={el} key={i} HandleClick={() => { setSelectedChat(el) }} />)}


      </div>

      <div className="section2 box">
        {ViewChat ?
          <>
            {/* upperchats component */}
            <div className="box upper_chatroom_padding flexrow spacebetween">
              <div className="center gap">

                <MdArrowBack className="icon nobordershadow" onClick={() => { setViewChat(false); setSideScreen(false); }} color="" />

                {<UpperChatInfo data={{ "image": selectedChat.image, "username": selectedChat.groupname, "status": () => { setSideScreen(true);setMoreadj(true);setMember(false); } }} />}
              </div>

              <div className="center gap">
                <div className="box center nobordershadow nopadding spacebetween flexrow ">
                {ChatSearch?
                <>
                <MdClose className="icon_search" color="" onClick={() => { SetChatSearch(false) }}/>
                <input type="text" onChange={()=>{}}/>
                </>
                
                :
                <>
                <CgSearch color="" onClick={() => { SetChatSearch(true) }}/>
                <span className="light " onClick={() => { SetChatSearch(true) }}>Search</span>
                </>
                }
                </div>

                <MdMoreVert className="icon nobordershadow" color="" onClick={toggleMore} />

              </div>
            </div>

            {/* middlechats component-chat_area */}
            <div className="box chat_area nopadding">
            {More && <div className={Moreadj?"more_options more_option_adjusted":"more_options"}></div>}

              {messages.map((el, i) => <div className="msg_main">
                 <img src="images/profileimg_chat.jpg"className="icon_search circle" alt="" srcset="" onClick={()=>{setMember(true);setSideScreen(true)}}/>
                 <p className="msg " key={i}>{el}</p>
                </div>)}
              

            </div>

            {/* bottomchats component-chat_typing */}
            <div className="box center chat_typing flexrow spacebetween">
              <div className="type_message">
                <input type="text" className="nobordershadow message_length" placeholder="type Here!!" onChange={(event) => { setText(event.target.value) }} />
              </div>
              <div className="feature_with_send flexrow">
                <div className="chatfeature">
                  <MdOutlineKeyboardVoice className="icon icon_small nobordershadow" />
                  <MdOutlineInsertEmoticon className="icon icon_small nobordershadow" />
                  <MdOutlineImage className="icon icon_small nobordershadow" />
                </div>
                <MdSend className="icon send nobordershadow" onClick={send} />
              </div>


            </div>
          </>
          :
          <></>
        }
      </div>
      {SideScreen && <div className="section3 box nopadding nobordershadow">
        {Member?<SideScreenCommunityMemberFn data={{"image":"images/profileimg_chat.jpg","username":"arif"}} handleClick={()=>{setSideScreen(false); setMoreadj(false);}} member={()=>{setMember(false)}}/>
        :
        <SideScreenCommunityDetailsFn data={{"image":selectedChat?.image,"username":selectedChat?.groupname}} member={()=>{setMember(true);}} handleClick={()=>{setSideScreen(false); setMoreadj(false);}}/>}
        
      </div>}
    </>
  );
}
export default CommunityMsgScreen;