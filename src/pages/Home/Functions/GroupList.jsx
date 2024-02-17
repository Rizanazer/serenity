function GroupList({ data ,actions}) {
  function onclick(){
    actions.setViewChat(true)
    console.log(`click viewchat`);
    actions.setSelectedCommunity(data.el._id)
    actions.setSelectedCommunityName(data.el.communityName)
    console.log(data.el._id)
    data.allCommunityMessages.forEach((c)=>{
      if(data.selectedCommunity === c.communityId){
        actions.setChatByCommunity(c.messages)
        console.log(data.chatByCommunity);
      }
    })
   }
    return (
      // <div className="box chat pointer" onClick= {()=>{data.viewchat();HandleClick();}}>
        <div className="box chat pointer">

        <div className="chat_info" onClick={onclick}>
          <img className="icon profile_chat_img" src={data.image} alt="" />
          <div className=" profile_text">
            <span className="bold">{data.el.communityName}</span>
            <span className="light">{data.el.message}</span>
          </div>
        </div>
        {/* {data.status && <span className="light">joined</span>} */}
      </div>
    )
  }
  export default GroupList;