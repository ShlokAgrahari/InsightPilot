import express from "express";

import protect from
"../middleware/authMiddleware.js";

import {
    deleteDocument
}
from
"../controllers/deleteDocumentController.js";

const router =
express.Router();

router.delete(
    "/:id",
    protect,
    deleteDocument
);

export default router;