const UserModel = require("../models/User");
const bcrypt = require('bcrypt');

const passwordCompare = async (password, userPassword) => {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    return isPasswordValid;
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await UserModel.findOne({ email });

        // If user doesn't exist
        if (!user) {
            return res.json({
                error: "email not found"
            });
        }

        // Compare passwords
        const isPasswordValid = await passwordCompare(password, user.password);

        if (isPasswordValid && user.verified===true) {
            await UserModel.updateOne({ email: email }, { $set: {login:true} });
            return res.json({ success: "Login successful" });
        } else {
            return res.json({ error: "Incorrect Password" });
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error:", error);
        
        // Check for specific error types (if necessary)
        if (error instanceof SomeSpecificError) {
            // Handle specific error
            return res.status(500).json({ error: "Specific error occurred" });
        }

        // Handle other errors with a generic message
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = login;
