import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { MdClose, MdArrowBack, MdMoreVert, MdOutlineImage, MdSend, MdOutlineKeyboardVoice, MdOutlineInsertEmoticon } from "react-icons/md";
import Contact from "../Functions/Contacts";
import UpperChatInfo from "../Functions/UpperChatInfo";
import SideScreenPersonalFn from "../Functions/SideScreen_personal";
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
  var [contacts, setContacts] = useState([
    { "username": "albert", "image": "images/profileimg_chat.jpg", "message": "lorem ipsum dolor", "viewchat": () => { setViewChat(true) }, "status": true },
    { "username": "jennifer", "image": "images/profileimg_chat.jpg", "message": "sed do eiusmod tempor incididunt", "viewchat": () => { setViewChat(true) }, "status": false },
    { "username": "michael", "image": "images/profilepic.jpg", "message": "ut enim ad minim veniam", "viewchat": () => { setViewChat(true) }, "status": true },
    { "username": "emily", "image": "images/profileimg_chat.jpg", "message": "quis nostrud", "viewchat": () => { setViewChat(true) }, "status": true },
    { "username": "daniel", "image": "images/profileimg_chat.jpg", "message": "duis aute irure dolor in", "viewchat": () => { setViewChat(true) }, "status": false },
    { "username": "albert", "image": "images/profileimg_chat.jpg", "message": "lorem ipsum dolor", "viewchat": () => { setViewChat(true) }, "status": true },
    { "username": "jennifer", "image": "images/profileimg_chat.jpg", "message": "sed do eiusmod tempor incididunt", "viewchat": () => { setViewChat(true) }, "status": false },
    { "username": "michael", "image": "images/profileimg_chat.jpg", "message": "ut enim ad minim veniam", "viewchat": () => { setViewChat(true) }, "status": true },
    { "username": "emily", "image": "images/profileimg_chat.jpg", "message": "quis nostrud", "viewchat": () => { setViewChat(true) }, "status": true },
    { "username": "daniel", "image": "images/profileimg_chat.jpg", "message": "duis aute irure dolor in", "viewchat": () => { setViewChat(true) }, "status": false }, { "username": "albert", "image": "images/profileimg_chat.jpg", "message": "lorem ipsum dolor", "status": true },
    { "username": "jennifer", "image": "images/profileimg_chat.jpg", "message": "sed do eiusmod tempor incididunt", "viewchat": () => { setViewChat(true) }, "status": false },
    { "username": "michael", "image": "images/profileimg_chat.jpg", "message": "ut enim ad minim veniam", "viewchat": () => { setViewChat(true) }, "status": true },
    { "username": "emily", "image": "images/profileimg_chat.jpg", "message": "quis nostrud", "viewchat": () => { setViewChat(true) }, "status": true },
    { "username": "daniel", "image": "images/profileimg_chat.jpg", "message": "duis aute irure dolor in", "viewchat": () => { setViewChat(true) }, "status": false }
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
        <div className="box searchbox">
          <input type="text" placeholder="Search for Existing Chats" className="nobordershadow widthmax" />
        </div>
        {contacts.map((el, i) => <Contact data={el} key={i} handleClick={() => { setSelectedChat(el) }} />)}

      </div>

      <div className="section2 box" >
        {ViewChat ? <>
          {/* upperchats component */}
          <div className="box upper_chatroom_padding flexrow spacebetween">
            <div className="center gap">

              <MdArrowBack className="icon nobordershadow" onClick={() => { setViewChat(false); setSideScreen(false); }} color="" />

              {<UpperChatInfo data={{ "image": selectedChat?.image, "username": selectedChat?.username, "status": () => { setSideScreen(true);setMoreadj(true);} }} />}
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