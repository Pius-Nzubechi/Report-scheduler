const nodemailer = require("nodemailer");
const smtp = require("nodemailer-smtp-transport");

exports.notify = (mailList, subject, file) => {
  let res;

  const transporter = nodemailer.createTransport(
    smtp({
      service: "gmail",
      host: "mail.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );

  const mailOptions = {
    from: "alexandercaesar6@gmail.com",
    to: mailList,
    subject,
    html: `<h1>Please Review</h1>
    <p>Your report has arrived.</p>
    <br />
    attachment: ${file}
    <br />
    <p>Please do not reply to this mail</p>`,
  };

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("ready to take messages", success);
    }
  });

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    res = info;
    return info;
  });
  return res;
};
