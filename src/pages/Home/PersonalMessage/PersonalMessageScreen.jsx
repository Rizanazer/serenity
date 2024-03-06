import React, { useEffect, useState, useRef } from "react";
import { CgSearch } from "react-icons/cg";
import { FaCircleDot } from "react-icons/fa6";
import './personalMessage.css';
import { HiMiniSpeakerXMark, HiMiniSpeakerWave } from "react-icons/hi2";
import { MdDelete, MdClose, MdArrowBack, MdMoreVert, MdOutlineImage, MdSend, MdOutlineKeyboardVoice, MdOutlineInsertEmoticon } from "react-icons/md";
import Contact from "../Functions/Contacts";
import UpperChatInfo from "../Functions/UpperChatInfo";
import SideScreenPersonalFn from "../Functions/SideScreen_personal";
import axios from "axios";
import io from "socket.io-client";
import rightBox from "../Functions/message_rightclick/chat_rightclck";
import RightClickBox from "../Functions/message_rightclick/chat_rightclck";

function PersonalMsgScreen() {

  const userdata = JSON.parse(localStorage.getItem('userdata'))

  const [scrollPosition, setScrollPosition] = useState(0);
  const chatAreaRef = useRef(null);
  useEffect(() => {
    console.log('----------------chats----------------')
    console.log(chats);
  })
  useEffect(() => {
    // Ensure chatAreaRef.current is not null before attempting to scroll
    setTimeout(() => {
      if (chatAreaRef.current) {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
      }
    }, 100);
  }, [messages, scrollPosition]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  var [ViewChat, setViewChat] = useState(false);
  var [rightclk, setrightclk] = useState(true);
  var [SideScreen, setSideScreen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [ChatSearch, SetChatSearch] = useState(false);
  const [More, setMore] = useState(false);
  const toggleMore = () => {
    setMore(prevState => !prevState);
  };
  const userid = localStorage.getItem('userid')
  const [ContactsOnline, setContactsOnline] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [Moreadj, setMoreadj] = useState(false);
  const u_id = localStorage.getItem('userid');
  const [Friends, setFriends] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null)
  const alluserdatastring = localStorage.getItem('userdata')
  const friends = JSON.parse(alluserdatastring).friends
  const username = localStorage.getItem('username')
  const [mySocket, setMySocket] = useState(null)
  var [text, setText] = useState("");
  const hoverTimer = useRef(null);
  const [chats, setChats] = useState([])
  const [hoveredMessage, setHoveredMessage] = useState("");
  const [Deletefn, setDeletefn] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [selectedFriendName, setSelectedFriendName] = useState(null)
  const [chatId,setChatid] = useState(null)
  useEffect(() => {
    console.log("selectedChat")
    console.log(selectedChat)
  }, [selectedChat])
  useEffect(() => {
    const socket = io('http://:3000');
    setMySocket(socket)
    socket.on('recieve_p_message', (message) => {
      // console.log(message);
      console.log(messages)
      const newmessage = message
      setMessages((prev) => [...prev, newmessage])
    })
  }, [])

  async function fetchfriends() {
    const u_id = localStorage.getItem('userid')

    try {
      const response = await axios.post("/fetchfriends", { u_id: u_id, friendids: userdata.friends })
      setContacts(response.data.frienddata.flat())
      setChats(response.data.chats)
      setFriends(userdata.friends.length);
    } catch (error) {
      console.log("error fetching friends")
    }
  }
  useEffect(() => {
    fetchfriends()
  }, [])

  //delete chat fn
  const toggleDeletefn = () => {
    setDeletefn(prevState => !prevState);
  };
  const handleDeleteChat = async (f_id) => {

    try {
      const response = await axios.post('/delete_p_chat', { u_id: u_id, f_id: f_id });
      fetchfriends();
      setViewChat(false);
    } catch (error) {
      console.log("error deleting")
    }

    console.log("Delete chat button clicked");
  };

  //speechtotext fn
  const [Neration, setNeration] = useState(false);
  const speakText = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
  };
  const startHoverTimer = (message) => {
    hoverTimer.current = setTimeout(() => {
      setHoveredMessage(message);
      speakText(message);
    }, 500);
  };

  const cancelHoverTimer = () => {
    clearTimeout(hoverTimer.current);
  };
  const toggleNeration = () => {
    setNeration(prevState => !prevState);
  };
  //texttospeech

  var [messages, setMessages] = useState([]);

  async function onclickfriendchat(friend, friendname) {
    console.log(friend)
    setViewChat(true)
    setSelectedFriend(friend)
    setSelectedFriendName(friendname)
    try {
      const response = await axios.post('/fetchpersonal', { f_id: friend, u_id: u_id, f_name: friendname })
      console.log(friend);
      setChatid(response.data.chats._id)
      console.log(response.data.chats.messages);
      setMessages(response.data.chats.messages)
    } catch (error) {
      setMessages([])
      console.log('personal message fetch error')
    }

  }

  // const send1 = async () => {
  //   const trimmedText = text.trim();
  //   console.log("selectedChat");
  //   console.log(selectedChat);
  //   const senddata = { "fromname": username, "from": u_id, "toname": selectedChat.username, "to": selectedChat.userid, "message": trimmedText }
  //   mySocket.emit("send_p_message", senddata);
  //   setText("");
  //   setScrollPosition(scrollPosition + 1);
  // }

  const send = async () => {
    const trimmedText = text.trim();
    console.log("selectedChat");
    console.log(selectedChat);
    const senddata = { "fromname": username, "from": u_id, "toname": selectedFriendName, "to": selectedFriend, "message": trimmedText }
    mySocket.emit("send_p_message", senddata);
    setText("");
    setScrollPosition(scrollPosition + 1);
    if (messages.length <= 1) {
      fetchfriends();
    }
  }


  async function onclickfriend(friend) {
    console.log(friend)
    setViewChat(true)
    setSelectedChat(friend)
    setSelectedFriend(friend)
    setSelectedFriendName(friend.username)
    try {
      const response = await axios.post('/fetchpersonal', { f_id: friend, u_id: u_id })
      console.log(friend);
      console.log(response.data.chats.messages);
      setMessages(response.data.chats.messages)
    } catch (error) {
      setMessages([])
      console.log('personal message fetch error')
    }
  }

  //rightclk
  const handleContextMenu = (e, message) => {
    e.preventDefault(); // Prevent default context menu
    console.log("Right-clicked on message:", message);
    togglerightclick(); // Set rightclk state to true
    setSelectedMessage(message); // Set the selected message
  };
  //delete message individual
  const deleteMessage = async(m_id) => {
    console.log('====================================');
    console.log("deleted msg : ", m_id);
    console.log('====================================');
    setrightclk(false);
    try {
      const response = await axios.post('/delete_a_personal_message',{m_id:m_id,c_id:chatId})
      if(response.data.success === true){
        const messages = await axios.post('/fetchpersonal', { f_id: selectedFriend, u_id: u_id })
        // console.log(friend);
        console.log(messages.data.chats.messages);
        setMessages(messages.data.chats.messages)
      }
    } catch (error) {
      console.log("error in deleting a message")
    }
  }
  const togglerightclick = () => {
    setrightclk(prevState => !prevState);
  };
  //enter key for send
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default form submission behavior
      send();
    }
  };
  return (
    <>
      <div className="section1 section_margin box spacebetween">

        <div className="box nobordershadow nopadding chathistory">
          <div className="box searchbox flexrow">
            <input type="text" placeholder="Search for Existing Chats" className="nobordershadow widthmax" />
            <MdDelete className="icon nobordershadow" color={Deletefn ? "#5E4AE3" : "#000"} onClick={() => { toggleDeletefn(); console.log("utasgduygeiyr"); }} />
          </div>
          {Array.isArray(chats) && chats.length > 0 ? (
            chats.map((el, i) => (
              <div className={Deletefn ? "flexrow swipe-container" : "flexrow"}>
                <div className="box chat pointer word_shrink">
                  <div
                    className="chat_info"
                    key={i}
                    onClick={() =>
                      onclickfriendchat(el.users[0].userid === userid ? el.users[1].userid : el.users[0].userid, el.users[0].userid === userid ? el.users[1].username : el.users[0].username)
                    }
                  >
                    <img className="icon profile_chat_img" src="uploads/img.png" alt="" />
                    <div className=" profile_text">
                      <div className="textlength_head ">
                        <span className="bold ">{el.users[0].username === username ? el.users[1].username : el.users[0].username}</span>
                        {/* <span className="bold ">{el.username}sssssss</span> */}
                      </div>
                      <div className="textlength_para ">
                        <span className="light">messsage lorum ipsum la about the new era of time</span>
                      </div>
                    </div>
                  </div>
                  <div className="incomingchat circle center">1</div>
                </div>
                {Deletefn && (
                  <div className="swipe-actions">
                    <button onClick={() => handleDeleteChat(el.users[0].userid === userid ? el.users[1].userid : el.users[0].userid)}>Delete</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <span className=" light center ">No chats</span>
          )}
        </div>

        <div className="box friends scrollbehaiviour_smooth">
          <div className=" searchbox friendstext spacebetween">
            <span className="bold">friends</span>
            <span className="bold">{Friends}</span>
          </div>
          <div className="box nopadding nobordershadow nogap friendslist">
            {Array.isArray(contacts) && contacts.map((el, i) =>

              <div className="box chat pointer nobordershadow ">
                <div className="chat_info" key={i} onClick={() => onclickfriend(el)}>
                  <img className="icon profile_chat_img" src="uploads/img.png" alt="" />
                  <div className=" profile_text">
                    <div className="textlength_head_friends ">
                      {/* <span className="bold ">{el.users[0].username !== username ? el.users[0].username : el.users[1].username}</span> */}
                      <span className="bold ">{el.username}</span>
                    </div>
                    <div className="textlength_status ">
                      <span className="light">status</span>
                    </div>
                  </div>
                </div>
                {ContactsOnline && <FaCircleDot className="" color="#5e4ae3" />}
              </div>

            )}
          </div>
        </div>

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
                <span className="bold">{selectedFriendName}</span>
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
          <div className="box chat_area padding10" ref={chatAreaRef}>
            {More && <div className={Moreadj ? "more_options more_option_adjusted" : "more_options"}>
              <div className="box  nopadding more_items" onClick={() => {
                toggleNeration()
              }}>
                <div className="bold">{Neration ?
                  <div className="neration flexrow"><HiMiniSpeakerXMark className="icon_search" />Narration OFF</div>

                  : <div className="neration flexrow "><HiMiniSpeakerWave className="icon_search" />Narration ON</div>

                }</div>
              </div>
            </div>}

            {messages.length > 0 && messages.map((el, i) => (
              <React.Fragment key={i}>
                {
                  rightclk && el.from.username === username ?
                  <div className="flex flexrow gap10 msg-rightside" onContextMenu={(e) => handleContextMenu(e, el)}>
                  
                  {rightclk && selectedMessage === el && (
                    <div className="message_options center option-rightside">
                      <div className="message_items" onClick={() => deleteMessage(el._id)}>
                        <div className="neration flexrow redHover_elmt"><MdDelete className="icon_search" />
                          <span className="bold padding5">delete</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <p
                    className={el.from.username === username ? "msg" : "msg"}
                    onMouseEnter={() => { Neration && startHoverTimer(el.messageBody) }}
                    onMouseLeave={cancelHoverTimer}
                  >
                    {el.messageBody}
                  </p>
                </div>
                
                
                    :
                    <div className="flex flexrow gap10" onContextMenu={(e) => handleContextMenu(e, el)}>
                      <p
                        className={el.from.username === username ? "msg msg-rightside" : "msg"}
                        onMouseEnter={() => { Neration && startHoverTimer(el.messageBody) }}
                        onMouseLeave={cancelHoverTimer}
                      >
                        {el.messageBody}
                      </p>
                      {rightclk && selectedMessage === el && (
                        <div className="message_options center ">
                          <div className="message_items  " onClick={() => deleteMessage(el._id)}>
                            <div className="neration flexrow redHover_elmt"><MdDelete className="icon_search" />
                              <span className="bold padding5">delete</span> </div>
                          </div>
                        </div>

                      )}
                    </div>
                }
                {/* <div className="flex flexrow gap10" onContextMenu={(e) => handleContextMenu(e, el)}>
                  <p
                    className={el.from.username === username ? "msg-rightside" : "msg"}
                    onMouseEnter={() => { Neration && startHoverTimer(el.messageBody) }}
                    onMouseLeave={cancelHoverTimer}
                  >
                    {el.messageBody}
                  </p>
                  {rightclk && selectedMessage === el && (
                    <div className="message_options center ">
                      <div className="message_items  " onClick={() => deleteMessage(el)}>
                        <div className="neration flexrow redHover_elmt"><MdDelete className="icon_search" />
                          <span className="bold padding5">delete</span> </div>
                      </div>
                    </div>

                  )}
                </div> */}

              </React.Fragment>
            ))}


          </div>

          {/* bottomchats component-chat_typing */}
          <div className="box center chat_typing flexrow spacebetween">
            <div className="type_message">
              <input
                type="text"
                className="nobordershadow message_length"
                onKeyPress={handleKeyPress}
                placeholder="Type Here!!"
                onChange={(event) => setText(event.target.value)}
                value={text}
              />
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
