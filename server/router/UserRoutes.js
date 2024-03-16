const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require("../models/User.js");

const router = express.Router();

router.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            UserModel.create({ name, email, password: hash })
                .then(user => res.json({ status: "Ok" }))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
});

module.exports = router;
