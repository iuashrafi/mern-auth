import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const port = process.env.PORT || 5000;
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
/*
    Routes Design
    - POST /api/users - Register a user
    - POST /api/users/auth - Authenticate a user and get token
    - POST /api/users/logout - logout user and clear cookie
    - GET /api/users/profile - Get user profile
    - PUT /api/user/profile - Update profile
 */
app.use("/api/users", userRoutes);
app.get("/", (req, res) => res.send("Server is ready"));

// ERROR HANDLER MIDDLEWARE (Last middleware to use)
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
