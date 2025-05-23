const { verify } = require("jsonwebtoken");
const Token = require("../models/Token");
const UserModel = require("../models/User.js");

const activateAccount = async (req, res) => {
    try {
        const token = await Token.findOne({
            token:  req.query.token,
        });

        if (!token) {
            return res.status(500).json({ message: "Invalid token" });
        }

        await UserModel.updateOne({ _id: token.userId }, { $set: { verified: true ,login:true} });
        await Token.findOneAndDelete({ _id: token._id });


        return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {activateAccount};
