import express from "express";
import {
    chatWithDocs
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/", chatWithDocs);

export default router;