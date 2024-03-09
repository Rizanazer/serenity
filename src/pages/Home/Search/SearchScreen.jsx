import React, { useEffect, useState } from "react";
import { MdArrowBack, MdMoreVert } from "react-icons/md";
import GroupList from "../Functions/GroupList";
import UpperChatInfo from "../Functions/UpperChatInfo";
import "./SearchScreen.css"
import SideScreenCommunityJoinFn from "../Functions/SideScreen_JoinComunity";
import axios from "axios";
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
  const [selectedChatName, setSelectedChatName] = useState(null)
  useEffect(() => {
    async function fetchgroups() {
      const response = await axios.post('/getallgroupnames')
      console.log(response.data);
      setGroupName(response.data.groups)
    }
    fetchgroups()
  }, [])
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
  useEffect(() => {
    async function checkjoin() {

      console.log(selectedChat)
      console.log("chatt" + selectedChat);
      const response = await axios.post('/checkjoinstatus', { c_id: selectedChat, u_id: userid })
      console.log(response.data)
      setJoined(response.data.member)
    }
    checkjoin()
  }, [selectedChat])
  


  async function handleclick(c_id, c_name) {
    setSelectedChat(c_id)
    setSelectedChatName(c_name)
  }
  const [searchText,setSearchText] = useState('')
  const handlesearchtext = (event)=>{
    setSearchText(event.target.value)
    console.log(searchText);
  }
  useEffect(()=>{
    async function searchcommunity(){
      try{
        const response = await axios.post('/searchcommunity',{searchText:searchText})
        setGroupName(response.data.groups)
      }catch(error){
        console.error(error)
      }
    }
    searchcommunity()
  },[searchText])
  return (
    <>
      <div className="section1 section_margin box gap20">
        <div className="box nopadding nobordershadow search_box">
          <div className="box searchbox">
            <input type="text" placeholder="Search for New Communities" className="nobordershadow widthmax" name="searchbox" onChange={handlesearchtext}/>
          </div>
          <div className="box nopadding nobordershadow searchBoxContnt">
            {GroupName.map((el, i) => <GroupList_1 setViewChat={setViewChat} userid={userid} data={el} key={i} HandleClick={handleclick} />)}
          </div>
        </div>

        <div className="box reccomendation_box">
          <div className=" searchbox">
            <span className="bold">Community Reccomendations</span>
          </div>
          <div className="box nopadding nobordershadow reccomendationBoxContnt nogap">
            {GroupName.map((el, i) => <GroupList_2 data={el} key={i} HandleClick={() => { setSelectedChat(el) }} />)}
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
                <img className="icon profile_chat_img" src="uploads/img.png" alt="" />
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
      {SideScreen && <div className="section3 box nopadding nobordershadow">
        {<SideScreenCommunityJoinFn data={{ "image": selectedChat?.image, "groupname": selectedChat?.groupname }} handleClick={() => { setSideScreen(false); setMoreadj(false); }} />}
      </div>}
    </>
  );
}
function GroupList_1({ userid, data, HandleClick, setViewChat }) {
  const isJoined = data.members && data.members.includes(userid);
  const stylenotjoined = { color: "red", border: '1px solid red', borderRadius: '10px', textAlign: 'center' }
  const stylejoined = { color: "green", border: '1px solid green', borderRadius: '10px', textAlign: 'center' }
  return (

    <div className="box chat pointer" onClick={() => { setViewChat(true); HandleClick(data._id, data.communityName); }}>

      <div className="chat_info " >
        <img className="icon profile_chat_img" src={`uploads/communityIcons/${data.communityIcon}`} alt="" />
        <div className=" profile_text">
          <div className="textlength_head ">
            <span className="bold ">{data.communityName}</span>
          </div>
          <div className="textlength_para">
            <span className="light ">{data.description}</span>
          </div>
        </div>
      </div>
      {isJoined === true ? <span className="light" style={stylejoined}>Joined</span> : <span className="light" style={stylenotjoined}>Not joined</span>}
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