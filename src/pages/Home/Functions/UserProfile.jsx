import { useEffect } from "react";
import { FaCircleDot } from "react-icons/fa6";
function UserProfile() {
  const userdata = JSON.parse(localStorage.getItem('userdata'))
  const profilepic = `/uploads/profilePictures/${userdata.profilePicture}`
    return (
      <div className="active">
        
        <img alt=""src={`/uploads/profilePictures/${userdata.profilePicture}`}  />
        {<FaCircleDot className="" color="#5e4ae3" />}
        {localStorage.getItem('username')}
      </div>
    );
  }
  export default UserProfile;