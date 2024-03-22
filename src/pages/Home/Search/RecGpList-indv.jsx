
function GroupList_2({ userid, data, HandleClick, setViewChat }) {
    const isJoined = data.members && data.members.includes(userid);
    const stylenotjoined = { color: "red", borderRadius: '10px', textAlign: 'center',display:'flex',}
    const stylejoined = { color: "green", borderRadius: '10px', textAlign: 'center',display:'flex',}
    return (
  
      <div className="box chat pointer " style={{minHeight:80,borderRadius:0}} onClick={() => { setViewChat(true); HandleClick(data._id, data.communityName,data.communityIcon); }}>
  
        <div className="chat_info" >
          <img className="icon profile_chat_img chat_info_1" src={`uploads/communityIcons/${data.communityIcon}`} alt="" />
          <div className=" profile_text chat_info_2">
            <div className="textlength_head flex spacebetween">
              <span className="bold ">{data.communityName}</span>
             
            </div>
            <div className="textlength_para">
              <span className="light ">{data.description}</span>
            </div>
            {isJoined === true ? <span className="light  chat_info_3" style={stylejoined}>Joined</span> :
             <span className="light" style={stylenotjoined}>joined</span>}
          </div>
          
        </div>
       
      </div>
  
    )
  }
  export default GroupList_2;