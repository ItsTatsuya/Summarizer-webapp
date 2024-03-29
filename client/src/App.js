// import React, { useEffect, useState } from "react";
import {Login} from "./components/Login/Login.jsx";
import {Signup} from "./components/Signup/Signup.jsx";
import {HomePage} from "./components/HomePage/HomePage.jsx";
import {SummaryPage} from "./components/SummaryPage/SummaryPage.jsx";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import VerifyAccount from "./components/VerifyAccount/VerifyAccount.jsx"
import axios from "axios";
import {Toaster} from "react-hot-toast";
import "./App.css"

axios.defaults.baseURL="http://localhost:3001";
axios.defaults.withCredentials=true;

function App(props) {
  
  return (
    <div>
        <BrowserRouter>
        <Toaster position="top-center" toastOptions={{duration:5000}}/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>;
          <Route path="/summary" element={<SummaryPage/>}/>;
          <Route path="/register" element={<Signup/>}/>;
          <Route path="/login" element={<Login/>}/>
          <Route path="/activate-account" element={<VerifyAccount/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
