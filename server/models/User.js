const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    verified:{
        type:Boolean,
        default:false,
    },
    login:{
        type:Boolean,
        default:false,
    },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
