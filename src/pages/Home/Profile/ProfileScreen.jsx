import "./Profile.css"
function ProfileScreen() {
  return (
    <>
      <div className="h_w_full flex flexrow  zindex2 profile_whole">
        <div className="triangle flex"></div>
        <div className="box profilesection flex flexrow center">

          <div className="section2 profilesection1 flex flexcolumn">
            <div className="profile_photosection center">
            <img src="images/profilepic.jpg" alt="image" className="circle profilemain_photo profile_chat_img" />
            </div>
            <div className="profile_postsection">
            <div className="box h_w_full"></div>
            </div>
            
          </div>
          <div className="section1 profilesection2"></div>
        </div>
      </div>

    </>
  );
}
export default ProfileScreen;