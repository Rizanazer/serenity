function GroupList({ data ,actions}) {
  function onclick(){
    actions.setViewChat(true)
    console.log(`click viewchat`);
    actions.setSelectedCommunity(data._id)
    actions.setSelectedCommunityName(data.communityName)
    console.log(data._id)
   }
    return (
      // <div className="box chat pointer" onClick= {()=>{data.viewchat();HandleClick();}}>
        <div className="box chat pointer">

        <div className="chat_info" onClick={onclick}>
          <img className="icon profile_chat_img" src={data.image} alt="" />
          <div className=" profile_text">
            <span className="bold">{data.communityName}</span>
            <span className="light">{data.message}</span>
          </div>
        </div>
        {/* {data.status && <span className="light">joined</span>} */}
      </div>
    )
  }
  export default GroupList;