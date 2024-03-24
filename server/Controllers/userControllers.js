const UserModel = require("../models/User.js");
const passwordValidator = require("../helper/register");
const { passChecking, hashPassword } = require("../helper/register");
const Token=require("../models/Token.js"); 
const crypto=require("crypto");
const verifyEmail = require("../utils/verifyEmail");


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
    
        // // Check if name and password are entered
        if (!name) {
            return res.json({
                error: "Name is required"
            });
        }

        //check email
        if (!email) {
            return res.json({ error: "Email is required" });
        }
        const checkEmail = await UserModel.findOne({ email });
        if (checkEmail) {
            return res.json({ error: "Email already exists" });
        }

        //password
        if (!password) {
            return res.json({
                error: "Password is required"
            });
        }

        // Validate password
    const passwordErrors = passwordValidator.passChecking(password);

    if (passwordErrors !== 'True') {
        return res.json({ error: passwordErrors });
    }

        //calling password hash
        const hashedPassword = await hashPassword(password);

        //posting to db
        const user = await UserModel.create({ name, email, password: hashedPassword });

        const token = await Token.create({
            userId:user._id,
            token:crypto.randomBytes(16).toString("hex")
        });

        const link=`http://localhost:3000/activate-account?token=${token.token}`;
        await verifyEmail(user.email,link);
        
        return res.json({ user });

        
    } catch (error) {
        // Handle unexpected errors
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { registerUser };
