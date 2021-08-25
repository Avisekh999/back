import express from "express";
const router = express.Router();
import {
    mailUser
 
} from "../controllers/mailControllers.js";


router.route("/:id").post(mailUser)

export default router;
