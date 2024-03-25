import React, { useEffect, useState, useRef } from "react";
import { CgSearch } from "react-icons/cg";
import { FaCircleDot, FaMicrophone } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import './personalMessage.css';
import { HiMiniSpeakerXMark, HiMiniSpeakerWave } from "react-icons/hi2";
import { MdTranslate, MdDelete, MdClose, MdArrowBack, MdMoreVert, MdVideoFile,MdOutlineImage, MdSend, MdOutlineKeyboardVoice, MdOutlineInsertEmoticon, MdForward } from "react-icons/md";
import Contact from "../Functions/Contacts";
import UpperChatInfo from "../Functions/UpperChatInfo";
import SideScreenPersonalFn from "../Functions/SideScreen_personal";
import axios from "axios";
import io from "socket.io-client";
import rightBox from "../Functions/message_rightclick/chat_rightclck";
import RightClickBox from "../Functions/message_rightclick/chat_rightclck";
import Image from "../Functions/imageview";
import Video from "../Functions/videoplay";
import ErrorMessage from "../Functions/errormessage";
import handleListen from "../Functions/voicetoText";
import handleTranslate from "../Functions/transaltion_option";
import fetchProfileUpdate from "../Functions/fetchownprofile";

function PersonalMsgScreen() {

  const userdata = JSON.parse(localStorage.getItem('userdata'))

  const [scrollPosition, setScrollPosition] = useState(0);
  const chatAreaRef = useRef(null);

  useEffect(() => {
    // Ensure chatAreaRef.current is not null before attempting to scroll
    setTimeout(() => {
      if (chatAreaRef.current) {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
      }
    }, 100);
  }, [messages, scrollPosition]);
  const [language, setLanguage] = useState(null);
  const [error, seterror] = useState("");
  const [listening, setListening] = useState(false);
  const [isfriend, setIsFriend] = useState(true);
  const [searchinput, setsearchinput] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [LastMessage, setLastMessage] = useState([]);
  var [ViewChat, setViewChat] = useState(false);
  var [rightclk, setrightclk] = useState(true);
  var [SideScreen, setSideScreen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [ChatSearch, SetChatSearch] = useState(false);
  const [More, setMore] = useState(false);
  const toggleMore = () => {
    setMore(prevState => !prevState);
  };
  const [Translate, set_Translate] = useState(false);
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
  const [chatId, setChatid] = useState(null)
  const [selectedFriendIcon, setSelectedFriendIcon] = useState(null)
  const [messageTtext, setmessageTtext] = useState("");
  var [media, setMedia] = useState(false);

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

    /////////////////
    
    socket.on('newPersonalMediaMessage', (messageData) => {
      const { from, to, filename, messageType, caption } = messageData;
      setMessages(prevMessages => [
        ...prevMessages,
        {
          from:from,
          to:to,
          filename:filename,
          messageType:messageType,
          caption:caption
        }
      ]);
    });
  }, [])
  useEffect(()=>{
    setLanguage(userdata.language)
    fetchcontacts()
    fetchfriends()
    fetchProfileUpdate(setLanguage,seterror,setListening)
  },[])
  useEffect(()=>{
    if(userdata.friends.includes(selectedFriend)){
      setIsFriend(true)
    }else{
      setIsFriend(false)

    }
  },[selectedFriend])
  async function fetchcontacts(){
    try{
      const response =await axios.post('/fetchcontacts',{u_id:userid})
      console.log("😎😎😎😎",response.data.friends);
      setContacts(response.data.friends)
    } catch(error){
      console.error(error)
    }
  }
  async function fetchfriends() {
    const u_id = localStorage.getItem('userid')

    try {
      const response = await axios.post("/fetchfriends", { u_id: u_id, friendids: userdata.friends })
      console.log(response.data.frienddata);
      // setContacts(response.data.frienddata)
      setChats(response.data.chats)
      console.log(`-----------------------------chatts`);
      console.log("😔😔😔😔",response.data.chats);
      setFriends(userdata.friends.length);
      // console.log(" fetching friends",response.data.chats)

      // const lastMessages = getLastMessages(response.data.chats);
      //  console.log("Last Messages:", lastMessages);
      // setLastMessage(lastMessages)

    } catch (error) {
      console.log("error fetching friends")
    }
  }

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

  async function fetchpersonal(friend){
    try {
      const response = await axios.post('/fetchpersonal1', { f_id: friend, u_id: u_id })
      setMessages(response.data.messages)
    } catch (error) {
      setMessages([])
      console.log('personal message fetch error')
    }
  }
  async function onclickfriend(friend) {
    console.log(friend._id)
    setSelectedChat(friend._id)
    setSelectedFriendIcon(friend.profilePicture)
    setSelectedFriend(friend)
    setSelectedFriendName(friend.username)
    /////////////////
    fetchpersonal(friend)
    ///////////////////
    setViewChat(true)
  }
  
  async function onclickfriendchat(friendid, friendname,friendicon,chatid) {
    //this request below might be unnecessary after update .marked as possible unnecessary request -arif
    const response = await axios.post('/getafriend', { u_id: friendid })
    if (response) {
      console.log(`got response`);
    }
    setSelectedFriend(friendid)

    setChatid(chatid)
    setSelectedFriendIcon(friendicon)
    setSelectedFriendName(friendname)
    //////////////
    fetchpersonal(friendid)
    /////////////
    setViewChat(true)

  }
  const send = async () => {
    const trimmedText = text.trim();
    console.log("selectedChat");
    console.log(selectedChat);
    const senddata = { "from": u_id,  "to": selectedFriend, "message": trimmedText,"chatid":chatId }
    mySocket.emit("send_p_message", senddata);
    setText("");
    setSearchChatInput('')
    setScrollPosition(scrollPosition + 1);
    if (messages.length <= 1) {
      fetchfriends();
    }
  }


  const toggleTranslation = () => {
    set_Translate(prevState => !prevState);
  }

  //rightclk
  const handleContextMenu = (e, message) => {
    e.preventDefault(); // Prevent default context menu
    togglerightclick(); // Set rightclk state to true
    setSelectedMessage(message);
    
    setmessageTtext(message.messageBody)
    setMedia(false)
  };

  const handleContextMenuMedia = (e, event) => {
    e.preventDefault(); // Prevent default context menu
    togglerightclick();
    setSelectedMessage(event);
    setMedia(true);
    // setmessageTtext(event.filename)

  };
  //delete message individual
  const deleteMessage = async (m_id) => {
    console.log('====================================');
    console.log("deleted msg : ", m_id);
    console.log('====================================');
    setrightclk(false);
    try {
      const response = await axios.post('/delete_a_personal_message', { m_id: m_id, c_id: chatId })
      if (response.data.success === true) {
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
    setmessageTtext("");
    set_Translate(false);
  };
  //enter key for send
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default form submission behavior
      send();
    }
  };
  ////////////////////////////search begin here
  useEffect(() => {
    async function searchmessage() {
      const response = await axios.post('/searchpersonalmessage', { u_id: userid, f_id: selectedFriend, text: searchinput })
      setMessages(response.data.messages)
      console.log(searchinput);
    }
    searchmessage()
  }, [searchinput])

  const handlesearchinput = (event) => {
    setsearchinput(event.target.value);

  }
  /////////////////////////////////search chat name begins here
  const [searchChatInput,setSearchChatInput] = useState('')
  async function searchchatname(){
    try{
      const response = await axios.post('/search_p_chatname',{u_id:userid,text:searchChatInput})
      setChats(response.data.chats)
    }catch(error){
      console.error(error)
    }
  }
  useEffect(()=>{
    searchchatname()
  },[searchChatInput])
  ///////////////////////////////////
  const fileImageRef = useRef(null);
  const fileVideoRef = useRef(null);
  function sendimage(){
    fileImageRef.current.click()
  }
  function sendvideo(){
    fileImageRef.current.click()

  }
  
  const handleVideoChange = async (event)=>{
    const media = event.target.files[0]
    if (media) {
      try {
        const formData = new FormData();
        formData.append('media', media);
        formData.append('f_id', selectedFriend);
        formData.append('u_id', userdata._id);
        formData.append('mediatype',"video")
        const response = await axios.post('/personal_upload_image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        await fetchpersonal(selectedFriend)
      } catch (error) {
        // seterror('Error uploading image:', error)
        // setListening(true)
        console.error('Error uploading video:', error);
      }
    }
  }
  ////////////////////////////////////
  const handleImageChange= async(event)=>{
    const media = event.target.files[0]
    if (media) {
      try {
        const formData = new FormData();
        formData.append('media', media);
        formData.append('f_id', selectedFriend);
        formData.append('u_id', userdata._id);
        formData.append('mediatype', "image");
        const response = await axios.post('/personal_upload_image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // setMessages([...messages, newmessage])
        await fetchpersonal(selectedFriend)
      } catch (error) {
        // seterror('Error uploading image:', error)
        // setListening(true)
        console.error('Error uploading image:', error);
      }
    }
  }
  return (
    <>
      <div className="section1 section_margin box spacebetween">

        <div className="box nobordershadow nopadding chathistory">
          <div className="box searchbox flexrow">
            <input type="text" placeholder="Search for Existing Chats" value={searchChatInput}onChange={(e)=>{setSearchChatInput(e.target.value)}}className="nobordershadow widthmax" />
            <MdDelete className="icon nobordershadow" color={Deletefn ? "#5E4AE3" : "#000"} onClick={() => { toggleDeletefn(); console.log("utasgduygeiyr"); }} />
          </div>
          {Array.isArray(chats) && chats.length > 0 ? (

            chats.map((el, i) => (

              <div className={Deletefn ? "flexrow swipe-container" : "flexrow"}>
                <div className="box chat pointer word_shrink minheight">
                  <div
                    className="chat_info"
                    key={i}
                    onClick={() => {
                      onclickfriendchat(
                        el.users[0]._id === userid ? el.users[1]._id : el.users[0]._id,
                        el.users[0]._id === userid ? el.users[1].username : el.users[0].username,
                        el.users[0]._id === userid ? el.users[1].profilePicture : el.users[0].profilePicture,
                        el._id
                      );

                    }
                    }
                  >
                    {/* <IoMdContact className="icon profile_chat_img"/> */}
                    {el.users[0].username === username?<img className="icon profile_chat_img" src={`uploads/profilePictures/${el.users[1].profilePicture}`} alt="" />
                    :<img className="icon profile_chat_img" src={`uploads/profilePictures/${el.users[0].profilePicture}`} alt="" />}
                    <div className=" profile_text">
                      <div className="textlength_head ">
                        <span className="bold ">{el.users[0].username === username ? el.users[1].username : el.users[0].username}</span>

                      </div>
                      <div className="textlength_para ">
                        <span className="light">{el.from === userid}:{el.messages[el.messages.length-1].messageBody}</span>
                      </div>
                    </div>
                  </div>
                  <div className="incomingchat circle center">1</div>
                </div>
                {Deletefn && (
                  <div className="swipe-actions">
                    <button onClick={() => handleDeleteChat(el.users[0] === userid ? el.users[1] : el.users[0])}>Delete</button>
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
            <span className="bold">Friends</span>
            <span className="bold">{Friends}</span>
          </div>
          <div className="box nopadding nobordershadow nogap friendslist">
            {Array.isArray(contacts) && contacts.map((el, i) =>

              <div className="box chat pointer nobordershadow minheight ">
                <div className="chat_info" key={i} onClick={() => onclickfriend(el)}>
                  <img className="icon profile_chat_img" src={`uploads/profilePictures/${el.profilePicture}`} alt="" />
                  <div className=" profile_text">
                    <div className="textlength_head_friends ">
                      {/* <span className="bold ">{el.users[0].username !== username ? el.users[0].username : el.users[1].username}</span> */}
                      <span className="bold ">{el.username}</span>
                    </div>
                    <div className="textlength_status ">
                      <span className="light">{el.status}</span>
                    </div>
                  </div>
                </div>
                {el.online && <FaCircleDot className="" color="#5e4ae3" />}
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
                <img
                  className="icon profile_chat_img"
                  src={selectedFriendIcon ? `uploads/profilePictures/${selectedFriendIcon}` : `images/chathistory.jpg`}
                  alt=""
                />

                <span className="bold">{selectedFriendName}</span>
              </div>}
            </div>

            <div className="center gap10">
              <div className="box center nobordershadow nopadding spacebetween flexrow">

                {ChatSearch ?
                  <>
                    <MdClose className="icon_search" color="" onClick={() => { SetChatSearch(false) }} />
                    <input type="text" value={searchinput} onChange={handlesearchinput} />
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
            <ErrorMessage error={error} listening={listening} setListening={setListening} seterror={seterror} />
            {messages?.length > 0 && messages.map((el, i) => (
              <React.Fragment key={i}>
                {
                   el.from === userid ?
                    <div className="flex flexrow gap10 msg-rightside">

                      {rightclk && selectedMessage === el && (
                        <div className="message_options center option-rightside">
                           <div className="message_items" onClick={() => {

                            }}>
                              <div className="neration flexrow violetHover"><MdForward className="icon_search" />
                                <span className="bold padding5">Forward</span>
                              </div>
                            </div>
                          <div className="message_items" onClick={() => deleteMessage(el._id)}>
                            <div className="neration flexrow redHover_elmt"><MdDelete className="icon_search" />
                              <span className="bold padding5">delete</span>
                            </div>
                          </div>

                        </div>
                      )}
                      {el.messageType === "text" &&
                      <p
                        className={el.from === userid ? "msg" : "msg"}
                        onMouseEnter={() => { Neration && startHoverTimer(el.messageBody) }}
                        onMouseLeave={cancelHoverTimer}
                        onContextMenu={(e) => handleContextMenu(e, el)}
                      >
                        {el.messageBody}
                      </p>}
                      {
                        el.messageType === "image" &&
                        <Image src={`uploads/personalMessageImages/${el.filename}`} 
                        onContextMenu={(e) => handleContextMenuMedia(e, el)} />
                        // <p>here comes an image</p>
                      }
                      {
                        el.messageType === "video" &&
                        <Video src={`uploads/personalMessageImages/${el.filename}`} 
                        onContextMenu={(e) => handleContextMenuMedia(e, el)} />
                        // <p>here comes an image</p>
                      }
                      {/* {Translate && selectedMessage === el ? messageTtext : el.message} */}
                    </div>


                    :
                    <div className="flex flexrow gap10" >
                      {el.messageType === "text" &&
                      <p
                        className={el.from === userid ? "msg msg-right" : "msg msg-left"}
                        onMouseEnter={() => { Neration && startHoverTimer(el.messageBody) }}
                        onMouseLeave={cancelHoverTimer}
                        onContextMenu={(e) => handleContextMenu(e, el)}
                      >
                        {Translate && selectedMessage === el ? messageTtext : el.messageBody}
                      </p>}
                     
                      {
                        el.messageType === "image" &&
                        <Image src={`uploads/personalMessageImages/${el.filename}`} 
                        onContextMenu={(e) => handleContextMenuMedia(e, el)} />
                      }{
                        el.messageType === "video" &&
                        <Video src={`uploads/personalMessageImages/${el.filename}`} 
                        onContextMenu={(e) => handleContextMenuMedia(e, el)} />
                        // <p>here comes an image</p>
                      }
                      {rightclk && selectedMessage === el && (
                        <div className="message_options center ">
                           <div className="message_items" onClick={() => {
     

                            }}>
                              <div className="neration flexrow violetHover"><MdForward className="icon_search" />
                                <span className="bold padding5">Forward</span>
                              </div>
                            </div>
                          <div className="message_items  " onClick={() => deleteMessage(el._id)}>
                            <div className="neration flexrow redHover_elmt"><MdDelete className="icon_search" />
                              <span className="bold padding5">delete</span> </div>
                          </div>
                          {media ? null : <div className="message_items" onClick={() => { handleTranslate(messageTtext,language,setmessageTtext,seterror,setListening); toggleTranslation() }}>
                            <div className="neration flexrow violetHover"><MdTranslate className="icon_search" />
                              <span className="bold padding5">translate</span>
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
          {
              isfriend?<div className="box center chat_typing flexrow spacebetween">
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
                  <FaMicrophone className="icon icon_small nobordershadow" onClick={()=>handleListen(setListening,seterror,setText)} style={{ cursor: 'pointer' }}/>
                  <input type="file" accept="image/*" ref={fileImageRef} style={{ display: 'none' }} onChange={handleImageChange} />
                  <input type="file" accept="video/*" ref={fileVideoRef} style={{ display: 'none' }} onChange={handleVideoChange} />
                  <MdVideoFile className="icon icon_small nobordershadow"  onClick={sendvideo}/>
                  <MdOutlineImage className="icon icon_small nobordershadow" onClick={sendimage}/>
                </div>
                <MdSend className="icon send nobordershadow" onClick={send} />
              </div>
            </div>
            :
            <div className="box center chat_typing flexrow spacebetween">
            <div className="type_message center">
                <span className="light">you are no longer friends..</span>
            </div>
          </div>
            }
        </>
          :
          <></>}

      </div>
      {SideScreen && <div className="section3 box nopadding nobordershadow">
        <SideScreenPersonalFn fetchfriends={fetchfriends} selectedFriend={selectedFriend} data={{ "image": selectedFriendIcon, "username": selectedChat?.username }} handleClick={() => { setSideScreen(false); setMoreadj(false); }} />
      </div>}
    </>
  );
}
export default PersonalMsgScreen;
