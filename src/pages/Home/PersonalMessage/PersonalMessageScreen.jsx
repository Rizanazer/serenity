import React, { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { FaCircleDot } from "react-icons/fa6";

import { MdClose, MdArrowBack, MdMoreVert, MdOutlineImage, MdSend, MdOutlineKeyboardVoice, MdOutlineInsertEmoticon } from "react-icons/md";
import Contact from "../Functions/Contacts";
import UpperChatInfo from "../Functions/UpperChatInfo";
import SideScreenPersonalFn from "../Functions/SideScreen_personal";
import axios from "axios"
function PersonalMsgScreen() {
  var [ViewChat, setViewChat] = useState(false);
  var [SideScreen, setSideScreen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [ChatSearch, SetChatSearch] = useState(false);
  const [More, setMore] = useState(false);
  const toggleMore = () => {
    setMore(prevState => !prevState);
  };
  const [Moreadj,setMoreadj]=useState(false);
  const [contacts, setContacts] = useState([])
  const u_id = localStorage.getItem('userid')
  const [selectedUser,setSelectedUser] = useState(null)
  const alluserdatastring = localStorage.getItem('userdata')
  const friends = JSON.parse(alluserdatastring).friends
  const username = localStorage.getItem('username')
  useEffect(()=>{
    async function fetchfriends(friends){
      const u_id = localStorage.getItem('userid')

      try {
        const response =  await axios.post("/fetchfriends",{u_id:u_id})
        console.log(response.data.chats);
        setContacts(response.data.chats)
      } catch (error) {
        console.log("error fetching friends")
      }
    } 
    fetchfriends()
    
  },[])
  
  var [text, setText] = useState("");
  var [messages, setMessages] = useState([]);
  const [viewSelectedChat,setViewSelectedChat] = useState([])
  const send = async () => {
    if (text.length > 0) {
      setMessages([...messages, text])
    }
  }
  async function onclickfriend(f_id){
    setViewChat(true)
    setSelectedChat(f_id)
    console.log(f_id);
  }
  return (
    <>
      <div className="section1 box">
        <div className="box searchbox">
          <input type="text" placeholder="Search for Existing Chats" className="nobordershadow widthmax" />
        </div>
        {Array.isArray(contacts) && contacts.map((el, i) => <div className="box chat pointer" >
            <div className="chat_info" key= {i} onClick={()=>onclickfriend(el.users[0].userid !== u_id ? el.users[0]:el.users[1])}>
              <img className="icon profile_chat_img" src="uploads/img.png" alt="" />
              <div className=" profile_text">
                  <span className="bold">{el.users[0].username !== username ? el.users[0].username:el.users[1].username}</span>
                <span className="light">messaage</span>
              </div>
            </div>
            {contacts && <FaCircleDot className="" color="#5e4ae3" />}</div>)}

      </div>

      <div className="section2 box" >
        {ViewChat ? <>
          {/* upperchats component */}
          <div className="box upper_chatroom_padding flexrow spacebetween">
            <div className="center gap">

              <MdArrowBack className="icon nobordershadow" onClick={() => { setViewChat(false); setSideScreen(false); }} color="" />

              {/* {<UpperChatInfo data={{ "image": selectedChat?.image, "username": selectedChat?.username, "status": () => { setSideScreen(true);setMoreadj(true);} }} />} */}
              {<div>
                <img className="icon profile_chat_img" src="uploads/img.png" alt="" />
                <span className="bold">{selectedChat.username}</span>
              </div>}
            </div>

            <div className="center gap">
              <div className="box center nobordershadow nopadding spacebetween flexrow">

                {ChatSearch ?
                  <>
                    <MdClose className="icon_search" color="" onClick={() => { SetChatSearch(false) }} />
                    <input type="text" onChange={() => { }} />
                  </>

                  :
                  <>
                    <CgSearch color="" onClick={() => { SetChatSearch(true) }} />
                    <span className="light " onClick={() => { SetChatSearch(true) }}>Search</span>
                  </>
                }

              </div>

              <MdMoreVert className="icon nobordershadow " color="" onClick={toggleMore} />

            </div>
          </div>

          {/* middlechats component-chat_area */}
          <div className="box chat_area nopadding">
            {More && <div className={Moreadj?"more_options more_option_adjusted":"more_options"}></div>}

            {messages.map((el, i) => <p className="msg " key={i}>{el}</p>)}

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
          <></>}

      </div>
      {SideScreen && <div className="section3 box nopadding nobordershadow">
        <SideScreenPersonalFn data={{"image":selectedChat?.image,"username":selectedChat?.username}} handleClick={()=>{setSideScreen(false); setMoreadj(false);}}/>
      </div>}
    </>
  );
}
export default PersonalMsgScreen;