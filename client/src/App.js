// import React, { useEffect, useState } from "react";
import {Login} from "./components/Login/Login.jsx"
import {Signup} from "./components/Signup/Signup.jsx"
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App(props) {
  
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup/>}/>;
          <Route path="/login" element={<Login/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
