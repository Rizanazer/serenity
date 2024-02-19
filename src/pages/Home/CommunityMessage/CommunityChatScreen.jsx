  import React, { useEffect, useState, useRef } from "react";
  import { CgSearch } from "react-icons/cg";
  import { MdOutlineMenu ,MdClose, MdArrowBack, MdMoreVert, MdOutlineImage, MdSend, MdOutlineKeyboardVoice, MdOutlineInsertEmoticon } from "react-icons/md";
  import GroupList from "../Functions/GroupList";
  import UpperChatInfo from "../Functions/UpperChatInfo";
  import Menu from "../Functions/Menu/menu";
  import SideScreenCommunityDetailsFn from "../Functions/SideScreen_ComunityDetails";
  import SideScreenCommunityMemberFn from "../Functions/SideScreen_communityMember";
  import axios from "axios";
  import {io} from "socket.io-client"
  function CommunityMsgScreen({screen,create,individualCommunity}) {
    ///////////////////////////
    //const [updationToggle,setUpdationToggle]=useState(0)
    // const [communityMessages, setCommunityMessages] = useState({});
    const [selectedCommunityName,setSelectedCommunityName] = useState(null)
    const [selectedCommunity,setSelectedCommunity] = useState("")
    // const [individualCommunity,setIndividualCommunity] = useState([])
    const userdata = JSON.parse(localStorage.getItem('userdata'))
    const [communityList,updateCommunityList] = useState(userdata.communities)
    const [chatByCommunity,setChatByCommunity] = useState([])
    //console.log(communityList);
    const [loadChatByCommunity,setLoadChatByCommunity] = useState(null)
    const [allCommunityMessages,setAllCommunityMessages] = useState([])
    const chatAreaRef = useRef(null);
    const [socket, setSocket] = useState(null);
    // function updationToggleFunc(){
    //   if(updationToggle === 0){
    //     setUpdationToggle(1)
    //   }else{
    //     setUpdationToggle(0)
    //   }
    // }
    useEffect(() => {
      if (chatAreaRef.current) {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
      }
    }, [allCommunityMessages]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post('/loadchat', { communitylist: communityList });
          const temp1 = response.data.map(element => element.chats).flat()
          console.log(temp1)
          // const temp2 = temp1.map(element => element.messages).flat();
          // console.log("temp2 : "+temp2);
          setAllCommunityMessages(temp1.flat())
          //const k = allCommunityMessages.map((el) => el.messages)
          console.log(allCommunityMessages);
          
        } catch (error) {
          console.error(error);
        }
        };
        
        //const res = allCommunityMessages.find(community => community.communityId === selectedCommunity)
        //console.log("dssf  "+res);
        //setChatByCommunity(allCommunityMessages.find(community => community.communityId === selectedCommunity))
        //console.log(`chttt: `+chatByCommunity);
        fetchData();
    }, [communityList]); 

    function onclick(id, name) {
      setViewChat(true);
      setSelectedCommunityName(name);
      setSelectedCommunity(id)
      console.log(id);
      // const selectedMessages = allCommunityMessages.find(elem => elem.communityId === id);
      // if (selectedMessages) {
      //   setCommunityMessages(selectedMessages.messages);
      // }
      // console.log(selectedMessages.messages);
      console.log("////////////////////////////////");
      //console.log(communityMessages);

    }

    useEffect(() => {
      const newSocket = io('http://:3000'); 
      setSocket(newSocket);
    
      newSocket.on('connect', () => {
        console.log('Connected to the server socket');
      });
    
      newSocket.on('newMessage', (message) => {

        console.log('New message from the server socket:', message);
        const updatedMessages = [...allCommunityMessages];
        updatedMessages.forEach((elem)=>{
          //console.log(message)
          if(elem.communityId === message.c_id){
            //console.log(`hi`);
            const appenddata = {"u_id":message.u_id,"u_name":message.u_name,"message":message.message}
            elem.messages.push(appenddata);
          }
          //console.log(updatedMessages);
          setAllCommunityMessages(updatedMessages)
        })
        // setAllCommunityMessages((prevCommunityMessages) => {
        //   const index = prevCommunityMessages.findIndex(chat => chat.c_id === message.c_id);
        //   console.log(index);
        //   if (index !== -1) {
        //     const updatedCommunityMessages = [...prevCommunityMessages];
        //     updatedCommunityMessages[index].messages.push(message);
        //     setCommunityMessages(prevMessages => [...prevMessages, message]);

        //     return updatedCommunityMessages;
        //   } else {
        //     return [...prevCommunityMessages, { communityId: selectedCommunity, messages: [message] }];
        //   }
        // });
      });
    
      return () => {
        newSocket.disconnect();
        console.log('Disconnected from the server');
      };
    }, [allCommunityMessages]);
    
    //////////////////////////
    //console.log(`allcommu`);
      //console.log(allCommunityMessages)
    const [ChatSearch, SetChatSearch] = useState(false);
    var [ViewChat, setViewChat] = useState(false);
    var [SideScreen, setSideScreen] = useState(false);
    var [selectedChat, setSelectedChat] = useState(null);
    const [More, setMore] = useState(false);
    const toggleMore = () => {
      setMore(prevState => !prevState);
    };
    const [Moreadj,setMoreadj]=useState(false);
    var [Member,setMember]=useState(false);
    var [text, setText] = useState("");
    var [messages, setMessages] = useState([]);

    const send = async () => {
      console.log(text);
      if (text.trim().length > 0 && selectedCommunity) {
        const messageData = { c_id: selectedCommunity, message: text ,u_id:localStorage.getItem('userid'),u_name:localStorage.getItem('username')};
        console.log(messageData);
        if (socket) {
          socket.emit('sendMessage', messageData);

          const updatedMessages = [...allCommunityMessages];
        updatedMessages.forEach((elem)=>{
          //console.log(message)
          if(elem.communityId === selectedCommunity){
            //console.log(`hi`);
            const appenddata = {"u_id":localStorage.getItem('userid'),"u_name":localStorage.getItem('username'),"message":text}
            elem.messages.push(appenddata);
          }
          //console.log(updatedMessages);
          setAllCommunityMessages(updatedMessages)
        })

          // updationToggleFunc()
          console.log(`sendfunc`);
          console.log(allCommunityMessages);
          console.log(`///`);
          console.log(messageData);
          const appenddata = { u_id:localStorage.getItem('userid'),u_name:localStorage.getItem('username'),message: text };
          // setCommunityMessages(prevMessages => [...prevMessages, appenddata]);

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

  ////////////////////////////////////////
  
      // useEffect(() => {
      //   //console.log(communityList);
      //   async function fetchCommunityDetails() {
      //     try {
      //       const response = await axios.post('/individualcommunity', { data: communityList });
      //       setIndividualCommunity(response.data);
      //       //console.log("ii "+communityList);
      //     } catch (error) {
      //       console.error('Error fetching community details:', error);
      //     }
      //   }

      //   if (communityList.length > 0) {
      //     fetchCommunityDetails();
      //   }
      // }, []);
  ////////////////////////////////////////


    return (
      <>
        <div className="section1 box">
          <div className="box searchbox flexrow spacebetween">
            <input type="text" placeholder="Search for Existing Chats" className="nobordershadow widthmax" onChange={()=>{}}/>
            <Menu setScreen={screen} setCreateAlert={create}/>
          </div>
          {/* {GroupName.map((el, i) => <GroupList data={el} key={i} HandleClick={() => { setSelectedChat(el) }} />)} */}
          {individualCommunity.map((el, i) => 
          // <GroupList data={{el,selectedCommunity,allCommunityMessages,chatByCommunity}} key={i} actions={{setChatByCommunity,setViewChat,setSelectedCommunity,setSelectedCommunityName}}/>
          <div className="box chat pointer">

          <div className="chat_info" onClick={()=>onclick(el._id,el.communityName)}>
            <img className="icon profile_chat_img"  alt="" />
            <div className=" profile_text">
              <span className="bold">{el.communityName}</span>
              <span className="light">{el.message}</span>
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
                <div className="center gap">

                  <MdArrowBack className="icon nobordershadow" onClick={() => { setViewChat(false); setSideScreen(false); }} color="" />

                  {/* {<UpperChatInfo data={{ "image": selectedChat.image, "username": selectedChat.groupname, "status": () => { setSideScreen(true);setMoreadj(true);setMember(false); } }} />} */}
                  {<UpperChatInfo data={{individualCommunity,selectedCommunityName}} actions={{setSelectedCommunity}}  />}

                </div>

                <div className="center gap">
                  <div className="box center nobordershadow nopadding spacebetween flexrow ">
                  {ChatSearch?
                  <>
                  <MdClose className="icon_search" color="" onClick={() => { SetChatSearch(false) }}/>
                  <input type="text" onChange={()=>{}}/>
                  </>
                  
                  :
                  <>
                  <CgSearch color="" onClick={() => { SetChatSearch(true) }}/>
                  <span className="light " onClick={() => { SetChatSearch(true) }}>Search</span>
                  </>
                  }
                  </div>

                  <MdMoreVert className="icon nobordershadow" color="" onClick={toggleMore} />

                </div>
              </div>

              {/* middlechats component-chat_area */}
              {/* //onClick={()=>(console.log(allCommunityMessages.map(s=>s.messages.map(t=>t.message))))} */}
              <div className="box chat_area nopadding"  ref={chatAreaRef}>
              {More && <div className={Moreadj?"more_options more_option_adjusted":"more_options"}></div>}

                {/* {messages.map((el, i) => <div className="msg_main">
                  <img src="images/profileimg_chat.jpg"className="icon_search circle" alt="" srcset="" onClick={()=>{setMember(true);setSideScreen(true)}}/>
                  <p className="msg " key={i}>{el}</p>
                  </div>)} */}
                  
                  {/* {chatByCommunity.map((m)=><p>{m.communityId}</p>)} */}
                  {allCommunityMessages.map(community => {
                if (selectedCommunity === community.communityId) {
                  return community.messages.map(message => (
                    <div className="msg_main">
                  <img src="images/profileimg_chat.jpg"className="icon_search circle" alt="" srcset="" onClick={()=>{setMember(true);setSideScreen(true)}}/>
                    <p className="uname-msg">{message.u_name}</p>
                    <p className="msg" key={message._id}>{message.message}</p>
                    </div>
                  ));
                } else {
                  return null; 
                }
              })}
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
                <input type="text" className="nobordershadow message_length" placeholder="type Heere!!" onChange={(event) => { setText(event.target.value)}} />

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
          {Member?<SideScreenCommunityMemberFn data={{"image":"images/profileimg_chat.jpg","username":"arif"}} handleClick={()=>{setSideScreen(false); setMoreadj(false);}} member={()=>{setMember(false)}}/>
          :
          <SideScreenCommunityDetailsFn data={{"image":selectedChat?.image,"username":selectedChat?.groupname}} member={()=>{setMember(true);}} handleClick={()=>{setSideScreen(false); setMoreadj(false);}}/>}
          
        </div>}
      </>
    );
  }
  export default CommunityMsgScreen;