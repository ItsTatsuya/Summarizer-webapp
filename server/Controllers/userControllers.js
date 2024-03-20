const UserModel = require("../models/User.js");
const passwordValidator = require("../helper/register");

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


        //posting to db
        const user = await UserModel.create({ name, email, password});
        return res.json({ user });


        
       
        

        

        //calling password hash
        // const hash = hashPassword(password);

        //creating db collection
        
    } catch (error) {
        // Handle unexpected errors
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { registerUser };
