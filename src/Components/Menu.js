/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useState } from "react";
import "../CSS/menu.css"
import parkedCar from "../Assets/avatar.jpeg"
import logout from "../Assets/icons/log-out.png"
import help from "../Assets/icons/question.png"
import envelope from "../Assets/icons/envelope.png"
import { useNavigate  } from "react-router-dom";

function Menu(props){
  const navigate = useNavigate();
  const [visible,setVisible]= useState(false);
  const menuToggle=()=> {
    if(visible==="visible")
    {
      setVisible("hidden")
    }else{
      setVisible("visible")
    }
  }
  return(
    <div className="action" role="menu">
      <div className="profile" onClick={()=>{menuToggle()}}>
        <img src={parkedCar} alt="" />
      </div>
      <div className="menu" style={{display:"flow-root",visibility:visible}}>
        <h3>{props.firstName}{" "}{props.lastName}<br /><span>{props.vechicleNo}</span>
          <br /><span>{props.userName}{" "}<b>({props.profile})</b></span></h3><br/>
        <ul>
          <li>
            <img src={envelope} alt=""/><a href="#">Inbox</a>
          </li>
          <li><img src={help} alt=""/><a href="#">Help</a></li>
          <li onClick={()=>{navigate("/")}}>
            <img src={logout} alt=""/><a href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Menu;