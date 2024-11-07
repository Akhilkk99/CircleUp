const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false, 
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASSWORD
            },
            tls: {
                rejectUnauthorized: false // Remove SSLv3 and use this option instead
            }
        });

        const mailOptions = {
            from: process.env.AUTH_EMAIL, 
            to: options.email, 
            subject: options.subject, 
            text: options.message 
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response); // Log the response to check for success
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: error.message };
    }
};
