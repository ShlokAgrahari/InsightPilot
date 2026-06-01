import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./src/config/db.js";

import uploadRouter from "./src/routes/uploadRoutes.js";
import chatRouter from "./src/routes/chatRoutes.js";
import authRouter from "./src/routes/authRoutes.js";

import initWeaviate from "./src/services/initWeaviate.js";
import documentRoutes from "./src/routes/documentRoutes.js";
 
const app = express();

connectDB();

await initWeaviate();

app.use(cors());

app.use(express.json());

// ROUTES
app.use(
  "/api/auth",
  authRouter
);

app.use(
  "/api/chat",
  chatRouter
);

app.use(
  "/api/documents",
  uploadRouter
);

app.use(
  "/api/documents",
  documentRoutes
);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );
});