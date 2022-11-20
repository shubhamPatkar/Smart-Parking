import {useEffect,useState} from 'react';
import '../CSS/dashboard.css';
import '../CSS/card.css'
import '../CSS/model.css'
import '../CSS/login.css'
import car from '../Assets/img/car.gif'
import parkedCar from '../Assets/img/parked_car.gif'
import pending_car from '../Assets/img/pending_car.jpg'
import { useNavigate,useLocation, json  } from 'react-router-dom';
import Menu from './Menu';


const data = require('../DataSet/dashboard.json')
const loginData = require('../DataSet/login.json')

function Dashboard (){
  const navigate = useNavigate ();
const location = useLocation();
  const profileWithStringify = (localStorage.profileData==null||localStorage.profileData=="null")?location.state:JSON.parse(localStorage.profileData);

const [modelStatus,setModelStatus] = useState(false);
const [index,setIndex] = useState(false);
const [vechicleNo,setVechicleNo] = useState(location.state==null?profileWithStringify.vechicleNo:location.state.vechicleNo);
const [date,setDate] = useState("");
const [profile,setProfile] = useState(location.state==null?(profileWithStringify.profile):location.state.profile);
const [modelStatusforProfile,setModelStatusforProfile] = useState(false);
const [datawithLocal,setDatawithLocal] = useState([]);

useEffect(()=>{
    if(profile==null||profile=="")
    {
        alert("Something wend wrong!");
        navigate("/");
    }else if(localStorage.getItem("parkData")==null){
      let parkDataforlocal = JSON.stringify(data);
      localStorage.setItem("parkData",parkDataforlocal);
      let profileData = JSON.stringify(location.state)
      if(profileData!="null")
      {
        localStorage.setItem("profileData",profileData);
      }

      setDatawithLocal(data);
    }else{
      let profileData = JSON.stringify(location.state)
      if(profileData!="null")
      {
        localStorage.setItem("profileData",profileData);
      }
      
      setDatawithLocal(JSON.parse(localStorage.parkData));
      
    }
},[])

  const calltoAlloworReject = (status,indexValue)=>{
    if(status)
    {
      datawithLocal[indexValue].status="Approved"
      let parkDataforlocal = JSON.stringify(datawithLocal);
      localStorage.setItem("parkData",parkDataforlocal);
      window.location.reload();
    }else{
      datawithLocal[indexValue].status="open"
      let parkDataforlocal = JSON.stringify(datawithLocal);
      localStorage.setItem("parkData",parkDataforlocal);
      window.location.reload();

    }
  }

  const calltoApprovedEmpty = (status,indexValue)=>{
    if(status)
    {
      datawithLocal[indexValue].status="open"
      let parkDataforlocal = JSON.stringify(datawithLocal);
      localStorage.setItem("parkData",parkDataforlocal);
      window.location.reload();
    }
  }

    const sumbitDetails = ()=>{
        if(profile!=""&&(profile=="Admin"||profile.toLowerCase()=="user"))
        {
            let objData={};
            for(var i=0;i<loginData.length;i++)
            {
                if(loginData[i].loginId==location.state.loginId)
                {
                    objData=loginData[i];
                    break;
                }
            }
            if(objData.userName)
            {
              var temp = JSON.parse(localStorage.parkData);
              temp[index].loginId =objData.loginId 
              temp[index].userName = objData.userName
              temp[index].firstName = objData.firstName
              temp[index].lastName = objData.lastName
              temp[index].vechicleNo = vechicleNo
              temp[index].seatNo = index
              temp[index].date = date
              temp[index].status = "Approved"
              let tempwithStringify = JSON.stringify(temp)
              localStorage.setItem("parkData",tempwithStringify)
                alert("Space Alloted");
            }
        }else{
         
          var temp = JSON.parse(localStorage.parkData);
          temp[index].loginId =location.state.loginId 
          temp[index].userName = location.state.userName
          temp[index].firstName = location.state.firstName
          temp[index].lastName = location.state.lastName
          temp[index].vechicleNo = vechicleNo
          temp[index].seatNo = index
          temp[index].date = date
          temp[index].status = "Raised"
          let tempwithStringify = JSON.stringify(temp)
          localStorage.setItem("parkData",tempwithStringify)
            alert("request raised");
        }
   }

  return (
    <>
   <section class="top-nav">
    <div>
    <b>{location.state==null?profileWithStringify.firstName:location.state.firstName}{" "}{location.state==null?profileWithStringify.lastName:location.state.lastName}<br />
    {location.state==null?profileWithStringify.vechicleNo:location.state.vechicleNo}</b>
    </div>
    <input id="menu-toggle" type="checkbox" />
    <label class='menu-button-container' for="menu-toggle">
    <div class='menu-button'></div>
  </label>
    <ul class="menu" style={{cursor: "pointer"}}>
      
      <li><Menu  firstName={location.state==null?profileWithStringify.firstName:location.state.firstName} lastName={location.state==null?profileWithStringify.lastName:location.state.lastName} vechicleNo={location.state==null?profileWithStringify.vechicleNo:location.state.vechicleNo} userName={location.state==null?profileWithStringify.userName:location.state.userName} profile={profile} /></li>
      
    </ul>
  </section>
  <div class="cards-list">
  <div id="demo-modal" class="modal" role="dialog" tabindex="-1" open={modelStatus}>
      <div class="model-inner">
        <div class="modal-header">
          <h3><b>Booking for seat no {index+1}</b></h3>
          <button class="modal-close" data-id="demo-modal" aria-label="Close" onClick={()=>{setModelStatus(false)}}>
            &times;
          </button> 
        </div>
        <form>
        <div class="form-field" >
    <input type="text" value={vechicleNo} onChange={(event)=>{
      setVechicleNo(event.target.value)
    }} placeholder="Vechicle No" required/>
  </div>
  
  <div class="form-field" >
    <input type="date" value={date} onChange={(event)=>{
      setDate(event.target.value)
    }} placeholder="Date" required/>                         
    </div>
  
  <div class="form-field">
    <button class="btn" type="submit" onClick={()=>{sumbitDetails()}}>Submit</button>
  </div>
  </form>
      </div>
    </div>
    
    

    {datawithLocal.map((key,index)=>{
        return(
         <div class="card 4" onClick={()=>{
            if(key.status==="Approved"&&profile==="Admin")
            {
              let x = window.confirm("Alerady Alloted by user "+key.firstName+" "+key.lastName+" for parking on "+key.date+". Do you want to remove?");
              calltoApprovedEmpty(x,index)
            }  
          else if(key.status==="Approved")
            {
                alert("Alerady Alloted by user "+key.firstName+" "+key.lastName);
            }else if(key.status==="Raised"&&profile==="Admin"){
              let x = window.confirm("Allow guest "+key.firstName+" "+key.lastName+" to car parking for "+key.date+" ?");
              calltoAlloworReject(x,index)
            }else if(key.status==="Raised")
            {
              alert("Request raisd by guest "+key.firstName+" "+key.lastName)
            
            } 
            else{
            setModelStatus(true);
            setIndex(index);
            }
         }}>
         <div class="card_image">
         <img src={key.status==="Approved"?parkedCar:(key.status==="Raised"?pending_car:car)} alt="logo" />
           </div>
         <div class="card_title title-white">
           <p style={{color:key.status==="Approved"?"white":(key.status==="Raised"?"darkblue":"red")}}>{key.status==="Approved"?"Parked":(key.status==="Raised"?"Pending":"open")} {index+1}</p>
         </div>
       </div>
        )
    })}
   
  </div>
</>
  );
}

export default Dashboard;


 