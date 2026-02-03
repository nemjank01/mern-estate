import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js ";

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected"));

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
