const nodemailer = require("nodemailer");
require('dotenv').config();

const verifyEmail = async (email, link) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
            },
        });

        let info = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: "Account Verification",
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
                        <h2 style="color: #333333;">Welcome to Our Platform!</h2>
                        <p style="color: #666666;">Thank you for registering an account with us. To get started, please click the link below to verify your email address:</p>
                        <a href="${link}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 3px;">Verify Your Email</a>
                        <p style="color: #666666;">If you did not sign up for an account, you can safely ignore this email.</p>
                    </div>
                    <p style="color: #999999; font-size: 12px; margin-top: 20px;">This email was sent automatically. Please do not reply to this email.</p>
                </div>
            `
        });

        console.log("Email sent successfully");

    } catch (error) {
        console.log(error, "Mail sent failed");
    }
};

module.exports = verifyEmail;
