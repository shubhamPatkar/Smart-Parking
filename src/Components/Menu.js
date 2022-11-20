
import React, { useState } from "react";
import '../CSS/menu.css'
import parkedCar from '../Assets/avatar.jpeg'
import user from '../Assets/icons/user.png'
import logout from '../Assets/icons/log-out.png'
import help from '../Assets/icons/question.png'
import envelope from '../Assets/icons/envelope.png'
import { useNavigate,useLocation  } from 'react-router-dom';

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
        <div class="action">
        <div class="profile" onClick={()=>{menuToggle()}}>
          <img src={parkedCar} />
        </div>
        <div class="menu" style={{display:"flow-root",visibility:visible}}>
          <h3>{props.firstName}{" "}{props.lastName}<br /><span>{props.vechicleNo}</span>
          <br /><span>{props.userName}{" "}<b>({props.profile})</b></span></h3><br/>
          <ul>
            <li>
              <img src={envelope} /><a href="#">Inbox</a>
            </li>
            <li><img src={help} /><a href="#">Help</a></li>
            <li onClick={()=>{navigate("/")}}>
              <img src={logout} /><a href="#">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    )
}
export default Menu;