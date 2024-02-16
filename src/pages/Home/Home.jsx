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
import CreateCommunity from "./Functions/createcommunity/createCommunity";
const Home = () => {
  const [Screen, setScreen] = useState("PersonalMessage");
  const [CreateAlert,setCreateAlert]=useState(false);

  
  return (

    <div className="container center">
      <Nav Screen={Screen} setScreen={setScreen}/>
      {Screen === "PersonalMessage" && <PersonalMsgScreen/>}
      {Screen === "Profile" && <ProfileScreen />}
      {Screen === "CommunityMessage" && <CommunityMsgScreen screen={setScreen} create={setCreateAlert}/>}
      {Screen === "CommunityReccomendation" && <ReccomendationScreen />}
      {Screen === "SearchCommunity" && <SearchScreen />}
      {Screen === "AddFriends" && <AddFriendsScreen/>}
      {Screen === "Settings" && <SettingsScreen />}

      {CreateAlert&&<CreateCommunity setCreateAlert={setCreateAlert}/>}

    </div>
  );
};
export default Home;
