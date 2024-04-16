const express = require("express");
const cors = require("cors");
const getSummary = require("../Controllers/getSummary")


const router = express.Router();

router.use(cors({
    credentials: true,
    origin: "http://localhost:3000" // Allow requests from this origin
}));


router.post("/summary",getSummary);


module.exports = router;