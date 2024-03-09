function UpperChatInfo({ data ,sidescreen}) {
    return (
      <>
        <img className="icon profile_chat_img" src={`uploads/communityIcons/${data.selectedCommunityIcon}`} alt="" onClick={sidescreen}/>
        <span className="bold">{data.selectedCommunityName}</span>
      </>
    );
  }
  export default UpperChatInfo;