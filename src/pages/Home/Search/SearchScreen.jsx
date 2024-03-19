import React, { useEffect, useState } from "react";
import { MdArrowBack, MdMoreVert } from "react-icons/md";
import { IoReload } from "react-icons/io5";
import GroupList from "../Functions/GroupList";
import UpperChatInfo from "../Functions/UpperChatInfo";
import "./SearchScreen.css"
import SideScreenCommunityJoinFn from "../Functions/SideScreen_JoinComunity";
import axios from "axios";
import UserProfileReccomendationForm from "../Functions/reccomendation";
function SearchScreen({ setIndividualCommunity, setScreen, setSelectedCommunity, setSelectedCommunityName, setViewChat_C, ViewChat }) {
  const [Joined, setJoined] = useState(false);
  var [ViewChat, setViewChat] = useState(false);
  var [SideScreen, setSideScreen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [More, setMore] = useState(false);
  const toggleMore = () => {
    setMore(prevState => !prevState);
  };
  const [Status, setStatus] = useState(false);
  const [Moreadj, setMoreadj] = useState(false);
  var [GroupName, setGroupName] = useState([]);
  var [GroupName, setGroupName] = useState([]);
  var [reccomendedGroupName, setReccomendedGroupName] = useState([]);
  var [GroupIcon, setGroupIcon] = useState('');
  const [selectedChatName, setSelectedChatName] = useState(null)

  const [userProfile, setUserProfile] = useState({});
  const [recommendedGroups, setRecommendedGroups] = useState([]);

  useEffect(() => {
      const userDataString = localStorage.getItem('userdata');
      if (userDataString) {
          try {
              const userdata = JSON.parse(userDataString);
              setUserProfile({ likes: userdata.likes, dislikes: userdata.dislikes, hobbies: userdata.hobbies });
          } catch (error) {
              console.error('Error parsing userdata:', error);
          }
      }
      
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('http://127.0.0.1:8000/recommend_groups', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_profile: userProfile }),
      });
      const data = await response.json();
      setRecommendedGroups(data.recommended_groups || []);
      console.log(recommendedGroups);
  };

  // useEffect(() => {
  //   async function fetchgroups() {
  //     const response = await axios.post('/getallgroupnames')
  //     console.log(response.data);
  //     setGroupName(response.data.groups)
  //   }
  //   // fetchgroups()
  // }, [])
  var [text, setText] = useState("");
  var [messages, setMessages] = useState([]);
  const userid = localStorage.getItem('userid')
  const send = async () => {
    if (text.length > 0) {
      setMessages([...messages, text])
    }
  }
  async function joincommunity() {
    const u_id = localStorage.getItem('userid')
    try {
      const response = await axios.post('/joincommunity', { u_id: u_id, c_id: selectedChat })
      if (response.data.success === true) {
        setJoined(true);
        console.log(response.data)
        setIndividualCommunity((prev) => [...prev, response.data.result])
      } else {
        { console.log("Joining Community fail"); }
      }
    } catch (error) {
      console.error(error)
    }
  }
  async function checkjoin() {
    const response = await axios.post('/checkjoinstatus', { c_id: selectedChat, u_id: userid })
    setJoined(response.data.member)
  }
  useEffect(() => {
    checkjoin()
  }, [selectedChat])
  


  async function handleclick(c_id, c_name,c_image) {
    setSelectedChat(c_id)
    setSelectedChatName(c_name)
    setGroupIcon(c_image)
  }
  const [searchText,setSearchText] = useState('')
  const handlesearchtext = (event)=>{
    setSearchText(event.target.value)
    console.log(searchText);
  }

  async function searchcommunity(){
    try{
      const response = await axios.post('/searchcommunity',{searchText:searchText})
      setGroupName(response.data.groups)
    }catch(error){
      console.error(error)
    }
  }
  useEffect(()=>{
    searchcommunity()
  },[searchText])

 async function Reccomendcommunity(){
    try{
      const response = await axios.post('/reccomendedcommunity',{priorityList:recommendedGroups})
      setReccomendedGroupName(response.data.sortedGroups)
    }catch(error){
      console.error(error)
    }
  }
  useEffect(()=>{
    Reccomendcommunity()
  },[])
  return (
    <>
      <div className="section1 section_margin box gap20 scroll">
        <div className="box nopadding nobordershadow search_box ">
          <div className="box searchbox ">
            <input type="text" placeholder="Search for New Communities" className="nobordershadow widthmax" name="searchbox" onChange={handlesearchtext}/>
          </div>
          <div className="box nopadding nobordershadow searchBoxContnt">
            {GroupName.map((el, i) => <GroupList_1 setViewChat={setViewChat} userid={userid} data={el} key={i} HandleClick={handleclick} />)}
          </div>
        </div>

        <div className="box reccomendation_box">
          <div className=" searchbox flexrow">
            <span className="bold">Community Reccomendations</span>
       
                <IoReload className="icon_search" onClick={handleSubmit}/>
    
          </div>
          <div className="box nopadding nobordershadow reccomendationBoxContnt nogap">
            {reccomendedGroupName&&(reccomendedGroupName.map((el, i) => <GroupList_2 data={el} key={i} HandleClick={() => { setSelectedChat(el) ;setGroupIcon(el.communityIcon)}} />))}
          </div>


        </div>

      </div>

      <div className="section2 box" >
        {ViewChat ? <>
          {/* upperchats component */}
          <div className="box upper_chatroom_padding flexrow spacebetween">
            <div className="center gap10">

              <MdArrowBack className="icon nobordershadow" onClick={() => { setViewChat(false); setSideScreen(false); }} color="" />
              {<>
                {/* <img className="icon profile_chat_img" src="uploads/img.png" alt="" onClick={sidescreen}/> */}
                <img className="icon profile_chat_img" src={GroupIcon?`uploads/communityIcons/${GroupIcon}`: 'uploads/img.png' } alt="" />
                <span className="bold">{selectedChatName}</span>
              </>}
              {/* {<UpperChatInfo data={{ "image": "uploads/img.png", "username": "ddd", "status": () => { setSideScreen(true); setMoreadj(true); } }} />} */}
            </div>

            <div className="center gap10">


              <MdMoreVert className="icon nobordershadow " color="" onClick={toggleMore} />

            </div>
          </div>

          {/* middlechats component-chat_area */}
          <div className="box chat_area nopadding">
            {More && <div className={Moreadj ? "more_options more_option_adjusted" : "more_options"}></div>}

            {messages && messages.map((el, i) => <p className="msg " key={i}>{el}</p>)}
          </div>

          {/* bottomchats component-chat_typing */}
          {
            Joined ? <div className="box center pointer joinbtn" onClick={() => {
              setScreen('CommunityMessage');
              setSelectedCommunity(selectedChat);
              setSelectedCommunityName(selectedChatName);
              setViewChat_C(true)
            }}>
              <span className="bold" >Enter Chat</span>
            </div>
              :
              <div className="box center pointer joinbtn" onClick={joincommunity}>
                <span className="bold">join</span>
              </div>
          }
        </>
          :
          <></>}

      </div>
      {/* {SideScreen && <div className="section3 box nopadding nobordershadow">
        {<SideScreenCommunityJoinFn data={{ "image": selectedChat?.image, "groupname": selectedChat?.groupname }} handleClick={() => { setSideScreen(false); setMoreadj(false); }} />}
      </div>} */}
    </>
  );
}
function GroupList_1({ userid, data, HandleClick, setViewChat }) {
  const isJoined = data.members && data.members.includes(userid);
  const stylenotjoined = { color: "red", borderRadius: '10px', textAlign: 'center',display:'flex',position:'relative'}
  const stylejoined = { color: "green", borderRadius: '10px', textAlign: 'center',display:'flex',position:'relative' }
  return (

    <div className="box chat pointer minheight" onClick={() => { setViewChat(true); HandleClick(data._id, data.communityName,data.communityIcon); }}>

      <div className="chat_info " >
        <img className="icon profile_chat_img" src={`uploads/communityIcons/${data.communityIcon}`} alt="" />
        <div className=" profile_text">
          <div className="textlength_head flex spacebetween">
            <span className="bold ">{data.communityName}</span>
           
          </div>
          <div className="textlength_para">
            <span className="light ">{data.description}</span>
          </div>
        </div>
        {isJoined === true ? <span className="light center" style={stylejoined}>Joined</span> : <span className="light center" style={stylenotjoined}>Not joined</span>}
      </div>
     
    </div>

  )
}
function GroupList_2({ data, HandleClick }) {

  return (
    <div onClick={() => { data.viewchat(); HandleClick(); }}>
      <div className="box chat pointer nobordershadow ">

        <div className="chat_info" >
          <img className="icon profile_chat_img" src={data.image} alt="" />
          <div className=" profile_text">
            <span className="bold">groupname</span>
            <span className="light">messaga</span>
          </div>
        </div>
        {data.status && <span className="light">joined</span>}
      </div>
    </div>
  )
}
export default SearchScreen;