function GroupList({ data ,HandleClick}) {
    return (
      <div className="box chat pointer" onClick= {()=>{data.viewchat();HandleClick();}}>
  
        <div className="chat_info">
          <img className="icon profile_chat_img" src={data.image} alt="" />
          <div className=" profile_text">
            <span className="bold">{data.groupname}</span>
            <span className="light">{data.message}</span>
          </div>
        </div>
        {data.status && <span className="light">joined</span>}
      </div>
    )
  }
  export default GroupList;