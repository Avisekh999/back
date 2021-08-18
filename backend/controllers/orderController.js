import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import Formidable from "formidable";
import crypto from "crypto";
import { Console } from "console";

dotenv.config();

const key_id = "rzp_test_t4ALCGOgK9QUYP";
const key_secret = "jMNsnPnjUqWoMPcUOloU4M83";
const instance = new Razorpay({
  key_id,
  key_secret,
});

// @desc Create new order
// @route POS /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc GET order by ID
// @route GET /api/orders/:id
// @access Private

const getOrderItems = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc UPDATE order to paid
// @route GET /api/orders/:id/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc UPDATE order to delivered
// @route GET /api/orders/:id/delivered
// @access Private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc GET logged in user orders
// @route GET /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc GET all orders
// @route GET /api/orders
// @access Private Admin

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

const getOrders_payment = asyncHandler(async (req, res) => {
  const orders_payment = await Order.find({}).populate("user", "id name");
  res.json(orders_payment);
});

const paymentOrder = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const orders1 = await Order.findById(req.params.id).populate(
    "user",
    "id name"
  );
  // res.json(orders1.totalPrice);

  const amount = parseInt(orders1.totalPrice * 100);
  const currency = "INR";
  const receipt = orders1.user.name;
  const notes = orders1._id;

  instance.orders.create(
    { amount, currency, receipt, notes },
    (error, orderp) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(orderp);
    }
  );
});

const verifyPayment =asyncHandler(async (req, res) => {
  //do a validation
  const secret = "1234";
  // const requestedBody = JSON.stringify(req.body)

  // console.log(requestedBody)
  // const shasum = crypto.createHmac("sha256", secret).update(requestedBody).digest('hex');

  //   console.log(shasum, req.headers['x-razorpay-signature'])
  //   if (shasum === req.headers["x-razorpay-signature"]) {
  //     console.log("request is legit");
  //     res.status(200).json({
  //       message: "OK",
  //     });
  //   } else {
  //     res.status(403).json({ message: "Invalid" });
  //   }

  const body = req.body
  console.log(body)
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body.toString())
    .digest("hex");

  // Compare the signatures
  console.log(expectedSignature)
  console.log(req.headers['x-razorpay-signature'] )
  if (expectedSignature.length ===  req.headers['x-razorpay-signature'].length) {
    // if same, then find the previosuly stored record using orderId,
    // and update paymentId and signature, and set status to paid.
    // await PaymentDetail.findOneAndUpdate(
    //   { orderId: req.body.razorpay_order_id },
    //   {
    //     paymentId: req.body.razorpay_payment_id,
    //     signature: req.body.razorpay_signature,
    //     status: "paid",
    //   },
    //   { new: true },
    //   function (err, doc) {
    //     // Throw er if failed to save
    //     if (err) {
    //       throw err;
    //     }
    //     // Render payment success page, if saved succeffully
    //     res.render("pages/payment/success", {
    //       title: "Payment verification successful",
    //       paymentDetail: doc,
    //     });
    //   }
    // );
    console.log("verified")

  } else {
    console.log(" Not verified")
  }
});






export {
  addOrderItems,
  getOrderItems,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  paymentOrder,
  getOrders_payment,
  verifyPayment,
};
