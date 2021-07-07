const nodemailer = require('nodemailer');
async function sendMail({from, to, subject, text, html}){
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_APP_KEY,
  }
  });

  let message = {
    from: `inShare <${from}>`,
    to,
    subject,
    text,
    html
  };

  await transporter.sendMail(message, (err, info) => {
    if (err) console.log('Error occurred. ' + err.message);
  });
}

module.exports = sendMail;
