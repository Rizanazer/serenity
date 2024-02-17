import { FaCircleDot } from "react-icons/fa6";
function UserProfile({ data }) {
    return (
      <div className="active">
        <img src={data.image} alt="" />
        {data.status && <FaCircleDot className="" color="#5e4ae3" />}
        {localStorage.getItem('username')}
      </div>
    );
  }
  export default UserProfile;