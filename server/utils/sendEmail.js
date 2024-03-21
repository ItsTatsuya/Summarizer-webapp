const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: 'p0828244@gmail.com',
                pass: 'Adithyan@123'
            }
        });

        // Send mail
        const info = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        });

        console.log("Email sent successfully:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendMail;
