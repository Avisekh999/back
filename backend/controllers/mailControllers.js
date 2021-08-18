import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

const mailUser = asyncHandler(async (req, res) => {
  // Use Smtp Protocol to send Email
  
 const smtpTrans = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
      // 
        user: 'avisekhgurung099@gmail.com',
        pass: process.env.NODEMAILER
    
  }})
  const mail = {
    from: "avisekhgurung099@gmail.com",
    to: "kundustores1972@gmail.com",
    subject: "Send Email Using Node.js",
    text: "New Order has been placed refer your admin panel ASAP",
    html: "<b>New Order has been placed Kindly check your Admin panel for further details</b> <br />",

  };

  smtpTrans.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      res.json({ message: response.message });
      console.log("Message sent: " + response.message);
    }

    smtpTrans.close();
  });
});

export { mailUser };
