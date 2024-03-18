function UpperChatInfo({ data ,sidescreen}) {
    return (
      <>
        <img className="icon profile_chat_img" src={data.selectedCommunityIcon?`uploads/communityIcons/${data.selectedCommunityIcon}`:'images/groupprofile.jpg'} alt="" onClick={sidescreen}/>
        <span className="bold">{data.selectedCommunityName}</span>
      </>
    );
  }
  export default UpperChatInfo;