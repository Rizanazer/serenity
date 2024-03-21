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
import Image from "../Functions/imageview";
import Video from "../Functions/videoplay";
import ErrorMessage from "../Functions/errormessage";
import handleListen from "../Functions/voicetoText";
function CommunityMsgScreen({ fetchCommunityDetails, setIndividualCommunity, setViewChat, ViewChat, screen, create, individualCommunity, selectedCommunityName, setSelectedCommunityName, selectedCommunity, setSelectedCommunity, selectedCommunityStatus, setselectedCommunityStatus }) {
  const [searchinput, setsearchinput] = useState('')
  const [profile, setProfile] = useState(null);
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
    setAnonymity(userdata.anonymity)
    setLanguage(userdata.language)

    fetchProfileUpdate()
  }, [])

  const profilePicture = userdata.profilePicture
  const [anonymity, setAnonymity] = useState(null);
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
    setSelectedCommunityIcon(icon);
    setSelectedCommunity(id);

  }


  async function get_c_messages() {
    setsearchinput('')
    try {
      const response = await axios.post('/get_c_messages', { c_id: selectedCommunity })
      const msgs = response.data.chats.messages
      if (msgs?.length > 0) {
        setMessages(response.data.chats.messages)
        //////////////////////////////////////////////////////////////////////////////////////// setAnonymsGps(response.data.)
      } else {
        setMessages([])
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    get_c_messages()
  }, [selectedCommunity])

  useEffect(() => {
    const newSocket = io('http://:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to the server socket');
    });

    newSocket.on('newMessage', async (message) => {

      const appenddata = { "u_id": message.u_id, "u_name": message.u_name, "message": message.message, "anonymity": message.anonymity, "profile": message.profilePicture }
      const tocommunity = message.c_id
      // if(selectedCommunity && selectedCommunity === tocommunity){
      // console.log(selectedCommunity);
      setMessages((prev) => [...prev, appenddata])
      // }

    });

    return () => {
      newSocket.disconnect();
      console.error('Disconnected from the server')
    };
  }, [allCommunityMessages]);
  var [SideScreen, setSideScreen] = useState(false);
  var [media, setMedia] = useState(false);
  var [selectedChat, setSelectedChat] = useState(null);
  const [selectedCommunityIcon, setSelectedCommunityIcon] = useState(null)
  const toggleMore = () => {
    setMore(prevState => !prevState);
  };
  var [Member, setMember] = useState(false);
  var [text, setText] = useState("");
  const send = async () => {
    // setProfile(userdata.profilePicture)
    if (text.trim().length > 0 && selectedCommunity) {
      const messageData = { c_id: selectedCommunity, message: text, u_id: localStorage.getItem('userid'), u_name: localStorage.getItem('username'), profilePicture: profilePicture, anonymity: anonymity };
      if (socket) {
        socket.emit('sendMessage', messageData);
        const appenddata = { u_id: localStorage.getItem('userid'), u_name: localStorage.getItem('username'), message: text.trim() };
        setText("");
        setScrollPosition(scrollPosition + 1);
      }
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
    setSelectedMessage(message);
    setmessageTtext(message.message)
    setMedia(false)
  };
  const handleContextMenuMedia = (e, event) => {
    e.preventDefault(); // Prevent default context menu
    togglerightclick();
    setSelectedMessage(event);
    setMedia(true);
    // setmessageTtext(event.filename)

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

  ////////////////////////////////////////////////////////////////////////////
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('u_name', userdata.username);
        formData.append('c_id', selectedCommunity);
        formData.append('u_id', userdata._id);
        formData.append('profilePicture', userdata.profilePicture)
        const response = await axios.post('/community_upload_image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        let newmessage = {
          messagetype: 'image',
          u_name: userdata.username,
          filename: response.data.filename,
          profilePicture: response.data.profilePicture ? response.data.profilePicture : userdata.profilePicture

        }
        setMessages([...messages, newmessage])

      } catch (error) {
        seterror('Error uploading image:', error)
        setListening(true)
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
        formData.append('profilePicture', userdata.profilePicture)
        const response = await axios.post('/community_upload_video', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        let newmessage = {
          messagetype: 'video',
          u_name: userdata.username,
          filename: response.data.filename,
          profilePicture: response.data.profilePicture ? response.data.profilePicture : userdata.profilePicture

        }
        setMessages([...messages, newmessage])
      } catch (error) {
        seterror('Error uploading video:', error)
        setListening(true)
        console.error('Error uploading video:', error);
      }
    }
  };


  const toggleTranslation = () => {
    set_Translate(prevState => !prevState);
  }
  const handleTranslate = () => {
    console.log("lan", messageTtext);
    axios.post('/convert', {
      input_text: messageTtext,
      to_lang: language

    })
      .then(response => {
        setmessageTtext(response.data.translated_text);
      })
      .catch(error => {
        console.error('Error:', error);
        seterror('Error occurred while translating', error)
        setListening(true)

      });

  }
  async function fetchProfileUpdate() {
    const u_id = localStorage.getItem('userid')
    try {
      const response = await axios.post("/fetchProfile", { u_id: u_id, })


      setLanguage(response.data.language)
    } catch (error) {
      seterror('error fetching Status')
      setListening(true)
    }
  }
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
    console.log("handleForward_el-----------------------------------------");
    console.log(handleForward_el);
    console.log("messssssssssssssssssssssssssssssssage-----------------------------------------");
    console.log(message);
    try {
      setForwarding(false);
      await axios.post('/MessageForward', {
        message: ForwardMessage,
        messageType: message?.messagetype || "", 
        forwardTo: Selectedrecipients,
        u_id: localStorage.getItem('userid'),
        u_name: username,
        profilePicture: profilePicture,
        filename:message.filename || ""
      });

    } catch (error) {
      console.error('Error forwarding message:', error);
      seterror('Error forwarding message:', error)
      setListening(true)

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
  ////////////////////////search chat message begin////////////////

  useEffect(() => {
    async function searchcommunitychat() {
      console.log("search input changed")

      const response = await axios.post('/searchcommunitymessage', { c_id: selectedCommunity, text: searchinput })
      if (response) {

        setMessages(response.data.messages)
      }
      console.log(`--------------------------------====================================`);
      console.log(messages);
    }
    searchcommunitychat()
  }, [searchinput])
  const searchinputchange = (event) => {
    setsearchinput(event.target.value)
  }


  //////////////////////////////////search chat name begin////////////////////////////////////////////////
  const [searchCText, setSearchCText] = useState('')
  useEffect(() => {

    async function searchcommunityName() {
      console.log(`individ-------------------------`);
      console.log(searchCText);
      const response = await axios.post('/search_communityname', { text: searchCText, communities: userdata.communities })
      setIndividualCommunity(response.data.groups)
    }
    searchcommunityName()
  }, [searchCText])

  const handleSearchCommunityName = (event) => {
    setSearchCText(event.target.value)
  }
  /////////////////////////message delete///
  async function handleDelete(c_id, msg_id) {
    try {
      const response = await axios.post('/delete_c_message', { c_id: c_id, msg_id: msg_id })
      console.log(`click delete`);
      if (response.data.success) {
        get_c_messages()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="section1 section_margin box relative_pos">
        <div className="box searchbox flexrow spacebetween relative_pos min_boxwidth">
          <input type="text" placeholder="Search for Existing Chats" className="nobordershadow widthmax" onChange={handleSearchCommunityName} />
          <Menu setScreen={screen} setCreateAlert={create} />
        </div>
        {individualCommunity.map((el, i) =>
          <div className="box chat pointer min_boxwidth minheight relative_pos ">
            <div className="chat_info relative_pos" onClick={() => onclick(el._id, el.communityName, el.description, el.communityIcon)}>
              <img className="icon profile_chat_img" src={`uploads/communityIcons/${el.communityIcon}`} alt="" />
              <div className=" profile_text relative_pos">
                <div className="textlength_head ">
                  <span className="bold ">{el.communityName}</span>
                </div>
                <div className="textlength_para ">
                  {el.lastmessage && el.lastmessagesender && <span className="light">{el.lastmessagesender}: {el.lastmessage}</span>}
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
                {<UpperChatInfo data={{ selectedCommunityIcon, individualCommunity, selectedCommunityName }} actions={{ setSelectedCommunity }} sidescreen={() => { setSideScreen(true); setMoreadj(true); setMember(false); }} />}

              </div>

              <div className="center gap10">
                <div className="box center nobordershadow nopadding spacebetween flexrow ">
                  {ChatSearch ?
                    <>
                      <MdClose className="icon_search" color="" onClick={() => { SetChatSearch(false) }} />
                      <input type="text" value={searchinput} onChange={searchinputchange} />
                    </>

                    :
                    <>
                      <CgSearch color="" onClick={() => { SetChatSearch(true) }} />
                      <span className="light " onClick={() => { SetChatSearch(true) }}>Searchll</span>
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
              <ErrorMessage error={error} listening={listening} setListening={setListening} seterror={seterror} />
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



              {messages?.length > 0 && messages.map((el, i) => (
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
                            <div className="message_items" onClick={() => handleDelete(selectedCommunity, el._id)}>
                              <div className="neration flexrow redHover_elmt"><MdDelete className="icon_search" />
                                <span className="bold padding5" >Delete</span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className={el.u_name === username ? " flex flexrow " : " flex flexrow"}>
                          {el.messagetype === "image" && (

                            <Image
                              src={`uploads/communityMessageImages/${el.filename}`}
                              onContextMenu={(e) => handleContextMenuMedia(e, el)}
                            />
                          )}

                          {el.messagetype === "video" && (

                            <Video src={`uploads/communityMessageVideos/${el.filename}`}
                              onContextMenu={(e) => handleContextMenuMedia(e, el)}
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
                            {/* needs adjustment here */}
                            {el.anonymity ? <img src={`uploads/profilePictures/userdummy.jpg`}
                              className="icon_search circle" alt="" srcSet="" />
                              : <img src={`uploads/profilePictures/${el.profilePicture ? el.profilePicture : 'chathistory.jpg'}`}
                                className="icon_search circle" alt="" srcSet="" onClick={() => { }} />}

                            {el.anonymity ? <p className="bold">S'user</p> : <p className="bold">{el.u_name}</p>}
                          </div>
                        </div>
                      </div>
                      :
                      <div className="flex flexrow gap10" >

                        <div className={el.u_name === username ? " msg-rightside flex flexrow " : " flex row_revese"}>
                          {el.messagetype === "image" && (
                            <Image
                              src={`uploads/communityMessageImages/${el.filename}`}
                              onContextMenu={(e) => handleContextMenuMedia(e, el)}
                            />
                          )}

                          {el.messagetype === "video" && (
                            <Video src={`uploads/communityMessageVideos/${el.filename}`}
                              onContextMenu={(e) => handleContextMenuMedia(e, el)} />
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
                            {/* needs adjustment here */}
                            {el.anonymity ? <img src={`uploads/profilePictures/userdummy.jpg`}
                              className="icon_search circle" alt="" srcSet="" onClick={() => {
                                if (el.u_name != username) {
                                  setSelectedUser({ username: el.u_name, userid: el.u_id });
                                  setMember(true);
                                  setSideScreen(true);
                                }
                              }}
                            /> : <img src={`uploads/profilePictures/${el.profilePicture ? el.profilePicture : 'chathistory.jpg'}`}
                              className="icon_search circle" alt="" srcSet="" onClick={() => {
                                if (el.u_name != username) {
                                  setSelectedUser({ username: el.u_name, userid: el.u_id });
                                  setMember(true);
                                  setSideScreen(true);
                                }
                              }}
                            />}

                            {el.anonymity ? <p className="bold">S'user</p> : <p className="bold">{el.u_name}</p>}
                          </div>
                        </div>
                        {rightclk && selectedMessage === el && (
                          <div className="message_options center" >
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
                            <div className="message_items" onClick={() => handleDelete(selectedCommunity, el._id)}>
                              <div className="neration flexrow redHover_elmt"><MdDelete className="icon_search" />
                                <span className="bold padding5">Delete</span>
                              </div>
                            </div>
                            {media ? null : <div className="message_items" onClick={() => { handleTranslate(); toggleTranslation() }}>
                              <div className="neration flexrow violetHover"><MdTranslate className="icon_search" />
                                <span className="bold padding5">Translate</span>
                              </div>
                            </div>}

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
                  <FaMicrophone className="icon icon_small nobordershadow" onClick={() => handleListen(setListening, seterror, setText)} style={{ cursor: 'pointer' }} />
                  {/* <MdOutlineInsertEmoticon className="icon icon_small nobordershadow" /> */}
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
        {Member ?
          <SideScreenCommunityMemberFn selectedUser={selectedUser} handleClick={() => { setSideScreen(false); setMoreadj(false); }} member={() => { setMember(false) }} />
          :
          <SideScreenCommunityDetailsFn data={{ selectedCommunityIcon, individualCommunity, "selectedCommunityName": selectedCommunityName, "description": selectedCommunityStatus, selectedCommunity }} actions={{ setIndividualCommunity, setSelectedCommunity, setViewChat, setSideScreen }} handleClick={() => { setSideScreen(false); setMoreadj(false); }} />}

      </div>}
    </>
  );

}
export default CommunityMsgScreen;


