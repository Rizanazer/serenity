import React, { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { FaCircleDot } from "react-icons/fa6";
import './personalMessage.css';
import { HiMiniSpeakerXMark,HiMiniSpeakerWave  } from "react-icons/hi2";
import { MdClose, MdArrowBack, MdMoreVert, MdOutlineImage, MdSend, MdOutlineKeyboardVoice, MdOutlineInsertEmoticon } from "react-icons/md";
import Contact from "../Functions/Contacts";
import UpperChatInfo from "../Functions/UpperChatInfo";
import SideScreenPersonalFn from "../Functions/SideScreen_personal";
import axios from "axios"
import io from "socket.io-client"
function PersonalMsgScreen() {
  var [ViewChat, setViewChat] = useState(false);
  var [SideScreen, setSideScreen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [ChatSearch, SetChatSearch] = useState(false);
  const [More, setMore] = useState(false);
  const toggleMore = () => {
    setMore(prevState => !prevState);
  };
  const [Moreadj, setMoreadj] = useState(false);
  const [contacts, setContacts] = useState([])
  const u_id = localStorage.getItem('userid')
  const [selectedUser, setSelectedUser] = useState(null)
  const alluserdatastring = localStorage.getItem('userdata')
  const friends = JSON.parse(alluserdatastring).friends
  const username = localStorage.getItem('username')
  const [mySocket,setMySocket] = useState(null)
  var [text, setText] = useState("");

  useEffect(()=>{
    const socket = io('http://:3000');
    setMySocket(socket)
    socket.on('recieve_p_message',(message)=>{
      // console.log(message);
      console.log(messages)
      const newmessage = message
      setMessages((prev)=>[...prev,newmessage])
    })
  },[])
  useEffect(() => {
    async function fetchfriends(friends) {
      const u_id = localStorage.getItem('userid')

      try {
        const response = await axios.post("/fetchfriends", { u_id: u_id })
        console.log(response.data.chats);
        setContacts(response.data.chats)
      } catch (error) {
        console.log("error fetching friends")
      }
    }
    fetchfriends()

  }, [])

  //speechtotext fn
  const [Neration, setNeration] = useState(false);
  const speakText = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
  };
  const toggleNeration = () => {
    setNeration(prevState => !prevState);
  };
//texttospeech

  var [messages, setMessages] = useState([]);
  const [viewSelectedChat, setViewSelectedChat] = useState([])


  const send = async () => {
    console.log(selectedChat);
    const senddata = {"fromname":username,"from":u_id,"toname":selectedChat.username,"to":selectedChat.userid,"message":text}
    mySocket.emit("send_p_message",senddata)
  }

// useEffect(()=>{
//   if(messages){
//     messages.forEach((el)=>{
//       console.log(el.messageBody);
//     })}
// },[messages])
  async function onclickfriend(friend){
    setViewChat(true)
    setSelectedChat(friend)
    console.log(friend);
    try {
      const response = await axios.post('/fetchpersonal',{f_id:friend.userid,u_id:u_id})
      console.log(response.data.chats.messages);
       setMessages(response.data.chats.messages) 
    } catch (error) {
      console.log('personal message fetch error')
    }
    
  }
  
  return (
    <>
      <div className="section1 section_margin box">
        <div className="box searchbox">
          <input type="text" placeholder="Search for Existing Chats" className="nobordershadow widthmax" />
        </div>
        {Array.isArray(contacts) && contacts.map((el, i) => <div className="box chat pointer" >
          <div className="chat_info" key={i} onClick={() => onclickfriend(el.users[0].userid !== u_id ? el.users[0] : el.users[1])}>
            <img className="icon profile_chat_img" src="uploads/img.png" alt="" />
            <div className=" profile_text">
              <span className="bold">{el.users[0].username !== username ? el.users[0].username : el.users[1].username}</span>
              <span className="light">messaage</span>
            </div>
          </div>
          {contacts && <FaCircleDot className="" color="#5e4ae3" />}</div>)}

      </div>

      <div className="section2 box" >
        {ViewChat ? <>
          {/* upperchats component */}
          <div className="box upper_chatroom_padding flexrow spacebetween">
            <div className="center gap10">

              <MdArrowBack className="icon nobordershadow" onClick={() => { setViewChat(false); setSideScreen(false); }} color="" />

              {/* {<UpperChatInfo data={{ "image": selectedChat?.image, "username": selectedChat?.username, "status": () => { setSideScreen(true);setMoreadj(true);} }} />} */}
              {<div className="center inputrow" onClick={() => { setSideScreen(true); setMoreadj(true); }}>
                <img className="icon profile_chat_img" src="uploads/img.png" alt="" />
                <span className="bold">{selectedChat.username}</span>
              </div>}
            </div>

            <div className="center gap10">
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
            {More && <div className={Moreadj ? "more_options more_option_adjusted" : "more_options"}>
              <div className="box nopadding more_items" onClick={()=>{
                toggleNeration()
                }}>
                <div className="bold">{Neration?
                <div className="neration flexrow center"><HiMiniSpeakerXMark className="icon_search"/>Narration OFF</div>
                
                : <div className="neration flexrow "><HiMiniSpeakerWave className="icon_search"/>Narration ON</div>
                
                }</div>
              </div>
            </div>}

            {/* {messages.map((el, i) => <p className="msg " key={i}>{el}</p>)} */}
            {messages.length>0 && messages.map((el, i) => <p className="msg " key={i}>{el.messageBody}</p>)}


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
        <SideScreenPersonalFn data={{ "image": selectedChat?.image, "username": selectedChat?.username }} handleClick={() => { setSideScreen(false); setMoreadj(false); }} />
      </div>}
    </>
  );
}
export default PersonalMsgScreen;
