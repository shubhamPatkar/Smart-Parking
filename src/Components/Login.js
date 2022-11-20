import {useEffect,useState} from 'react';
import '../CSS/login.css';
import { useNavigate  } from 'react-router-dom';
const loginData = require('../DataSet/login.json')


function Login (){
  const navigate = useNavigate ();
  const [userName,setUserName]=useState("");
  const [password,setPassword]=useState("");
 


  const sumbitDetails = ()=>{
   for(var i=0;i<loginData.length;i++)
   {
    if(loginData[i].userName==userName&&loginData[i].password==password)
    {
      navigate("/dashboard",{state:loginData[i]});
      break;
    }else if(i===loginData.length-1&&(loginData[i].userName!=userName&&loginData[i].password!=password))
    {
      alert("please enter correct credentials");
    }
   }

  }
  return (
    <div id="login">
   <div id="bg"></div>
    <form>
  <div class="form-field" >
    <input type="email" value={userName} onChange={(event)=>{
      setUserName(event.target.value)
    }} placeholder="Email / Username" required/>
  </div>
  
  <div class="form-field" >
    <input type="password" value={password} onChange={(event)=>{
      setPassword(event.target.value)
    }} placeholder="Password" required/>                         
    </div>
  
  <div class="form-field">
    <button class="btn" type="submit" onClick={()=>{sumbitDetails()}}>Log in</button>
  </div>
  <p id="guestLogin" onClick={()=>{
   navigate("/guestLogin")
  }} >Guest login click here</p>
</form>
</div>
  );
}

export default Login;
