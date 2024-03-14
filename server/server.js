const express =require('express');
const mongoose=require("./config/db.js")
const UserRouter=require("./router/UserRoutes");

const app=express();

app.use(express.json());

app.use("./api/user",UserRouter);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});