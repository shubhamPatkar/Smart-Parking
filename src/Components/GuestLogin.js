/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/aria-role */
import {React,useState} from "react";
import "../CSS/login.css";
import { useNavigate  } from "react-router-dom";
import axios from "axios";

function GuestLogin (){
  const navigate = useNavigate ();
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [mobileNo,setMobileNo]=useState("");
  const [email,setEmail]=useState("");
  const [vehicleNo,setVehicleNo]=useState("");

  const sumbitDetails = ()=>{
    const obj={
      "userName":email,
      "firstName":firstName,
      "lastName":lastName,
      "mobileNo":mobileNo,
      "vehicleNo":vehicleNo
    }
    axios.post("/login/saveLoginDetails",obj)
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
    <div id="login" role="guestLogin">
      <div id="bg"></div>
      <form id="guestLoginForm">
        <div className="form-field" >
          <input type="text" value={firstName} onChange={(event)=>{
            setFirstName(event.target.value)
          }} placeholder="FirstName" required/>
        </div>
        <div className="form-field" >
          <input type="text" value={lastName} onChange={(event)=>{
            setLastName(event.target.value)
          }} placeholder="LastName" required/>
        </div>
        <div className="form-field" >
          <input type="number" value={mobileNo} onChange={(event)=>{
            setMobileNo(event.target.value)
          }} placeholder="Mobile No" required/>
        </div>
        <div className="form-field" >
          <input type="Email" value={email} onChange={(event)=>{
            setEmail(event.target.value)
          }} placeholder="Email" required/>
        </div>
        <div className="form-field" >
          <input type="vehicleNo" value={vehicleNo} onChange={(event)=>{
            setVehicleNo(event.target.value)
          }} placeholder="vehicle No" required/>
        </div>
      
        <div className="form-field">
          <button className="btn" type="button" onClick={()=>{sumbitDetails()}}>Sign Up</button>
        </div>
        <p id="guestLogin" onClick={()=>{
          navigate("/login")
        }} >Back to Admin/User Login</p>
      </form>
    </div>
  );
}

export default GuestLogin;
