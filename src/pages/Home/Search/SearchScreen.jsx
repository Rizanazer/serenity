import React, {useState } from "react";
import { MdArrowBack, MdMoreVert} from "react-icons/md";
import GroupList from "../Functions/GroupList";
import UpperChatInfo from "../Functions/UpperChatInfo";
import "./SearchScreen.css"
import SideScreenCommunityJoinFn from "../Functions/SideScreen_JoinComunity";
function SearchScreen(){
  const [Join,setJoin]=useState(false);
  var [ViewChat, setViewChat] = useState(false);
  var [SideScreen, setSideScreen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [ChatSearch, SetChatSearch] = useState(false);
  const [More, setMore] = useState(false);
  const toggleMore = () => {
    setMore(prevState => !prevState);
  };
  const[Status,setStatus]=useState(false);
  const [Moreadj,setMoreadj]=useState(false);
  var [GroupName, setGroupName] = useState([
    { "groupname": "Group 1", "image": "images/groupprofile.jpg", "message": "lorem ipsum dolor", "viewchat": () => { setViewChat(true) } ,"status":true},
    { "groupname": "Group 2", "image": "images/groupprofile.jpg", "message": "sed do eiusmod tempor incididunt", "viewchat": () => { setViewChat(true) } ,"status":true },
    { "groupname": "Group 3", "image": "images/groupprofile.jpg", "message": "ut enim ad minim veniam", "viewchat": () => { setViewChat(true) }  ,"status":true},
    { "groupname": "Group 4", "image": "images/groupprofile.jpg", "message": "quis nostrud", "viewchat": () => { setViewChat(true) } ,"status":true },
    { "groupname": "Group 5", "image": "images/groupprofile.jpg", "message": "duis aute irure dolor in", "viewchat": () => { setViewChat(true) }  ,"status":false},
    { "groupname": "Group 6", "image": "images/groupprofile.jpg", "message": "lorem ipsum dolor", "viewchat": () => { setViewChat(true) }  ,"status":true},


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
        {GroupName.map((el, i) => <GroupList data={el} key={i} HandleClick={() => { setSelectedChat(el) }} />)}


      </div>

      <div className="section2 box" >
        {ViewChat ? <>
          {/* upperchats component */}
          <div className="box upper_chatroom_padding flexrow spacebetween">
            <div className="center gap">

              <MdArrowBack className="icon nobordershadow" onClick={() => { setViewChat(false); setSideScreen(false); }} color="" />

              {<UpperChatInfo data={{ "image": selectedChat?.image, "username": selectedChat?.groupname, "status": () => { setSideScreen(true);setMoreadj(true);} }} />}
            </div>

            <div className="center gap">
            

              <MdMoreVert className="icon nobordershadow " color="" onClick={toggleMore} />

            </div>
          </div>

          {/* middlechats component-chat_area */}
          <div className="box chat_area nopadding">
            {More && <div className={Moreadj?"more_options more_option_adjusted":"more_options"}></div>}

            {messages.map((el, i) => <p className="msg " key={i}>{el}</p>)}

          </div>

          {/* bottomchats component-chat_typing */}
          {
          Join?<div className="box center pointer joinbtn" onClick={()=>{}}>
            <span className="bold">Enter Chat</span>
          </div>
          :
          <div className="box center pointer joinbtn" onClick={()=>{
            setJoin(true);
          }}>
            <span className="bold">join</span>
          </div>
          }
        </>
          :
          <></>}

      </div>
      {SideScreen && <div className="section3 box nopadding nobordershadow">
      {<SideScreenCommunityJoinFn data={{"image":selectedChat?.image,"groupname":selectedChat?.groupname}} handleClick={()=>{setSideScreen(false); setMoreadj(false);}}/>}
      </div>}
    </>
  );
  }
  export default SearchScreen;