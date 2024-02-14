function UpperChatInfo({ data }) {
    return (
      <>
        <img className="icon profile_chat_img" src={data.image} alt="" onClick={data.status}/>
        <span className="bold">{data.username}</span>
      </>
    );
  }
  export default UpperChatInfo;