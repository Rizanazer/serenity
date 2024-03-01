import React, { useEffect, useState } from "react";
import CommunityMsgScreen from "./CommunityMessage/CommunityChatScreen";
import './Home.css'
import PersonalMsgScreen from "./PersonalMessage/PersonalMessageScreen";
import AddFriendsScreen from "./AddFriends/AddFriendsScreen";
import ProfileScreen from "./Profile/ProfileScreen";

import SearchScreen from "./Search/SearchScreen";
import SettingsScreen from "./Settings/SettingsScreen";
import Nav from "./Nav/Nav";
import axios from "axios";
import CreateCommunity from "./Functions/createcommunity/createCommunity";
const Home = () => {
  var [ViewChat, setViewChat] = useState(false);

  const [selectedCommunityName, setSelectedCommunityName] = useState(null)
  const [selectedCommunity, setSelectedCommunity] = useState("")
  const [Screen, setScreen] = useState("PersonalMessage");
  const [CreateAlert, setCreateAlert] = useState(false);
  const [individualCommunity, setIndividualCommunity] = useState([])
  const userdata = JSON.parse(localStorage.getItem("userdata"))
  const [communityList, updateCommunityList] = useState(userdata.communities);
  const [Setting, setSetting] = useState(false);
  const [selectedCommunityStatus, setSelectedCommunityStatus] = useState(null);

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

  console.log(individualCommunity);
  return (

    <div className="container center">

      <Nav Screen={Screen} setScreen={setScreen} setSetting={() => { setSetting(true) }} />
      {Screen === "PersonalMessage" && <PersonalMsgScreen />}
      {Screen === "Profile" && <ProfileScreen />}
      {Screen === "CommunityMessage" && <CommunityMsgScreen
        ViewChat={ViewChat}
        setViewChat={setViewChat}
        setSelectedCommunityName={setSelectedCommunityName}
        selectedCommunityName={selectedCommunityName}
        setSelectedCommunity={setSelectedCommunity}
        selectedCommunity={selectedCommunity}
        screen={setScreen}
        create={setCreateAlert}
        individualCommunity={individualCommunity}
        selectedCommunityStatus={selectedCommunityStatus}
        setselectedCommunityStatus={setSelectedCommunityStatus}
      />}
      {Screen === "SearchCommunity" && <SearchScreen
        setIndividualCommunity={setIndividualCommunity}
        setViewChat_C={setViewChat}
        setSelectedCommunityName={setSelectedCommunityName}
        setSelectedCommunity={setSelectedCommunity}
        setScreen={setScreen} />}
      {Screen === "AddFriends" && <AddFriendsScreen />}


      {CreateAlert && <CreateCommunity setCreateAlert={setCreateAlert} fetchCommunityDetails={fetchCommunityDetails} />}
      {Setting ? <SettingsScreen handleClick={() => { setSetting(false) }} setscreen={()=>setScreen("Profile")} /> : null}
    </div>
  );
};
export default Home;
