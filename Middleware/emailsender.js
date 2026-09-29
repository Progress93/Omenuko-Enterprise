const transporter = require("../Config/emailconfig");


const sendEmail = async (options) => {
await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    text: options.text
});
};
module.exports = sendEmail;