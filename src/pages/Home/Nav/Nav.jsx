import { CgProfile, CgSearch } from "react-icons/cg";
import { MdGroups, MdOutlineSettings, MdPersonAddAlt1} from "react-icons/md";
import { PiChat, PiChats } from "react-icons/pi";
import UserProfile from "../Functions/UserProfile";

export default function Nav({Screen,setScreen,setSetting,setviewchat}){
    return(<aside className="nav center">
        <div className="navbox center">
          {/* <CgProfile className="icon" color={Screen=="Profile" ? "#979697" :"#fff"} onClick={() => { setScreen("Profile"); }} /> */}
          <PiChat className="icon" color={Screen=="PersonalMessage" ? "#979697" :"#fff"} onClick={() => { setScreen("PersonalMessage");setviewchat(false)}} />
          <PiChats className="icon" color={Screen=="CommunityMessage" ? "#979697" :"#fff"} onClick={() => { setScreen("CommunityMessage");setviewchat(false)}} />
          <CgSearch className="icon" color={Screen=="SearchCommunity" ? "#979697" :"#fff"} onClick={() => { setScreen("SearchCommunity");setviewchat(false)}} />
          <MdPersonAddAlt1 className="icon" color={Screen=="AddFriends" ? "#979697" :"#fff"} onClick={() => { setScreen("AddFriends");setviewchat(false)}} />
          <MdOutlineSettings className="icon" color={Screen=="Settings" ? "#979697" :"#fff"} onClick={() => {setSetting();setviewchat(false)}} />
        </div>

        <UserProfile />

      </aside>)
}