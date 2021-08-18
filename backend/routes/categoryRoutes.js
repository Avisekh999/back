import express from "express";
const router = express.Router();
import { createCategory, getCategories } from "../controllers/categoryController.js"; 
import { protect, admin } from "../middleware/authMiddleware.js";


router.route("/create").post(createCategory)
router.route("/getCategories").get(getCategories)






export default router;