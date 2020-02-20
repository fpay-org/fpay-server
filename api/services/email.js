const nodemailer = require("nodemailer");
const config = require("../config/index");

exports.sendMail = (to, subject, body) => {
  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass
      }
    });

    var recepients = "";
    for (let i = 0; i < to.length - 1; i++) {
      recepients += to[i] + ", ";
    }
    recepients += to[to.length - 1];
    console.log(recepients);

    let mailOptions = {
      from: '"Fpay" <' + config.smtp.user + "> ",
      to: recepients,
      subject: subject,
      text: body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  });
};
