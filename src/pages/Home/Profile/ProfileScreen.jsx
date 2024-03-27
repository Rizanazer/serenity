import { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { MdEdit, MdEditOff, MdDone,MdViewList } from "react-icons/md";
import axios from "axios";
function ProfileScreen({ ProfileStatus, Location, setProfileStatus, setLocation,setviewprofileImage }) {

  function ToggleLocationEdit() {
    setLocation(prev => !prev);
    setProfileStatus(false);
  }
  function ToggleStatusEdit() {
    setProfileStatus(prev => !prev);
    setLocation(false);
  }
  function calculateAge(dob) {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dobDate.getFullYear();
    if (currentDate.getMonth() < dobDate.getMonth() || (currentDate.getMonth() === dobDate.getMonth()
      && currentDate.getDate() < dobDate.getDate())) {
      age--;
    }
    return age;
  }



  const userdata = JSON.parse(localStorage.getItem('userdata'))
  var [Likes, setLikes] = useState([]);
  var [DisLikes, setDisLikes] = useState([]);
  var [Hobies, setHobies] = useState([]);
  var [Status, setStatus] = useState("");
  var [Gender, setGender] = useState(null);
  const [profilePicture,setProfilePicture] = useState(null)
  var [location, set_location] = useState(null);
  var [Age, setAge] = useState(null);
  var [Anonimity, setAnonimity] = useState(false)

  useEffect(() => {
    set_location(userdata.location);
    setLikes(userdata.likes);
    setDisLikes(userdata.dislikes);
    setHobies(userdata.hobbies);
    setStatus(userdata.status);
    setGender(userdata.gender);
    setAge(userdata.dob);
    setAnonimity(userdata.anonymity);
    setProfilePicture(userdata.profilePicture)
    fetchProfileUpdate()
    // console.log( "##################" ,Status)
  }, []);


  const handleButtonData = async () => {
    try {
      await axios.post('/updateProfile', {
        id: userdata._id,
        anonymity: !Anonimity
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


  const handleLocationData = async () => {
    try {
      await axios.post('/updateProfile', {
        id: userdata._id,
        location: location
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      // setStatus(Status);
      // console.log("##################", Status)
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  const handleStatusData = async () => {
    try {
      await axios.post('/updateProfile', {
        id: userdata._id,
        status: Status
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      // setStatus(Status);
      // console.log("##################", Status)
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  async function fetchProfileUpdate() {
    const u_id = localStorage.getItem('userid')
    try {
      const response = await axios.post("/fetchProfile", { u_id: u_id, })
      // console.log( "##################" ,response.data.status)
      setStatus(response.data.status)
      setAnonimity(response.data.anonymity)
      setAge(response.data.dob)
      setGender(response.data.gender)
      set_location(response.data.location)
    } catch (error) {
      console.log("error fetching Status")
    }
  }



  function ToggleAnonimus() {
    setAnonimity((prevAnonimity) => !prevAnonimity);
    userdata.anonymity = !Anonimity
    localStorage.setItem('userdata', JSON.stringify(userdata))

    handleButtonData()
  }
  const fileInputImageRef = useRef(null);
  const updateimage = () => {
    fileInputImageRef.current.click();
  };
  const replacePicture = async (event)=>{
    const formdata = new FormData()
    const file = event.target.files[0]
    formdata.append("type","profilepic")
    formdata.append("u_id",localStorage.getItem('userid'))
    formdata.append("filename",file)
    try{
      const response = await axios.post('/replaceProfilePicture',formdata)
      userdata.profilePicture = response.data.profilePicture
      localStorage.setItem('userdata',JSON.stringify(userdata))
      setProfilePicture(response.data.profilePicture)
    }catch(error){
      console.error("failure replacing image")
    }
  }

  return (
    <>
      <div className="h_w_full flex flexrow  zindex2 profile_whole">
        <div className="triangle profile_triangle_position flex"></div>
        <div className="box profilesection flex flexrow center">

          <div className="section2 profilesection1 flex flexcolumn">
            <div className="profile_photosection center">
              <img src={`/uploads/profilePictures/${profilePicture}`} alt="image" className="circle profilemain_photo profile_chat_img" />
              <div className="profile_photosection-overlay center">
                <MdEdit className="icon_search" color="#fff" onClick={updateimage} />
                <input type="file" accept="image/*" ref={fileInputImageRef} onChange={replacePicture} name="profilePicture" 
                style={{display:"none"}} required/>
                <MdViewList className="icon_search" color="#fff" onClick={() => {
                  setviewprofileImage(profilePicture)
                }} />
              </div>
            </div>
            <div className="profile_postsection">
              <div className="box h_w_full center">
                <span className="light">no uploaded contents yet..</span>
              </div>
            </div>

          </div>
          <div className="section1 profilesection2 flex flexcolumn center gap20">
            <div className="profilemain_name">
              <span className="main_name center">{userdata.username}</span>
            </div>
            <div className="profilemain_name flex flexrow center gap20">
              <span className="bold ">Do you want to be hidden?</span>

              <label className="switch">
                <input type="checkbox"
                  onChange={() => { ToggleAnonimus() }}
                  checked={Anonimity}
                />
                <span className="slider round"></span>
              </label>

            </div>
            <div className="basicprofileinfo flex flexcolumn gap10">
              <div className="flex flexrow gap10 center">
                <span className="light">Status :</span>
                {ProfileStatus ?
                  <>
                    <input type="text" className="bold edit_account_elmt padding10" value={Status} onChange={(event) => { setStatus(event.target.value) }} />
                    <MdDone className="violetHover" onClick={() => { handleStatusData() }} />
                    <MdEditOff className="violetHover" onClick={() => { ToggleStatusEdit() }} />
                  </>
                  :
                  <>
                    <span className="light violetHover textlength_head" onClick={() => { ToggleStatusEdit() }}>{Status}</span>
                  </>}
              </div>

              <div className="flex flexrow gap10 center">
                <span className="light">Location :</span>
                {Location ?
                  <>
                    <input type="text" className="bold edit_account_elmt padding10" value={location} onChange={(event) => { set_location(event.target.value) }} />
                    <MdDone className="violetHover" onClick={() => { handleLocationData() }} />
                    <MdEditOff className="violetHover" onClick={() => { ToggleLocationEdit() }} />
                  </>
                  :
                  <>
                    <span className="bold violetHover" onClick={() => { ToggleLocationEdit() }}>{location}</span>
                  </>}


              </div>
              <hr className='line' />
              <div className="flex flexrow gap10 center">
                <span className="light">Gender :</span>
                <span className="bold">{Gender}</span>
              </div>
              <div className="flex flexrow gap10 center">
                <span className="light">Age :</span>
                <span className="bold">{calculateAge(Age)}</span>
              </div>
              <hr className='line' />
            </div>
            <div className="profile_preferences alignself_cntr flex flexrow gap10 scroll">
              {Array.isArray(Likes) && Likes.map((el, i) => (
                <div className="box padding5 preference_item" key={i}>
                  <span className="light">#likes_{el}</span>
                </div>))}

              {Array.isArray(Hobies) && Hobies.map((el, i) => (
                <div className="box padding5 preference_item" key={i}>
                  <span className="light">#{el}</span>
                </div>))}

              {Array.isArray(DisLikes) && DisLikes.map((el, i) => (
                <div className="box padding5 preference_item" key={i}>
                  <span className="light">#dont_like_{el}</span>
                </div>))}
            </div>
            <div className="bbf_section flex gap10 flexcolumn">
              <span className="light">BFF :</span>
              <div className="profile_friends flex flexrow center gap10 scroll">
                <div className="box padding30">friend1</div>
                <div className="box padding30">friend2</div>
                <div className="box padding30">friend3</div>
                <div className="box padding30">friend4</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
export default ProfileScreen;