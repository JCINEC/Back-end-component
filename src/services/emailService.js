const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jciriazabal@gmail.com",
    pass: "wali ztiw uclt gpkl",
  },
});

const sendMail = async (to, subject, html) => {
  try {
    const options = {
      from: "jciriazabal@gmail.com",
      to: to,
      subject: subject,
      html: html,
    };
    await transporter.sendMail(options);
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendMail;
