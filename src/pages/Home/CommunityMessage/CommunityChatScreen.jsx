// 
import React, { useEffect, useState, useRef } from "react";
import { CgSearch } from "react-icons/cg";
import { MdForward, MdTranslate, MdDelete, MdClose, MdArrowBack, MdMoreVert, MdOutlineImage, MdSend, MdOutlineKeyboardVoice, MdOutlineInsertEmoticon, MdVideoFile } from "react-icons/md";
import GroupList from "../Functions/GroupList";
import { HiMiniSpeakerXMark, HiMiniSpeakerWave } from "react-icons/hi2";
import UpperChatInfo from "../Functions/UpperChatInfo";
import Menu from "../Functions/Menu/menu";
import SideScreenCommunityDetailsFn from "../Functions/SideScreen_ComunityDetails";
import SideScreenCommunityMemberFn from "../Functions/SideScreen_communityMember";
import axios from "axios";
import { io } from "socket.io-client"
import { FaCirclePlay, FaMicrophone } from "react-icons/fa6";
function CommunityMsgScreen({ setIndividualCommunity, setViewChat, ViewChat, screen, create, individualCommunity, selectedCommunityName, setSelectedCommunityName, selectedCommunity, setSelectedCommunity, selectedCommunityStatus, setselectedCommunityStatus }) {
  
  const [error, seterror] = useState("");
  const [listening, setListening] = useState(false);
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
  const [Translate, set_Translate] = useState(false);
  const [messageTtext, setmessageTtext] = useState("");
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    setLanguage(userdata.language)
    fetchProfileUpdate()

  }, []);

  const openImageViewer = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };
  const profilePicture = userdata.profilePicture
  useEffect(() => {
    setTimeout(() => {
      if (chatAreaRef.current) {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
      }
    }, 100);
  }, [messages, scrollPosition]);


  async function onclick(id, name, desc, icon) {
    setViewChat(true);
    setSelectedCommunityName(name);
    setselectedCommunityStatus(desc);
    setSelectedCommunityIcon(icon)
    // console.log(selectedCommunity);
    setSelectedCommunity(id)
    console.log(id);

  }
  useEffect(() => {
    async function get_c_messages() {
      try {
        const response = await axios.post('/get_c_messages', { c_id: selectedCommunity })
        console.log(response.data.chats.messages);
        const msgs = response.data.chats.messages
        console.log("msgs-open"); console.log(msgs);
        if (msgs.length > 0) {
          setMessages(response.data.chats.messages)
          console.log("msgs"); console.log(msgs); console.log(typeof (msgs)); console.log(msgs.length);
        } else {
          setMessages({})
          console.log("blank-msgs"); console.log(msgs); console.log(typeof (msgs));
        }
        //console.log(messages);
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

    });

    return () => {
      newSocket.disconnect();
      console.log('Disconnected from the server');
    };
  }, [allCommunityMessages]);

  // var [ViewChat, setViewChat] = useState(false);
  var [SideScreen, setSideScreen] = useState(false);
  var [selectedChat, setSelectedChat] = useState(null);
  const [selectedCommunityIcon, setSelectedCommunityIcon] = useState(null)
  const toggleMore = () => {
    setMore(prevState => !prevState);
  };

  var [Member, setMember] = useState(false);
  var [text, setText] = useState("");

  const send = async () => {

    if (text.trim().length > 0 && selectedCommunity) {
      const messageData = { c_id: selectedCommunity, message: text, u_id: localStorage.getItem('userid'), u_name: localStorage.getItem('username'), profilePicture: profilePicture };
      // console.log(messageData);
      if (socket) {
        socket.emit('sendMessage', messageData);
        // setMessages((prev) => [...prev, messageData]);
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
    setmessageTtext("");
    set_Translate(false);
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
  const fileVideoInputRef = useRef(null);

  const sendimage = () => {
    fileInputRef.current.click();

  };
  const sendvideo = () => {
    fileVideoInputRef.current.click();

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
        let newmessage = {
          messagetype: 'image',
          u_name: userdata.username,
          filename: response.data.filename,

        }
        setMessages([...messages, newmessage])

      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  const handleFileVideoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('video', file);
        formData.append('u_name', userdata.username);
        formData.append('c_id', selectedCommunity);
        formData.append('u_id', userdata._id);
        const response = await axios.post('/community_upload_video', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response);
        let newmessage = {
          messagetype: 'video',
          u_name: userdata.username,
          filename: response.data.filename,

        }
        setMessages([...messages, newmessage])
      } catch (error) {
        console.error('Error uploading video:', error);
      }
    }
  };


  const toggleTranslation = () => {
    set_Translate(prevState => !prevState);
  }
  const handleTranslate = () => {
    axios.post('/convert', {
      input_text: messageTtext,
      to_lang: language
    })
      .then(response => {
        setmessageTtext(response.data.translated_text);
      })
      .catch(error => {
        console.error('Error:', error);
        console.log('Error occurred while translating');
      });

  }
  async function fetchProfileUpdate() {
    const u_id = localStorage.getItem('userid')
    try {
      const response = await axios.post("/fetchProfile", { u_id: u_id, })


      setLanguage(response.data.language)
    } catch (error) {
      console.log("error fetching Status")
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleListen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser');
      setListening(true);
      seterror("'Speech recognition not supported in this browser'")
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      
    };

    recognition.onresult = event => {
      const question = event.results[0][0].transcript;
      setText(question);
     
    };

    recognition.onerror = event => {
      console.error('Speech recognition error detected: ', event.error);
      setListening(true);
      seterror(event.error);
    };

    recognition.start();
  };

  ///////////////////////////////////////////////////////////////////////////
  ////////////////////////////messageforward////////////////////////////////////////
  const [friendList, setFriendList] = useState([])
  const [CommunityList, setCommunityList] = useState([]);

  const [Selectedrecipients, setSelectedRecipients] = useState([]);
  const [ForwardMessage, setForwardMessage] = useState("");
  const [handleForward_el, sethandleForward_el] = useState("");

  const [forwarding, setForwarding] = useState(false);

  async function fetchfriends() {
    try {
      const response = await axios.post('/getfriendlist', { friendids: userdata.friends })
      setFriendList(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  async function fetchcommunities() {
    try {
      console.log("❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️", userdata.communities);
      const response = await axios.post('/getCommunitylist', { communityids: userdata.communities })
      setCommunityList(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {

    fetchcommunities();
    fetchfriends();
  }, [])

  const handleForward = async (message) => {
    try {
      setForwarding(false);
      await axios.post('/MessageForward', {
        message: ForwardMessage,
        forwardTo: Selectedrecipients,
        u_id: localStorage.getItem('userid'),
        u_name: username,
        profilePicture: profilePicture
      });

    } catch (error) {
      console.error('Error forwarding message:', error);

    }
  };
  const handleCheckboxChange = (event, memberId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRecipients(prevState => [...prevState, memberId]);
    } else {
      setSelectedRecipients(prevState => prevState.filter(id => id !== memberId));

    }
  };



  //////////////////////////////////////////////////////////////////////////////////

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
            <div className="chat_info" onClick={() => onclick(el._id, el.communityName, el.description, el.communityIcon)}>
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

      <div className="section2 box ">


        {ViewChat ?
          <>
            {/* upperchats component */}
            <div className="box upper_chatroom_padding flexrow spacebetween">
              <div className="center gap10">

                <MdArrowBack className="icon nobordershadow" onClick={() => { setViewChat(false); setSideScreen(false); }} color="" />

                {/* {<UpperChatInfo data={{ "image": selectedChat.image, "username": selectedChat.groupname, "status": () => { setSideScreen(true);setMoreadj(true);setMember(false); } }} />} */}
                {<UpperChatInfo data={{ selectedCommunityIcon, individualCommunity, selectedCommunityName }} actions={{ setSelectedCommunity }} sidescreen={() => { setSideScreen(true); setMoreadj(true); setMember(false); }} />}

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

            <div className="box chat_area padding10 overlay_section2_mid " ref={chatAreaRef}>
              {forwarding && <div className="center overlay">
                <div className="box create center flexcolumn">
                  <span className="bold"> Forward Message </span>
                  <div className="name_members center flexcolumn">
                    <span className="bold"> To Friends...</span>

                    <div className="groupname flexrow center">
                      <CgSearch className="icon_search" />
                      <input type="text" />
                    </div>
                    <div className="box padding10 create_gp_Members ">

                      {friendList && friendList.map((elem, key) => (
                        <div className="member_box flexrow" onClick={() => { }}>
                          <input type="checkbox" onChange={(e) => handleCheckboxChange(e, elem._id)} />
                          <img src={`/uploads/profilePictures/${elem.profilePicture}`} className="icon_member" />
                          <span className="bold pointer">{elem.username}</span>
                        </div>
                      ))
                      }

                    </div>
                  </div>
                  <div className="name_members center flexcolumn">
                    <span className="bold"> To Community....</span>

                    <div className="groupname flexrow center">
                      <CgSearch className="icon_search" />
                      <input type="text" />
                    </div>
                    <div className="box create_gp_Members">

                      {CommunityList && CommunityList.map((elem, key) => (
                        <div className="member_box flexrow" onClick={() => { }}>
                          <input type="checkbox" onChange={(e) => handleCheckboxChange(e, elem._id)} />
                          <img src={`uploads/communityIcons/${elem.communityIcon}`} className="icon_member" />
                          <span className="bold pointer">{elem.communityName}</span>
                        </div>
                      ))
                      }

                    </div>
                  </div>


                  <div className="txtbtn flexrow gap20">
                    <span className="bold pointer txtbtn_clr" onClick={() => { setForwarding(false) }}>Cancel</span>
                    <span className="bold pointer txtbtn_clr" onClick={() => { handleForward(handleForward_el) }}>Forward</span>
                  </div>

                </div>
              </div>}
              {listening&&<div class="alert alert-success">
                <strong>error!</strong> {error}
                <MdClose onClick={()=>{setListening(false);seterror("")}}/>
              </div>}
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
                            <div className="message_items" onClick={() => {
                              sethandleForward_el(el);
                              setForwarding(true);
                              setForwardMessage(el.message);
                              fetchcommunities()
                            }}>
                              <div className="neration flexrow violetHover"><MdForward className="icon_search" />
                                <span className="bold padding5">Forward</span>
                              </div>
                            </div>
                            <div className="message_items" onClick={() => {
                              //  handleDelete(el) 
                            }}>
                              <div className="neration flexrow redHover_elmt"><MdDelete className="icon_search" />
                                <span className="bold padding5">Delete</span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className={el.u_name === username ? " flex flexrow " : " flex flexrow"}>
                          {el.messagetype === "image" && (
                            <Image
                              src={`uploads/communityMessageImages/${el.filename}`}
                            />
                          )}

                          {el.messagetype === "video" && (
                            <Video src={`uploads/communityMessageVideos/${el.filename}`}
                            />
                          )}

                          {el.messagetype !== "image" && el.messagetype !== "video" && (
                            <p
                              className="msg"
                              onMouseEnter={() => { Neration && startHoverTimer(el.message) }}
                              onMouseLeave={cancelHoverTimer}
                              onContextMenu={(e) => handleContextMenu(e, el)}
                            >

                              {el?.forwarded === true ? <p className="light">forwarded</p> : <></>}
                              {Translate && selectedMessage === el ? messageTtext : el.message}
                            </p>
                          )}

                          <div className="flex flexcolumn center">
                            <img src={`uploads/profilePictures/${el.profilePicture}`} className="icon_search circle" alt="" srcSet="" onClick={() => { setSelectedUser({ username: el.u_name, userid: el.u_id }); setMember(true); setSideScreen(true) }} />
                            <p className="bold">{el.u_name}</p>
                          </div>
                        </div>
                      </div>
                      :
                      <div className="flex flexrow gap10" >

                        <div className={el.u_name === username ? " msg-rightside flex flexrow " : " flex row_revese"}>
                          {el.messagetype === "image" && (
                            <Image
                              src={`uploads/communityMessageImages/${el.filename}`}
                            />
                          )}

                          {el.messagetype === "video" && (
                            <Video src={`uploads/communityMessageVideos/${el.filename}`} />
                          )}

                          {el.messagetype !== "image" && el.messagetype !== "video" && (
                            <p
                              className="msg"
                              onMouseEnter={() => { Neration && startHoverTimer(el.message) }}
                              onMouseLeave={cancelHoverTimer}
                              onContextMenu={(e) => handleContextMenu(e, el)}
                            >
                              {el?.forwarded === true ? <p className="light">forwarded</p> : <></>}
                              {Translate && selectedMessage === el ? messageTtext : el.message}
                            </p>
                          )}
                          <div className="flex flexcolumn center">
                            <img src={`uploads/profilePictures/${el.profilePicture}`} className="icon_search circle" alt="" srcSet="" onClick={() => { setSelectedUser({ username: el.u_name, userid: el.u_id }); setMember(true); setSideScreen(true) }} />
                            <p className="bold">{el.u_name}</p>
                          </div>
                        </div>
                        {rightclk && selectedMessage === el && (
                          <div className="message_options center">
                            <div className="message_items" onClick={() => {
                              sethandleForward_el(el);
                              setForwarding(true);
                              setForwardMessage(el.message);
                              fetchcommunities()
                            }}>
                              <div className="neration flexrow violetHover"><MdForward className="icon_search" />
                                <span className="bold padding5">Forward</span>
                              </div>
                            </div>
                            <div className="message_items" onClick={() => {
                              // handleDelete(el) 
                            }}>
                              <div className="neration flexrow redHover_elmt"><MdDelete className="icon_search" />
                                <span className="bold padding5">Delete</span>
                              </div>
                            </div>
                            <div className="message_items" onClick={() => { handleTranslate(); toggleTranslation() }}>
                              <div className="neration flexrow violetHover"><MdTranslate className="icon_search" />
                                <span className="bold padding5">Translate</span>
                              </div>
                            </div>
                          </div>
                        )}
                        {/* {forwarding && (
                          <div className="box">
        
                            {recipients.map((recipient) => (
                              <div key={recipient.id} className="recipient" onClick={() => handleRecipientSelect(recipient)}>
                                {recipient.name}
                              </div>
                            ))}
                          </div>
                        )} */}
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
                  <FaMicrophone className="icon icon_small nobordershadow" onClick={handleListen} style={{ cursor: 'pointer' }} />
                  <MdOutlineInsertEmoticon className="icon icon_small nobordershadow" />
                  <input type="file" accept="video/*" ref={fileVideoInputRef} style={{ display: 'none' }} onChange={handleFileVideoChange} />
                  <MdVideoFile className="icon icon_small nobordershadow" onClick={sendvideo} />
                  <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

                  <MdOutlineImage className="icon icon_small nobordershadow" onClick={sendimage} />
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
        {Member ? <SideScreenCommunityMemberFn selectedUser={selectedUser} handleClick={() => { setSideScreen(false); setMoreadj(false); }} member={() => { setMember(false) }} />
          :
          <SideScreenCommunityDetailsFn data={{ selectedCommunityIcon, individualCommunity, "selectedCommunityName": selectedCommunityName, "description": selectedCommunityStatus, selectedCommunity }} actions={{ setIndividualCommunity, setSelectedCommunity, setViewChat, setSideScreen }} member={() => { setMember(true); }} handleClick={() => { setSideScreen(false); setMoreadj(false); }} />}

      </div>}
    </>
  );

}
export default CommunityMsgScreen;


function Video({ src }) {
  const [open, setOpen] = useState(false);
  return open ? <div className="videoPlayer">
    <video src={src} controls={true} />
    <MdClose size={50} color="#fff" className="close-button" onClick={() => { setOpen(false) }} />
  </div> :
    <div className="center" style={{ position: "relative", width: '300px', height: '300px' }} onClick={() => setOpen(true)}>
      <FaCirclePlay color="#fff" size={50} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
      <video style={{ width: '300px', height: '300px' }} src={src} controls={false} onClick={() => setOpen(true)} />
    </div>
}
function Image({ src }) {
  const [open, setOpen] = useState(false);
  return open ? <div className="videoPlayer">
    <img src={src} />
    <MdClose size={50} color="#fff" className="close-button" onClick={() => { setOpen(false) }} />
  </div> :
    <img style={{ width: '300px', height: '300px' }} src={src} onClick={() => setOpen(true)} />
}

