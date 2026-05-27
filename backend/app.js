import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import uploadRoutes from "./src/routes/uploadRoutes.js"; 
import initWeaviate from "./src/services/initWeaviate.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import authRouter from "./src/routes/authRoutes.js";
dotenv.config();

const app = express();

connectDB();
await initWeaviate();
app.use(cors());
app.use(express.json());

// 2. Register the routes
// Using "/upload" here means the router will handle any request starting with /upload
app.use("/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
    res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

app.use("/api/auth",authRouter);