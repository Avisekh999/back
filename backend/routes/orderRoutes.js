import express from "express";
const router = express.Router();
import {
    addOrderItems,
    getOrderItems,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders, 
    getOrders,
    paymentOrder,
    getOrders_payment,
    verifyPayment
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";


router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/payment").get(getOrders_payment);
router.route("/payment/:id").get(paymentOrder);
router.route("/verification").post(verifyPayment)
router.route("/myorders").get(protect, getMyOrders)
router.route("/:id").get(protect,getOrderItems);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect,admin, updateOrderToDelivered);

// router.post("/payment/callback", paymentCallback);

export default router;
