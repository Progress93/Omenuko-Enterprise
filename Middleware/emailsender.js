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

const sendEmail = async (options) => {
    // Create a transporter
    const transporter = nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Send the email
    await transporter.sendMail(options);
};

module.exports = sendEmail;