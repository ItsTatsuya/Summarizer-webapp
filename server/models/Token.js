const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
    userId: {
        type: String,
        ref: "User",
        required: true,
    },

    token: {
        type: String,
        required: true,
    }
});

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
