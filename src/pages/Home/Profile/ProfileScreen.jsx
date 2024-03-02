import "./Profile.css"
function ProfileScreen() {
  return (
    <>
      <div className="h_w_full flex flexrow  zindex2 profile_whole">
        <div className="triangle profile_triangle_position flex"></div>
        <div className="box profilesection flex flexrow center">

          <div className="section2 profilesection1 flex flexcolumn">
            <div className="profile_photosection center">
              <img src="images/profilepic.jpg" alt="image" className="circle profilemain_photo profile_chat_img" />
            </div>
            <div className="profile_postsection">
              <div className="box h_w_full center">
                <span className="light">no uploaded contents yet..</span>
              </div>
            </div>

          </div>
          <div className="section1 profilesection2 flex flexcolumn center gap20">
            <div className="profilemain_name">
              <span className="main_name center">username</span>
            </div>
            <div className="profilemain_name flex flexrow center gap20">
              <span className="bold ">Do you want to be hidden?</span>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="basicprofileinfo flex flexcolumn gap10">
              <div className="flex flexrow gap10 center">
                <span className="light">Status :</span>
                <span className="bold">lyf sucks!!</span>
              </div>
          
              <div className="flex flexrow gap10 center">
                <span className="light">Location :</span>
                <span className="bold">Wayanad,Kerala</span>
              </div>
              <hr className='line' />
              <div className="flex flexrow gap10 center">
                <span className="light">Gender :</span>
                <span className="bold">Male</span>
              </div>
              <div className="flex flexrow gap10 center">
                <span className="light">Age :</span>
                <span className="bold">23</span>
              </div>
              <hr className='line' />
            </div>
            <div className="profile_preferences alignself_cntr flex flexrow gap10 scroll">
              <div className="box padding5 preference_item">
                <span className="light">#likes_cats</span>
              </div>
              <div className="box padding5 preference_item">
                <span className="light">#likes_biriyani</span>
              </div>
              <div className="box padding5 preference_item">
                <span className="light">#techie</span>
              </div>
              <div className="box padding5 preference_item">
                <span className="light">#dont_like_annoying_people</span>
              </div>

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