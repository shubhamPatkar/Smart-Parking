import React from "react";
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import "./App.css";
import Login from "./Components/Login"
import GuestLogin from "./Components/GuestLogin";

import Dashboard from "./Components/Dashboard"
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/guestLogin" element={<GuestLogin/>}/>
        <Route exact path="/logout" element={<Login/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );  
}

export default App;
