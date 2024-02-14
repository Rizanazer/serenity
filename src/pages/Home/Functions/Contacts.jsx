import React, { useEffect, useState } from "react";
import { FaCircleDot } from "react-icons/fa6";
function Contact({ data,handleClick }) {
    return (
      <div className="box chat pointer" onClick= {()=>{handleClick();data.viewchat()}}>
  
        <div className="chat_info">
          <img className="icon profile_chat_img" src={data.image} alt="" />
          <div className=" profile_text">
            <span className="bold">{data.username}</span>
            <span className="light">{data.message}</span>
          </div>
        </div>
        {data.status && <FaCircleDot className="" color="#5e4ae3" />}
        
      </div>
    )
  }
  export default Contact;