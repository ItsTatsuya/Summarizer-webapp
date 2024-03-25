const UserModel = require("../models/User.js");
const passwordValidator = require("../helper/register");
const { passChecking, hashPassword } = require("../helper/register");
const Token = require("../models/Token.js");
const crypto = require("crypto");
const verifyEmail = require("../utils/verifyEmail");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if name, email, and password are entered
        if (!name || !email || !password) {
            return res.status(400).json({
                error: "Name, email, and password are required"
            });
        }

        // Check if email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            if (existingUser.verified) {
                return res.status(400).json({ error: "Email already exists" });
            } else {
                // If email exists but not verified, delete the user
                await UserModel.findOneAndDelete({ _id: existingUser._id });
            }
        }

        // Validate password
        const passwordErrors = passwordValidator.passChecking(password);
        if (passwordErrors !== 'True') {
            return res.status(400).json({ error: passwordErrors });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const newUser = await UserModel.create({ name, email, password: hashedPassword });

        // Generate a verification token
        const token = await Token.create({
            userId: newUser._id,
            token: crypto.randomBytes(16).toString("hex")
        });

        // Send verification email
        const link = `http://localhost:3000/activate-account?token=${token.token}`;
        await verifyEmail(email, link);

        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { registerUser };
