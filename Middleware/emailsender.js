// const nodemailer = require("nodemailer");
// const sendEmail = async (options) => {
//   // Create a transporter
//   const transporter = nodemailer.createTransporter({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   // Send the email
//   await transporter.sendMail(options);
// };
const nodemailer = require("nodemailer");

// create a transporter object
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };

    try {
    await transporter.sendMail(mailOptions);
console.log("Email sender middleware loaded successfully");
} catch (error) {
    console.error("Error loading email sender middleware:", error);
}
};

module.exports = sendEmail;