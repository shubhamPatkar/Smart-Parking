/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-key */
import {React,useEffect,useState} from "react";
import "../CSS/dashboard.css";
import "../CSS/card.css"
import "../CSS/model.css"
import "../CSS/login.css"
import car from "../Assets/img/car.gif"
import parkedCar from "../Assets/img/parked_car.gif"
import pending_car from "../Assets/img/pending_car.jpg"
import { useLocation  } from "react-router-dom";
import Menu from "./Menu";
import axios from "axios";


function Dashboard (){
  const location = useLocation();

  const [modelStatus,setModelStatus] = useState(false);
  const [modelStatusForAdmin,setModelStatusForAdmin] = useState(false);
  const [index,setIndex] = useState(0);
  const [vehicleNo,setvehicleNo] = useState(location.state?.loginData?.vehicleNo);
  const [date,setDate] = useState("");
  const [profile] = useState(location.state?.loginData?.profile);
  const [data,setData] = useState([]);
  const [firstName]=useState(location.state?.loginData?.firstName);
  const [lastName]=useState(location.state?.loginData?.lastName);
  const [userName]=useState(location.state?.loginData?.userName);
  const [bearerToken] = useState(location.state?.token);
  const [loginId,setLoginId] = useState(location.state?.loginData?._id);
  const [parkingId,setParkingId] = useState("");
  const [message,setMessage] =useState("");

  {/* After rendering calling getdetails for parking */}
  useEffect(()=>{
    getDetails();
  },[]);

  {/* get all set parking details */}
  const getDetails = ()=>{
    const config = {
      method: "get",
      url: "parking/getParkingDetails",
      headers: { 
        "Authorization": "Bearer "+bearerToken
      }
    };
    axios(config) 
      .then(function (response) {
        if(response.status===200)
        {
          setData(response.data.parkingData)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  {/* action on each card by user, guest and admin */}
  const modalClick=(index)=>{
    setParkingId(data[index]._id);
    setIndex(index);
   
    if(data[index].status!="open"&&profile==="Admin")
    {
      const config = {
        method: "get",
        url: "login/getLoginDetailsbyId/"+data[index].loginId,
        headers: { 
          "Authorization": "Bearer "+bearerToken
        }
      };
      axios(config) 
        .then(function (response) {
          if(response.status===200)
          {
            const temp = response.data.loginData
            setParkingId(data[index]._id);
            setLoginId(temp._id);
            if(data[index].status==="Pending")
            {
              setMessage(temp.firstName+" "+temp.lastName+ " is a "+temp.profile+" of vehicle number "+temp.vehicleNo
            +" raised request on "+data[index].date+" Do u want to accept the  request?")
            }else{
              setMessage(temp.firstName+" "+temp.lastName+ " is a "+temp.profile+" of vehicle number "+temp.vehicleNo
            +" allot space on "+data[index].date+" Do u want to remove from parking?");
            }
            setModelStatusForAdmin(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      
    }else if(data[index].status==="open"){
      const config = {
        method: "get",
        url: "login/getLoginDetailsbyId/"+location.state.loginData?._id ,
        headers: { 
          "Authorization": "Bearer "+bearerToken
        }
      };
      axios(config) 
        .then(function (response) {
          if(response.status===200)
          {
            const temp = response.data.loginData
            setParkingId(data[index]._id);
            setLoginId(temp._id);
            setModelStatus(true);
          }
        })
    }
  }

  {/* Raising request by user guest and login for parking */}
  const submitDetails = ()=>{
    const profileForStatus = profile==="Admin"||profile==="User"?(data[index].status==="Approved"?"open":"Approved"):"Pending"
    const obj={
      "_id":parkingId,
      "loginId":loginId,
      "date":profileForStatus==="open"?"":(data[index].date==""?date:data[index].date),
      "seatNo":index+1,
      "status":profileForStatus
    }
    const config = {
      method: "put",
      url: "parking/updateParkingDetails",
      headers: { 
        "Authorization": "Bearer "+bearerToken
      },
      data:obj
    };

    axios(config)
      .then(function (response) {
        setModelStatusForAdmin(false);
        setModelStatus(false);
        alert(response.data.message);
        getDetails();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  
  

  return (
    <>
      <section className="top-nav" role="dashboard">
        <div>
          <b>{firstName}{" "}{lastName}</b><br/>
          <b>{vehicleNo}</b>
        </div>
        <ul className="menu" style={{cursor: "pointer"}}>
          <li><Menu  firstName={firstName} lastName={lastName} vehicleNo={vehicleNo} userName={userName} profile={profile} /></li>
        </ul>
      </section>

      <div className="cards-list">
        {/*Modal box for raising request */}
        <div id="demo-modal" className="modal" role="dialog" tabIndex="-1" open={modelStatus}>
          <div className="model-inner">
            <div className="modal-header">
              <h3><b>Booking for seat no {index+1}</b></h3>
              <button className="modal-close" data-id="demo-modal" aria-label="Close" onClick={()=>{setModelStatus(false)}}>
                &times;
              </button> 
            </div>
            <form>
              <div className="form-field" >
                <input type="text" value={vehicleNo} onChange={(event)=>{
                  setvehicleNo(event.target.value)
                }} placeholder="Vechicle No" required/>
              </div>
      
              <div className="form-field" >
                <input type="date" value={date} onChange={(event)=>{
                  setDate(event.target.value)
                }} placeholder="Date" required/>                         
              </div>
                
              <div className="form-field">
                <button className="btn" type="button" onClick={()=>{submitDetails()}}>Submit</button>
              </div>                          
            </form>
          </div>
        </div>

        {/*Modal box for admin actions */}
        <div id="demo-modal" className="modal" role="dialog" tabIndex="-1" open={modelStatusForAdmin}>
          <div className="model-inner">
            <div className="modal-header">
              <h3><b>Booking for seat no {index+1}</b></h3>
              <button className="modal-close" data-id="demo-modal" aria-label="Close" onClick={()=>{setModelStatusForAdmin(false)}}>
                &times;
              </button> 
            </div>
            <form>
              <b>{message}</b>
                
              <div className="form-field">
                <button className="btn"  type="button" onClick={()=>{submitDetails()}}>Confirm</button>
                <button className="btn" style={{backgroundColor:"red"}} type="button" onClick={()=>{setModelStatusForAdmin(false)}}>Cancel</button>

              </div>                          
            </form>
          </div>
        </div>
        
        {/*Rendering all the parking slots */}
        {data.map((key,index)=>{
          return(
            <div className="card 4" onClick={()=>{modalClick(index)}}>
              <div className="card_image">
                <img src={key.status==="Approved"?parkedCar:(key.status==="Pending"?pending_car:car)} alt="logo" />
              </div>
              <div className="card_title" >
                <p className={key.status}>{key.status} {index+1}</p>
              </div>
            </div>
          )
        })}
   
      </div>
    </>
  );
}

export default Dashboard;


 