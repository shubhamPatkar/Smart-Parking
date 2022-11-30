/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {React,useState} from "react";
import "../CSS/login.css";
import { useNavigate  } from "react-router-dom";
import axios from "axios";

function Login (){
  const navigate = useNavigate();
  const [userName,setUserName]=useState("");
  const [password,setPassword]=useState("");
 
  const sumbitDetails = async()=>{
    axios.get("/login/getLoginDetails/"+userName+"/"+password)
      .then(function (response) {
        response.data.token
          ?navigate("/dashboard",{state:response.data})
          :alert(response.data.message)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div id="login" role="login">
      <div id="bg"></div>
      <form>
        <div className="form-field" >
          <input  type="email" name="userName" value={userName} onChange={(event)=>{
            setUserName(event.target.value)
          }} placeholder="Email / Username" required/>
        </div>
  
        <div className="form-field" id="password">
          <input  type="password" value={password} name="password" onChange={(event)=>{
            setPassword(event.target.value)
          }} placeholder="Password" required/>                         
        </div>
  
        <div className="form-field">
          <button className="btn" type='button' onClick={()=>{sumbitDetails()}}>Log in</button>
        </div>
        <p id="guestLogin" onClick={()=>{
          navigate("/guestLogin")
        }} >Guest login click here</p>
      </form>
    </div>
  );
}

export default Login;
