const express=require("express");
const cors=require("cors");
const bcrypt= require("bcrypt");
const login=require("../Controllers/LoginController");


const router = express.Router(); 

router.use(cors({
    credentials: true,
    origin: "http://localhost:3000" // Allow requests from this origin
  }));


  router.post("/login",login);

  module.exports=router;