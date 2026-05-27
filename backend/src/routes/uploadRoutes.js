import express from "express";

import authMiddleware
from "../middleware/authMiddleware.js";

import upload from
"../middleware/uploadMiddleware.js";

import {

  uploadDocument,

  getDocuments

} from
"../controllers/uploadController.js";

const uploadRouter =
express.Router();

uploadRouter.post(

  "/upload",

  authMiddleware,

  upload.single("pdf"),

  uploadDocument
);

uploadRouter.get(

  "/",

  authMiddleware,

  getDocuments
);

export default uploadRouter;