import express from "express";
const router = express.Router();
import {
    mailUser
 
} from "../controllers/mailControllers.js";


router.route("/").post(mailUser)

export default router;
