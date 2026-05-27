import express from "express";

import {
  chatWithDocs
} from "../controllers/chatController.js";

import authMiddleware
from "../middleware/authMiddleware.js";

const chatRouter =
express.Router();

chatRouter.post(

  "/",

  authMiddleware,

  chatWithDocs
);

export default chatRouter;