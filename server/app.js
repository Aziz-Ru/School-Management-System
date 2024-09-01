"use strict";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/common/errorHandler.js";
import admin from "./routes/admin.route.js";
import auth from "./routes/auth.route.js";
const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routing
app.use("/api/auth", auth);
app.use("/api/admin", admin);

// Not Found Handler
app.use(notFoundHandler);
app.use(errorHandler);

// Listening
app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running 'http://localhost:5000/api'`);
});
