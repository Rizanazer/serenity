// 
import React, { useEffect, useState, useRef } from "react";
import { CgSearch } from "react-icons/cg";
import { MdOutlineMenu, MdClose, MdArrowBack, MdMoreVert, MdOutlineImage, MdSend, MdOutlineKeyboardVoice, MdOutlineInsertEmoticon } from "react-icons/md";
import GroupList from "../Functions/GroupList";
import UpperChatInfo from "../Functions/UpperChatInfo";
import Menu from "../Functions/Menu/menu";
import SideScreenCommunityDetailsFn from "../Functions/SideScreen_ComunityDetails";
import SideScreenCommunityMemberFn from "../Functions/SideScreen_communityMember";
import axios from "axios";
import { io } from "socket.io-client"
function CommunityMsgScreen({ setViewChat, ViewChat, screen, create, individualCommunity, selectedCommunityName, setSelectedCommunityName, selectedCommunity, setSelectedCommunity, selectedCommunityStatus, setselectedCommunityStatus }) {

  const userdata = JSON.parse(localStorage.getItem('userdata'))

  const [allCommunityMessages, setAllCommunityMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const [selectedUser, setSelectedUser] = useState({ username: '', userid: '' })
  const username = localStorage.getItem('username')
  const [scrollPosition, setScrollPosition] = useState(0);
  const chatAreaRef = useRef(null);
  var [messages, setMessages] = useState([]);
  console.log(individualCommunity)
  useEffect(() => {
    // Ensure chatAreaRef.current is not null before attempting to scroll
    setTimeout(() => {
      if (chatAreaRef.current) {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
      }
    }, 100);
  }, [messages, scrollPosition]);


  async function onclick(id, name, desc) {
    setViewChat(true);
    setSelectedCommunityName(name);
    setselectedCommunityStatus(desc);
    // console.log(selectedCommunity);
    setSelectedCommunity(id)
    console.log(id);

  }
  useEffect(() => {
    async function get_c_messages() {
      try {
        const response = await axios.post('/get_c_messages', { c_id: selectedCommunity })
        console.log(response.data.chats.messages);
        setMessages(response.data.chats.messages)
        console.log(messages);
      } catch (error) {
        console.log("error in fetching selected community messages")
      }
    }
    get_c_messages()
  }, [selectedCommunity])

  useEffect(() => {
    const newSocket = io('http://:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to the server socket');
    });

    newSocket.on('newMessage', (message) => {

      const appenddata = { "u_id": message.u_id, "u_name": message.u_name, "message": message.message }
      setMessages((prev) => [...prev, appenddata])
      // console.log('New message from the server socket:', message);
      // const updatedMessages = [...allCommunityMessages];
      // updatedMessages.forEach((elem)=>{
      //   if(elem.communityId === message.c_id){
      //     const appenddata = {"u_id":message.u_id,"u_name":message.u_name,"message":message.message}
      //     elem.messages.push(appenddata);
      //   }
      //   setAllCommunityMessages(updatedMessages)
      // })
    });

    return () => {
      newSocket.disconnect();
      console.log('Disconnected from the server');
    };
  }, [allCommunityMessages]);
  const [ChatSearch, SetChatSearch] = useState(false);
  // var [ViewChat, setViewChat] = useState(false);
  var [SideScreen, setSideScreen] = useState(false);
  var [selectedChat, setSelectedChat] = useState(null);
  const [More, setMore] = useState(false);
  const toggleMore = () => {
    setMore(prevState => !prevState);
  };
  const [Moreadj, setMoreadj] = useState(false);
  var [Member, setMember] = useState(false);
  var [text, setText] = useState("");

  const send = async () => {
    console.log(text);
    if (text.trim().length > 0 && selectedCommunity) {
      const messageData = { c_id: selectedCommunity, message: text, u_id: localStorage.getItem('userid'), u_name: localStorage.getItem('username') };
      console.log(messageData);
      if (socket) {
        socket.emit('sendMessage', messageData);
        setMessages((prev) => [...prev, messageData]);

        // updationToggleFunc()
        console.log(`sendfunc`);
        console.log(allCommunityMessages);
        console.log(`///`);
        console.log(messageData);
        const appenddata = { u_id: localStorage.getItem('userid'), u_name: localStorage.getItem('username'), message: text.trim() };
        // setCommunityMessages(prevMessages => [...prevMessages, appenddata]);
        setText("");
        setScrollPosition(scrollPosition + 1);
      }
      // setMessages([...messages, text]);

      setAllCommunityMessages(prevCommunityMessages => {
        const index = prevCommunityMessages.findIndex(chat => selectedCommunity === messageData.c_id);
        if (index !== -1) {
          const updatedCommunityMessages = [...prevCommunityMessages];
          updatedCommunityMessages[index].messages.push(messageData);
          return updatedCommunityMessages;
        } else {
          return [...prevCommunityMessages, { communityId: selectedCommunity, messages: [messageData] }];
        }
      });
    }
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
      <div className="section1 section_margin box">
        <div className="box searchbox flexrow spacebetween">
          <input type="text" placeholder="Search for Existing Chats" className="nobordershadow widthmax" onChange={() => { }} />
          <Menu setScreen={screen} setCreateAlert={create} />
        </div>
        {/* {GroupName.map((el, i) => <GroupList data={el} key={i} HandleClick={() => { setSelectedChat(el) }} />)} */}
        {individualCommunity.map((el, i) =>
          // <GroupList data={{el,selectedCommunity,allCommunityMessages,chatByCommunity}} key={i} actions={{setChatByCommunity,setViewChat,setSelectedCommunity,setSelectedCommunityName}}/>

          <div className="box chat pointer ">
            <div className="chat_info" onClick={() => onclick(el._id, el.communityName, el.description)}>
              <img className="icon profile_chat_img" alt="" />
              <div className=" profile_text">
                <div className="textlength_head ">
                  <span className="bold ">{el.communityName}</span>
                </div>
                <div className="textlength_para ">
                  <span className="light ">{el.message}</span>
                </div>
              </div>
            </div>
            {/* {data.status && <span className="light">joined</span>} */}
          </div>
        )}

      </div>

      <div className="section2 box">
        {ViewChat ?
          <>
            {/* upperchats component */}
            <div className="box upper_chatroom_padding flexrow spacebetween">
              <div className="center gap10">

                <MdArrowBack className="icon nobordershadow" onClick={() => { setViewChat(false); setSideScreen(false); }} color="" />

                {/* {<UpperChatInfo data={{ "image": selectedChat.image, "username": selectedChat.groupname, "status": () => { setSideScreen(true);setMoreadj(true);setMember(false); } }} />} */}
                {<UpperChatInfo data={{ individualCommunity, selectedCommunityName }} actions={{ setSelectedCommunity }} sidescreen={() => { setSideScreen(true); setMoreadj(true); setMember(false); }} />}

              </div>

              <div className="center gap10">
                <div className="box center nobordershadow nopadding spacebetween flexrow ">
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

                <MdMoreVert className="icon nobordershadow" color="" onClick={toggleMore} />

              </div>
            </div>

            {/* middlechats component-chat_area */}
            {/* //onClick={()=>(console.log(allCommunityMessages.map(s=>s.messages.map(t=>t.message))))} */}
            <div className="box chat_area padding10" ref={chatAreaRef}>
              {More && <div className={Moreadj ? "more_options more_option_adjusted" : "more_options"}></div>}
              {/* {messages.map((el, i) => <div className="msg_main">
                  <img src="images/profileimg_chat.jpg"className="icon_search circle" alt="" srcset="" onClick={()=>{setMember(true);setSideScreen(true)}}/>
                  <p className="msg " key={i}>{el}</p>
                  </div>)} */}


              {messages && messages.map((el, i) => (
                <div className="msg_main" key={i}>
                  {el.u_name !== username ? <>
                    <img src="images/profileimg_chat.jpg" className="icon_search circle" alt="" srcset="" onClick={() => { setSelectedUser({ username: el.u_name, userid: el.u_id }); setMember(true); setSideScreen(true) }} />
                    <p className="uname-msg">{el.u_name}</p>
                    <p className={el.u_name === username ? "msg-rightside" : "msg"}>{el.message}</p></> :
                    <>
                      <p className="msg-rightside" style={{ marginRight: '5px' }}>{el.message}</p>
                      <p className="uname-msg">{el.u_name}</p>
                      <img src="images/profileimg_chat.jpg" className="icon_search circle" alt="" srcset="" onClick={() => { setSelectedUser({ username: el.u_name, userid: el.u_id }); setMember(true); setSideScreen(true) }} />
                    </>}
                </div>
              ))}




              {/* {chatByCommunity.map((m)=><p>{m.communityId}</p>)} */}
              {/* {allCommunityMessages.map(community => {
                if (selectedCommunity === community.communityId) {
                  return community.messages.map(message => (
                    <div className="msg_main">
                  <img src="images/profileimg_chat.jpg" className="icon_search circle"  alt=""  srcset="" onClick={()=>{setSelectedUser({username:message.u_name,userid:message.u_id });setMember(true);setSideScreen(true)}}/>
                    <p className="uname-msg">{message.u_name}</p>
                    <p className="msg" key={message.u_id}>{message.message}</p>
                    </div>
                  ));
                } else {
                  return null; 
                }
              })} */}
              {/* {communityMessages.map(message => {
                if (message) {
                  return  (
                    <div className="msg_main">
                  <img src="images/profileimg_chat.jpg"className="icon_search circle" alt="" srcset="" onClick={()=>{setMember(true);setSideScreen(true)}}/>
                    <p className="uname-msg">{message.u_name}</p>
                    <p className="msg" key={message._id}>{message.message}</p>
                    </div>
                  );
                } else {
                  return <div>no messsages</div>; 
                }
              })} */}


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
          <></>
        }
      </div>
      {SideScreen && <div className="section3 box nopadding nobordershadow">
        {Member ? <SideScreenCommunityMemberFn selectedUser={selectedUser} data={{ "image": "images/profileimg_chat.jpg", "username": "arsif" }} handleClick={() => { setSideScreen(false); setMoreadj(false); }} member={() => { setMember(false) }} />
          :
          <SideScreenCommunityDetailsFn data={{ individualCommunity, "selectedCommunityName": selectedCommunityName, "description": selectedCommunityStatus, selectedCommunity }} actions={{ setSelectedCommunity }} member={() => { setMember(true); }} handleClick={() => { setSideScreen(false); setMoreadj(false); }} />}

      </div>}
    </>
  );
}
export default CommunityMsgScreen;