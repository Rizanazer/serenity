import { CgProfile, CgSearch } from "react-icons/cg";
import { MdGroups, MdOutlineSettings, MdPersonAddAlt1} from "react-icons/md";
import { PiChat, PiChats } from "react-icons/pi";
import UserProfile from "../Functions/UserProfile";

export default function Nav({Screen,setScreen}){
    return(<div className="nav center">
        <div className="navbox center">
          <CgProfile className="icon" color={Screen=="Profile" ? "#979697" :"#fff"} onClick={() => { setScreen("Profile"); }} />
          <PiChat className="icon" color={Screen=="PersonalMessage" ? "#979697" :"#fff"} onClick={() => { setScreen("PersonalMessage");}} />
          <PiChats className="icon" color={Screen=="CommunityMessage" ? "#979697" :"#fff"} onClick={() => { setScreen("CommunityMessage");}} />
          <MdGroups className="icon" color={Screen=="CommunityReccomendation" ? "#979697" :"#fff"} onClick={() => { setScreen("CommunityReccomendation"); }} />
          <CgSearch className="icon" color={Screen=="SearchCommunity" ? "#979697" :"#fff"} onClick={() => { setScreen("SearchCommunity");}} />
          <MdPersonAddAlt1 className="icon" color={Screen=="AddFriends" ? "#979697" :"#fff"} onClick={() => { setScreen("AddFriends");}} />
          <MdOutlineSettings className="icon" color={Screen=="Settings" ? "#979697" :"#fff"} onClick={() => { setScreen("Settings");}} />
        </div>

        <UserProfile data={{ "image": "images/profilepic.jpg", "Username": "sungjinwoo", "status": true }} />

      </div>)
}