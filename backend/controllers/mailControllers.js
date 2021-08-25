import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import Order from "../models/orderModel.js";

const mailUser = asyncHandler(async (req, res) => {
  // Use Smtp Protocol to send Email
  console.log(req.params.id)


  const order_data = await Order.findById(req.params.id).populate("user","name email")

  const { shippingAddress, orderItems, totalPrice, user } = order_data;
  const itemsData = orderItems.map(item => `<li>Product Name: ${item.name}, Quantity: ${item.qty}</li>`);
  const {address, city, postalCode, country} = shippingAddress

  const paymentInfo = `<b>New Order has been placed. Kindly check the details below:</b> <br /> Customer Name: ${user.name} <br />
  <strong>Customer Email</strong>: ${user.email} <br />
  <strong>Order Items</strong>: <ul>${itemsData}</ul> <br />
  <strong>Total Price</strong>: ${totalPrice} <br />
  <strong>Shipping Address: ${address}, ${city}, ${postalCode}, ${country} <br />`

 const smtpTrans = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
      // 
        user: 'bussinessgrow991@gmail.com',
        pass: process.env.NODEMAILER
    
  }})
  const mail = {
    from: "bussinessgrow991@gmail.com",
    to: `kundustores1972@gmail.com, ${user.email}`,
    subject: "Send Email Using Node.js",
    text: "New Order has been placed refer your admin panel ASAP",
    html: paymentInfo,

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
