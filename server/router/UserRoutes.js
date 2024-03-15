const express = require("express");
const User = require("../models/User.js");
const bcrypt = require('bcrypt');
const router = express.Router();

router.post("/register", (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10).then(hash => {
        const newUser = new User({ email, password: hash });
        User.create(newUser)
            .then(() => res.status(200).json({ message: "User registered" }))
            .catch(err => res.status(500).json({ error: "User registration failed" }));
    }).catch(err=>res.json(err));
});

module.exports = router;