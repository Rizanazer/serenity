function UpperChatInfo({ data ,sidescreen}) {
    return (
      <>
        <img className="icon profile_chat_img" src={data.image} alt="" onClick={sidescreen}/>
        <span className="bold">{data.selectedCommunityName}</span>
      </>
    );
  }
  export default UpperChatInfo;