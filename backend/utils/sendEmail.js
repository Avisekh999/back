import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  console.log(options)
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'bussinessgrow991@gmail.com',
      pass: process.env.NODEMAILER
    },
  });

  // send mail with defined transport object
  const message = {
    from: "bussinessgrow991@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  const info = await transporter.sendMail(message);
  console.log('Message sent: %s', info.messageId);
};

export default sendEmail;
