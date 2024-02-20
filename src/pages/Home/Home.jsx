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
import axios from "axios";
import CreateCommunity from "./Functions/createcommunity/createCommunity";
const Home = () => {
  const [Screen, setScreen] = useState("PersonalMessage");
  const [CreateAlert,setCreateAlert]=useState(false);
  const [individualCommunity,setIndividualCommunity] = useState([])
  const userdata = JSON.parse(localStorage.getItem("userdata"))
  const [communityList,updateCommunityList] = useState(userdata.communities)

  useEffect(() => {
    //console.log(communityList);
    async function fetchCommunityDetails() {
      try {
        const response = await axios.post('/individualcommunity', { data: communityList });
        setIndividualCommunity(response.data);
        //console.log("ii "+communityList);
      } catch (error) {
        console.error('Error fetching community details:', error);
      }
    }

    if (communityList.length > 0) {
      fetchCommunityDetails();
    }
  }, []);
  console.log(individualCommunity);
  return (

    <div className="container center">
      
      <Nav Screen={Screen} setScreen={setScreen}/>
      {Screen === "PersonalMessage" && <PersonalMsgScreen/>}
      {Screen === "Profile" && <ProfileScreen />}
      {Screen === "CommunityMessage" && <CommunityMsgScreen screen={setScreen} create={setCreateAlert} individualCommunity={individualCommunity}/>}
      {Screen === "CommunityReccomendation" && <ReccomendationScreen />}
      {Screen === "SearchCommunity" && <SearchScreen />}
      {Screen === "AddFriends" && <AddFriendsScreen/>}
      {Screen === "Settings" && <SettingsScreen />}

      {CreateAlert&&<CreateCommunity setCreateAlert={setCreateAlert} setIndividualCommunity={setIndividualCommunity} />}

    </div>
  );
};
export default Home;
