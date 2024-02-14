import React, { useEffect, useState } from "react";
import CommunityMsgScreen from "./CommunityMessage/CommunityChatScreen";
import './Home.css'
import PersonalMsgScreen from "./PersonalMessage/PersonalMessageScreen";
import AddFriendsScreen from "./AddFriends/AddFriendsScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import ReccomendationScreen from "./CommunityReccomendation/ReccomendationScreen";
import SearchScreen from "./Search/SearchScreen";
import SettingsScreen from "./Settings/SettingsScreen";
import Nav from "./Nav/Nav";
const Home = () => {
  const [Screen, setScreen] = useState("PersonalMessage");
  

  
  return (

    <div className="container center">
      <Nav Screen={Screen} setScreen={setScreen}/>
      {Screen == "PersonalMessage" && <PersonalMsgScreen/>}
      {Screen == "Profile" && <ProfileScreen />}
      {Screen == "CommunityMessage" && <CommunityMsgScreen />}
      {Screen == "CommunityReccomendation" && <ReccomendationScreen />}
      {Screen == "SearchCommunity" && <SearchScreen />}
      {Screen == "AddFriends" && <AddFriendsScreen/>}
      {Screen == "Settings" && <SettingsScreen />}



    </div>
  );
};
export default Home;
