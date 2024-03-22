import React, { useEffect, useState } from "react";
import { MdArrowBack, MdMoreVert } from "react-icons/md";
import "./SearchScreen.css"
import axios from "axios";
import GroupList_1 from "./GpList-indv";
import ErrorMessage from "../Functions/errormessage";
import GroupList_2 from "./RecGpList-indv";
function SearchScreen({ setSelectedCommunityIcon,setIndividualCommunity, setScreen, setSelectedCommunity, setSelectedCommunityName, setViewChat_C, ViewChat }) {
  const [Joined, setJoined] = useState(false);
  var [ViewChat, setViewChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  var [GroupName, setGroupName] = useState([]);
  var [GroupName, setGroupName] = useState([]);
  var [GroupIcon, setGroupIcon] = useState('');
  const [selectedChatName, setSelectedChatName] = useState(null)
  const userid = localStorage.getItem('userid')
  const [userProfile, setUserProfile] = useState({});
  const [recommendedGroups, setRecommendedGroups] = useState([]);
  const [error, seterror] = useState("");
  const [listening, setListening] = useState(false);

  async function joincommunity() {
    const u_id = localStorage.getItem('userid')
    try {
      const response = await axios.post('/joincommunity', { u_id: u_id, c_id: selectedChat })
      if (response.data.success === true) {
        setJoined(true);
        setIndividualCommunity((prev) => [...prev, response.data.result])
      } else {
         seterror("Joining Community fail")
         setListening(true)
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
  
  useEffect(()=>{
    if(userProfile){
      getRecommendations()
    }
  },[userProfile])

  const getRecommendations = async () => {
      const response = await fetch('/recommendedcommunity', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_profile: userProfile }),
      });
      const data = await response.json();
    if(!data.error){
      setRecommendedGroups(data.data);
    }
  };
  return (
    <>
      <div className="section1 section_margin box gap20 scroll">
        <div className="box nopadding nobordershadow search_box ">
          <div className="box searchbox ">
            <input type="text" placeholder="Search for New Communities" className="nobordershadow widthmax" name="searchbox" onChange={handlesearchtext}/>
          </div>
          <div className="box nopadding nobordershadow searchBoxContnt">
            {searchText.length>0 && GroupName.map((el, i) => <GroupList_1 setViewChat={setViewChat} userid={userid} data={el} key={i} HandleClick={handleclick} />)}
          </div>
        </div>
        <div className="box reccomendation_box">
          <div className=" searchbox flexrow">
            <span className="bold">Community Reccomendations</span>
          </div>
          <div className="box nopadding nobordershadow reccomendationBoxContnt nogap">
            {recommendedGroups&&(recommendedGroups.map((el, i) => <GroupList_2 setViewChat={setViewChat} userid={userid} data={el} key={i} HandleClick={handleclick} />))}
          </div>
        </div>
      </div>
      <div className="section2 box" >
        {ViewChat ? <>
          {/* upperchats component */}
          <div className="box upper_chatroom_padding flexrow spacebetween">
            <div className="center gap10">
              <MdArrowBack className="icon nobordershadow" onClick={() => { setViewChat(false); }} color="" />
              {<>
                <img className="icon profile_chat_img" src={GroupIcon?`uploads/communityIcons/${GroupIcon}`: 'uploads/img.png' } alt="" />
                <span className="bold">{selectedChatName}</span>
              </>}
            </div>
            <div className="center gap10">
              <MdMoreVert className="icon nobordershadow " color=""/>
            </div>
          </div>
          {/* middlechats component-chat_area */}
          <div className="box chat_area nopadding">
          <ErrorMessage error={error} listening={listening} setListening={setListening} seterror={seterror} />
          </div>
          {/* bottomchats component-chat_typing */}
          {
            Joined ? <div className="box center pointer joinbtn" onClick={() => {
              setScreen('CommunityMessage');
              setSelectedCommunity(selectedChat);
              setSelectedCommunityName(selectedChatName);
              setSelectedCommunityIcon(GroupIcon)
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
    </>
  );
}
export default SearchScreen;