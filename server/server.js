const mongoose = require("./config/db.js");
const UserRouter = require("./router/UserRoutes");
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json());


app.use(cookieParser());

// Routes
app.use("/", UserRouter);

// Start server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
