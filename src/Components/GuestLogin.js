import {useEffect,useState} from 'react';
import '../CSS/login.css';
import { useNavigate  } from 'react-router-dom';
import Login from './Login';


let loginData = require('../DataSet/login.json')


function GuestLogin (){
  const navigate = useNavigate ();
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [mobileNo,setMobileNo]=useState("");
  const [email,setEmail]=useState("");

  
  useEffect(()=>{
    if(localStorage.loginData==null)
    {
      localStorage.setItem('loginData', JSON.stringify(loginData));
    }
    
  },[])

  const sumbitDetails = ()=>{
  let guestId = 0;
   for(var i=0;i<loginData.length;i++)
   {
    if(loginData[i].userName==email)
    {
      guestId = loginData[i].loginId
      break
    }
   }

    if(guestId>0)
    {
      navigate("/dashboard",{state:loginData[i]});
    }else if(email!=""&&firstName!=""&&lastName!=""&&mobileNo!="")
    {
        var temp = loginData
        temp.push({
            "loginId":temp.length+1,
            "userName":email,
            "password":email,
            "firstName":firstName,
            "lastName":lastName,
            "vechicleNo":"",
            "profile":"Guest"
        })
        localStorage.setItem('loginData', JSON.stringify(temp));

       // writeJsonFile("./login.json",temp);
      navigate("/dashboard",{state:{
            "loginId":temp.length+1,
            "userName":email,
            "password":email,
            "firstName":firstName,
            "lastName":lastName,
            "vechicleNo":"",
            "profile":"Guest"
    }});
    }else{
      alert("something went wrong!");
    }
  }
  return (
    <div id="login">
   <div id="bg"></div>
    <form>
    <div class="form-field" >
    <input type="text" value={firstName} onChange={(event)=>{
      setFirstName(event.target.value)
    }} placeholder="FirstName" required/>
  </div>
  <div class="form-field" >
    <input type="text" value={lastName} onChange={(event)=>{
      setLastName(event.target.value)
    }} placeholder="LastName" required/>
  </div>
  <div class="form-field" >
    <input type="number" value={mobileNo} onChange={(event)=>{
      setMobileNo(event.target.value)
    }} placeholder="Mobile No" required/>
  </div>
  <div class="form-field" >
    <input type="Email" value={email} onChange={(event)=>{
      setEmail(event.target.value)
    }} placeholder="Email" required/>
  </div>
  
  
  <div class="form-field">
    <button class="btn" type="submit" onClick={()=>{sumbitDetails()}}>Log in</button>
  </div>
  <p id="guestLogin" onClick={()=>{
   navigate("/login")
  }} >Back to Admin/User Login</p>
</form>
</div>
  );
}

export default GuestLogin;
