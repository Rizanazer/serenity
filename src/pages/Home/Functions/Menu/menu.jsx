import React, { useState } from "react";
import "./menu.css"
import { CircleMenu, CircleMenuItem } from "react-circular-menu";
import {MdOutlineMenu,MdOutlineGroupAdd,MdCreate  } from  "react-icons/md";


function Menu ({setScreen,setCreateAlert}){
    const [MenuAdj,setMenuAdj]=useState(false);
    const toggleMore = () => {
        setMenuAdj(prevState => !prevState);
      };
      const togglecreate = () => {
        setCreateAlert(prevState => !prevState);
      };
    return(<>
     <div className=""  onClick={()=>{toggleMore()}}>
      <CircleMenu
      menuToggleClassName={MenuAdj?"menu_div_adj":"menu_div"}
        startAngle={45}
        rotationAngle={270}
        itemSize={2}
        radius={4}
        rotationAngleInclusive={false}
        // style={{borderColor:"#5E4AE3",backgroundColor:"#5E4AE3"}}
       
      >
        <CircleMenuItem
            className="menu_div_adj"
          onClick={() => togglecreate()}
          tooltip="Create Community" 
          tooltipPlacement="right"
          style={{borderColor:"#5E4AE3",backgroundColor:"#5E4AE3"}}
        >
            <MdCreate className="icon_search"/>
          
        </CircleMenuItem>
        <CircleMenuItem tooltip="join community"
         className="menu_div_adj"
         style={{borderColor:"#5E4AE3",backgroundColor:"#5E4AE3"}}
         tooltipPlacement="top"
         onClick={() => { setScreen("SearchCommunity");}}
        >
          <MdOutlineGroupAdd className="icon_search" />
        </CircleMenuItem>
      
      </CircleMenu>
    </div>
</>);

}

export default Menu;
