import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const sendEmail = async (recipient, subject, content) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: recipient,
    subject: subject,
    text: content,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error("EMAIL_SENDING_ERROR");
  }
};

export default sendEmail;
