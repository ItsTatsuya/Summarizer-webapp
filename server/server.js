const mongoose=require("./config/db.js")
const UserRouter=require("./router/UserRoutes");
const express=require('express');
const cors=require('cors');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')

const app=express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());



app.use("/",UserRouter);

app.listen(3001, () => {
  console.log('Server is running on port 5000');
});