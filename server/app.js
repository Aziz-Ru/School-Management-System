import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import AdminRouter from "./routes/admin.route";

const app = express();
dotenv.config();

/**
 * By using express.json(),
 *  Express automatically parses the JSON data and makes
 * it readily available in the req.body object.
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routing

// app.use("/teacher", require("./routes/teacherHandler").default);
// app.use("/student", require("./routes/studentHandler").default);
app.use("/admin", AdminRouter);

// Not Found Handler
// app.use(NotFoundHandler);
// Default Error Handler
// app.use(errorHandler);

// Listening
app.listen(process.env.PORT, () => {
  console.log(`App is running ${process.env.PORT}`);
});
