import React, { useEffect, useState } from "react";
import CommunityMsgScreen from "./CommunityMessage/CommunityChatScreen";
import './Home.css'
import PersonalMsgScreen from "./PersonalMessage/PersonalMessageScreen";
import AddFriendsScreen from "./AddFriends/AddFriendsScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import { io } from "socket.io-client"
import SearchScreen from "./Search/SearchScreen";
import SettingsScreen from "./Settings/SettingsScreen";
import Nav from "./Nav/Nav";
import axios from "axios";
import CreateCommunity from "./Functions/createcommunity/createCommunity";
import AccountSettings from "./Settings/Accounts/Accounts";
import Theme_Settings from "./Settings/Theme/Theme";
import Notification_Settings from "./Settings/Notification/Notification";
import { MdClose } from "react-icons/md";
import ErrorMessage from "./Functions/errormessage";

const Home = () => {
  var [ViewChat, setViewChat] = useState(false);
  var [Profile, setProfile] = useState(false);
  var [Account, setAccount] = useState(false);
  const [viewprofileImage, setviewprofileImage] = useState(null)
  var [NotificationSetting, setNotificationSetting] = useState(false);
  var [Theme, setTheme] = useState(false);

  //accounts
  const [pmessages,setPmessages] = useState([])
  const [cmessages,setCmessages] = useState([])

  const [Edit_email, setEdit_email] = useState(false);
  const [Edit_mobile, setEdit_mobile] = useState(false);
  const [Edit_Pass, setEdit_Pass] = useState(false);
  const [Edit_DOB, setEdit_DOB] = useState(false);
  const [Edit_Gender, setEdit_Gender] = useState(false);
  //
  //profile
  const [Edit_profStatus, setEdit_profStatus] = useState(false);
  const [Edit_profLocation, setEdit_profLocation] = useState(false);
  //
  const [selectedCommunityIcon, setSelectedCommunityIcon] = useState(null)
  const [selectedCommunityName, setSelectedCommunityName] = useState(null)
  const [selectedCommunity, setSelectedCommunity] = useState(null)
  const [Screen, setScreen] = useState("PersonalMessage");
  const [CreateAlert, setCreateAlert] = useState(false);
  const [individualCommunity, setIndividualCommunity] = useState([])
  const userdata = JSON.parse(localStorage.getItem("userdata"))
  const [communityList, updateCommunityList] = useState(userdata.communities);
  const [Setting, setSetting] = useState(false);
  const [selectedCommunityStatus, setSelectedCommunityStatus] = useState(null);
  const toggleProfile = () => {
    setProfile(prevState => !prevState);
    setAccount(false);
    setEdit_DOB(false);
    setEdit_Gender(false);
    setEdit_Pass(false);
    setEdit_profLocation(false);
    setEdit_profStatus(false);
    setNotificationSetting(false);
    setTheme(false);
  };
  /////////////////////////////socketttt
  const [socket,setSocket] = useState(null)
  useEffect(() => {
    const newSocket = io('http://:3000');
    setSocket(newSocket);
    return () => {
      if (newSocket) {
        newSocket.disconnect();
        console.log('Disconnected from the server');
      }
    };
  }, []);
  useEffect(()=>{
    if(socket){socket.on('connect', () => {
      console.log('Connected to the server socket');
      socket.emit('setonline',{u_id:localStorage.getItem('userid')})

    });
    socket.on('disconnect',async ()=>{
      // await axios.post('/setoffline',{u_id:localStorage.getItem('userid')})
    })
    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('disconnect');
      }
    };}
  }, []);

  // const toggleEmail = () => {
  //   setEdit_email(prevState => !prevState);
  //   setProfile(false);
  //   setAccount(false);
  //   setEdit_DOB(false);
  //   setEdit_Gender(false);
  //   setEdit_Pass(false);
  //   setEdit_profLocation(false);
  //   setEdit_profStatus(false);
  //   setNotificationSetting(false);
  //   setTheme(false);
  //   setEdit_mobile(false);
  // };
  // const toggleMobile = () => {
  //   setEdit_mobile(prevState => !prevState);
  //   setProfile(false);
  //   setAccount(false);
  //   setEdit_DOB(false);
  //   setEdit_Gender(false);
  //   setEdit_Pass(false);
  //   setEdit_profLocation(false);
  //   setEdit_profStatus(false);
  //   setNotificationSetting(false);
  //   setTheme(false);
  //   setEdit_email(false);
  // };
  const toggleAccount = () => {
    setAccount(prevState => !prevState);
    setEdit_DOB(false);
    setEdit_Gender(false);
    setEdit_Pass(false);
    setEdit_profLocation(false);
    setEdit_profStatus(false);
    setProfile(false);
    setNotificationSetting(false);
    setTheme(false);
    setEdit_mobile(false);
    setEdit_email(false);
  };
  const toggleNotificationSetting = () => {
    setNotificationSetting(prevState => !prevState);
    setAccount(false);
    setEdit_DOB(false);
    setEdit_Gender(false);
    setEdit_Pass(false);
    setEdit_profLocation(false);
    setEdit_profStatus(false);
    setProfile(false);
    setTheme(false);
    setEdit_mobile(false);
    setEdit_email(false);
  }
  const toggleTheme = () => {
    setTheme(prevState => !prevState);
    setAccount(false);
    setEdit_DOB(false);
    setEdit_Gender(false);
    setEdit_Pass(false);
    setEdit_profLocation(false);
    setEdit_profStatus(false);
    setProfile(false);
    setNotificationSetting(false);
    setEdit_mobile(false);
    setEdit_email(false);
  }
  async function fetchCommunityDetails() {
    try {
      const response = await axios.post('/getUsersCommunities', { id: userdata._id });
      setIndividualCommunity(response.data);
    } catch (error) {
      console.error('Error fetching community details:', error);
    }
  }

  useEffect(() => {
    if (communityList.length > 0) {
      if (userdata) {
        fetchCommunityDetails();
      }
    }
  }, []);
  const [error,seterror] = useState('')
  const [listening,setListening] = useState(false)
  // console.log(individualCommunity);
  return (
    <>
      {localStorage.getItem('validation') && localStorage.getItem('validation') === "true" ? <div className="container center ">
        {/* settings */}
        <ErrorMessage error={error} listening={listening} setListening={setListening} seterror={seterror} />

        {Setting && <div className="overlay">
          <div className="flex flexrow h_w_full">
            <div className="flex set1 h_w_full">
              <SettingsScreen
                handleClick={() => {
                  setSetting(false); setProfile(false); setEdit_DOB(false); setEdit_Gender(false); setEdit_Pass(false); setEdit_profLocation(false); setEdit_profStatus(false); setEdit_mobile(false);
                  setEdit_email(false);
                }}
                closeother={() => {
                  setProfile(false); setAccount(false); setEdit_DOB(false); setEdit_Gender(false); setEdit_Pass(false); setEdit_profLocation(false); setEdit_profStatus(false); setEdit_mobile(false);
                  setEdit_email(false);
                }}
                setscreen={() => toggleProfile()}
                profileView={Profile}
                accountcheck={Account}
                accounts={() => { toggleAccount() }}
                notification={() => { toggleNotificationSetting() }}
                notificationcheck={NotificationSetting}
                theme={() => { toggleTheme() }}
                themecheck={Theme}
              />
            </div>
            <div className="flex set2 h_w_full">
              {
                viewprofileImage && <div className="videoPlayer">
                  <img src={`uploads/profilePictures/${viewprofileImage}`} />
                  <MdClose size={50} color="#fff" className="close-button" onClick={() => { setviewprofileImage(false) }} />
                </div>
              }
              {Profile && <ProfileScreen
                setviewprofileImage={setviewprofileImage}
                Location={Edit_profLocation}
                setLocation={setEdit_profLocation}
                ProfileStatus={Edit_profStatus}
                setProfileStatus={setEdit_profStatus}
              />}
              {Account && <AccountSettings
                DOB={Edit_DOB}
                Gender={Edit_Gender}
                Password={Edit_Pass}
                setDOB={setEdit_DOB}
                setGender={setEdit_Gender}
                setPassword={setEdit_Pass}
                setEmail={setEdit_email}
                setMobile={setEdit_mobile}
                Email={Edit_email}
                Mobile={Edit_mobile}
              />
              }
              {Theme && <Theme_Settings />}
              {NotificationSetting && <Notification_Settings />}
            </div>
          </div>


        </div>}
        <Nav Screen={Screen} setScreen={setScreen} setSetting={() => { setSetting(true) }} setviewchat={setViewChat} />
        {Screen === "PersonalMessage" && socket && <PersonalMsgScreen socket={socket} pmessages={pmessages} setPmessages={setPmessages}/>}
        {Screen === "CommunityMessage" && socket &&  <CommunityMsgScreen
          
          socket={socket}
          selectedCommunityIcon={selectedCommunityIcon}
          setSelectedCommunityIcon={setSelectedCommunityIcon}
          fetchCommunityDetails={fetchCommunityDetails}
          ViewChat={ViewChat}
          setViewChat={setViewChat}
          setSelectedCommunityName={setSelectedCommunityName}
          selectedCommunityName={selectedCommunityName}
          setSelectedCommunity={setSelectedCommunity}
          selectedCommunity={selectedCommunity}
          screen={setScreen}
          create={setCreateAlert}
          individualCommunity={individualCommunity}
          setIndividualCommunity={setIndividualCommunity}
          selectedCommunityStatus={selectedCommunityStatus}
          setselectedCommunityStatus={setSelectedCommunityStatus}
        />}
        {Screen === "SearchCommunity" && <SearchScreen
          setIndividualCommunity={setIndividualCommunity}
          setViewChat_C={setViewChat}
          setSelectedCommunityName={setSelectedCommunityName}
          setSelectedCommunityIcon={setSelectedCommunityIcon}
          setSelectedCommunity={setSelectedCommunity}
          setScreen={setScreen} />}
        {Screen === "AddFriends" && <AddFriendsScreen />}
        {CreateAlert && <CreateCommunity setCreateAlert={setCreateAlert} fetchCommunityDetails={fetchCommunityDetails} />}
      </div> : <div><img src="images/smiley.gif" alt="" /><span>Finish Login to enter Home</span><button onClick={() => window.location = '/'}>Go to login</button></div>
      }
    </>

  );
};
export default Home;
