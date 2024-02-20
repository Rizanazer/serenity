import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
function Add_Friends({ data,handleClick,addFriendsAlert }) {
    return (
      <div className="box chat pointer" onClick= {()=>{handleClick();addFriendsAlert();}}>
  
        <div className="chat_info">
          <img className="icon profile_chat_img" src={data.image} alt="image" />
          <div className=" profile_text center">
            <span className="bold">{data.username}</span>
            <span className="light">{data.status}</span>
          </div>
        </div>
        <MdArrowForwardIos  className=""/>
       
        
      </div>
    )
  }
  export default Add_Friends;