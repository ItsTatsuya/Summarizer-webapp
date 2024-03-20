const express = require('express');
const cors=require('cors');
const { registerUser } = require('../Controllers/userControllers');

const router = express.Router();

// //midleware
router.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}));

// router.get("/register",);
router.post("/register",registerUser);

module.exports = router;
