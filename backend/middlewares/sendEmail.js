
const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "CircleUp",
        address: process.env.BREVO_SENDER_EMAIL,
      },
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);

    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("Brevo email error:", {
      code: error.code,
      response: error.response,
      message: error.message,
    });

    return {
      success: false,
      message: "Failed to send email",
    };
  }
};
