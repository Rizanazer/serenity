// 
import React, { useEffect, useState, useRef } from "react";
import { CgSearch } from "react-icons/cg";
import { MdTranslate, MdDelete, MdClose, MdArrowBack, MdMoreVert, MdOutlineImage, MdSend, MdOutlineKeyboardVoice, MdOutlineInsertEmoticon } from "react-icons/md";
import GroupList from "../Functions/GroupList";
import { HiMiniSpeakerXMark, HiMiniSpeakerWave } from "react-icons/hi2";
import UpperChatInfo from "../Functions/UpperChatInfo";
import Menu from "../Functions/Menu/menu";
import SideScreenCommunityDetailsFn from "../Functions/SideScreen_ComunityDetails";
import SideScreenCommunityMemberFn from "../Functions/SideScreen_communityMember";
import axios from "axios";
import { io } from "socket.io-client"
function CommunityMsgScreen({ setIndividualCommunity, setViewChat, ViewChat, screen, create, individualCommunity, selectedCommunityName, setSelectedCommunityName, selectedCommunity, setSelectedCommunity, selectedCommunityStatus, setselectedCommunityStatus }) {

  const userdata = JSON.parse(localStorage.getItem('userdata'));
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [allCommunityMessages, setAllCommunityMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  var [rightclk, setrightclk] = useState(false);
  const hoverTimer = useRef(null);
  const [hoveredMessage, setHoveredMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState({ username: '', userid: '' });
  const username = localStorage.getItem('username');
  const [scrollPosition, setScrollPosition] = useState(0);
  const chatAreaRef = useRef(null);
  var [messages, setMessages] = useState([]);
  const [ChatSearch, SetChatSearch] = useState(false);
  var [SideScreen, setSideScreen] = useState(false);
  var [selectedChat, setSelectedChat] = useState(null);
  const [More, setMore] = useState(false);
  const [Moreadj, setMoreadj] = useState(false);
  var [Member, setMember] = useState(false);
  var [text, setText] = useState("");
  const [Neration, setNeration] = useState(false);
  const [Deletefn, setDeletefn] = useState(false);
  const [chatId,setChatId] = useState(null)
  const openImageViewer = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };
  const profilePicture  = userdata.profilePicture
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

  // var [ViewChat, setViewChat] = useState(false);
  var [SideScreen, setSideScreen] = useState(false);
  var [selectedChat, setSelectedChat] = useState(null);

  const toggleMore = () => {
    setMore(prevState => !prevState);
  };

  var [Member, setMember] = useState(false);
  var [text, setText] = useState("");

  const send = async () => {
    console.log(text);
    if (text.trim().length > 0 && selectedCommunity) {
      const messageData = { c_id: selectedCommunity, message: text, u_id: localStorage.getItem('userid'), u_name: localStorage.getItem('username') ,profilePicture:profilePicture};
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
  const toggleDeletefn = () => {
    setDeletefn(prevState => !prevState);
  };

  const handleContextMenu = (e, message) => {
    e.preventDefault(); // Prevent default context menu
    togglerightclick(); // Set rightclk state to true
    setSelectedMessage(message); // Set the selected message
  };

  const togglerightclick = () => {
    setrightclk(prevState => !prevState);
  };

  const deleteMessage = async (m_id) => {
    setrightclk(false);
  };

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

  const fileInputRef = useRef(null);

  const sendimage = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('u_name', userdata.username);
        formData.append('c_id', selectedCommunity);
        formData.append('u_id', userdata._id);
        const response = await axios.post('/community_upload_image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setMessages({...messages.response.data})
      //   console.log("formdata------------------------------------------------");
      //   console.log(Object.fromEntries(formData));
      //   socket.emit('send-image-community', formData);
      // // Handle the response from the server as needed
      //   socket.on('send-image-community', (response) => {
      //   console.log('Image uploaded successfully:', response);
      // });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
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
              <img className="icon profile_chat_img" src={`uploads/communityIcons/${el.communityIcon}`} alt="" />
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
              {More && <div className={Moreadj ? "more_options more_option_adjusted" : "more_options"}>
                <div className=" nopadding more_items " onClick={() => {
                  toggleNeration()
                }}>
                  <div className="bold">{Neration ?
                    <div className="neration flexrow"><HiMiniSpeakerXMark className="icon_search" />Narration OFF</div>

                    : <div className="neration flexrow "><HiMiniSpeakerWave className="icon_search" />Narration ON</div>

                  }</div>
                </div>
              </div>}



              {messages && messages.map((el, i) => (
                <React.Fragment key={i}>
                  {
                    rightclk && el.u_name === username ?
                      <div className="flex flexrow gap10 msg-rightside" >
                        {rightclk && selectedMessage === el && (
                          <div className="message_options center option-rightside">
                            <div className="message_items" onClick={() => { }}>
                              <div className="neration flexrow redHover_elmt"><MdDelete className="icon_search" />
                                <span className="bold padding5">delete</span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className={el.u_name === username ? " flex flexrow " : " flex flexrow"}>
                          {(el.messagetype==="image")?
                          <img src={`uploads/communityMessageImages/${el.filename}`} style={{ width: '300px', height: '300px' }} onClick={() => window.open(`uploads/communityMessageImages/${el.filename}`,'_blank')}/>
                          :<p
                            className="msg"
                            onMouseEnter={() => { Neration && startHoverTimer(el.message) }}
                            onMouseLeave={cancelHoverTimer}
                            onContextMenu={(e) => handleContextMenu(e, el)}
                          >
                            {el.message}
                          </p>}
                          <div className="flex flexcolumn center">
                            <img src={`uploads/profilePictures/${el.profilePicture}`} className="icon_search circle" alt="" srcSet="" onClick={() => { setSelectedUser({ username: el.u_name, userid: el.u_id }); setMember(true); setSideScreen(true) }} />
                            <p className="bold">{el.u_name}</p>
                          </div>

                        </div>

                      </div>
                      :
                      <div className="flex flexrow gap10" >

                        <div className={el.u_name === username ? " msg-rightside flex flexrow " : " flex row_revese"}>
                          {(el.messagetype==="image")?
                          <img src={`uploads/communityMessageImages/${el.filename}`} style={{ width: '300px', height: '300px' }} />
                          :<p
                            className="msg"
                            onMouseEnter={() => { Neration && startHoverTimer(el.message) }}
                            onMouseLeave={cancelHoverTimer}
                            onContextMenu={(e) => handleContextMenu(e, el)}
                          >
                            {el.message}
                          </p>}
                          <div className="flex flexcolumn center">
                            <img src={`uploads/profilePictures/${el.profilePicture}`} className="icon_search circle" alt="" srcSet="" onClick={() => { setSelectedUser({ username: el.u_name, userid: el.u_id }); setMember(true); setSideScreen(true) }} />
                            <p className="bold">{el.u_name}</p>
                          </div>
                        </div>
                        {rightclk && selectedMessage === el && (
                          <div className="message_options center">
                            <div className="message_items">
                              <div className="neration flexrow redHover_elmt"><MdDelete className="icon_search" />
                                <span className="bold padding5">delete</span>
                              </div>
                            </div>
                            <div className="message_items" onClick={() => { }}>
                              <div className="neration flexrow violetHover"><MdTranslate className="icon_search" />
                                <span className="bold padding5">translate</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                  }
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
                  <input type="file"accept="image/*" ref={fileInputRef}style={{ display: 'none' }}onChange={handleFileChange}/>
                  <MdOutlineImage className="icon icon_small nobordershadow" onClick={sendimage}/>
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
          <SideScreenCommunityDetailsFn data={{ individualCommunity, "selectedCommunityName": selectedCommunityName, "description": selectedCommunityStatus, selectedCommunity }} actions={{ setIndividualCommunity, setSelectedCommunity, setViewChat, setSideScreen }} member={() => { setMember(true); }} handleClick={() => { setSideScreen(false); setMoreadj(false); }} />}

      </div>}
    </>
  );
}
export default CommunityMsgScreen;