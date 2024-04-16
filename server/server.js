const mongoose = require("./config/db.js");
const UserRouter = require("./router/UserRoutes");
const LoginRouter =require("./router/LoginRouter.js");
const SummaryRouter=require("./router/SummaryRouter.js")
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportSetup = require("./config/passport-config.js")
const relatedVideos = require("./utils/getRelated.js")
require("dotenv").config()


const app = express();

app.get('/related-videos', relatedVideos);
// Middleware

app.use(session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: false
  }));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


app.use(cookieParser());

// Routes
app.use("/", UserRouter);
app.use("/",LoginRouter);
app.use("/",SummaryRouter);

// Start server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
