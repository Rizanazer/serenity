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
import AccountSettings from "./Settings/Accounts/Accounts";
const Home = () => {
  var [ViewChat, setViewChat] = useState(false);
  var [Profile, setProfile] = useState(false);
  var [Account, setAccount] = useState(false);

  const [selectedCommunityName, setSelectedCommunityName] = useState(null)
  const [selectedCommunity, setSelectedCommunity] = useState("")
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
  };
  const toggleAccount = () => {
    setAccount(prevState => !prevState);
    setProfile(false);
  };
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
    <>
      <div className="container center ">
        {/* settings */}
        {Setting && <div className="overlay">
          <div className="flex flexrow h_w_full">
            <div className="flex set1 h_w_full">
              <SettingsScreen
                handleClick={() => { setSetting(false); setProfile(false); }}
                closeother={() => { setProfile(false); setAccount(false); }}
                setscreen={() => toggleProfile()}
                profileView={Profile}
                accountcheck={Account}
                accounts={() => { toggleAccount() }} />
            </div>
            <div className="flex set2 h_w_full">
              {Profile && <ProfileScreen />}
              {Account && <AccountSettings />}
            </div>
          </div>


        </div>}
        <Nav Screen={Screen} setScreen={setScreen} setSetting={() => { setSetting(true) }} />
        {Screen === "PersonalMessage" && <PersonalMsgScreen />}
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
      </div>

    </>

  );
};
export default Home;
