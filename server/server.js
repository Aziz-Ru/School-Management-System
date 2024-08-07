// External Import
const express = require("express");
const dotenv = require("dotenv");

const cookieParser = require("cookie-parser");

// Internal Import
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

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

app.use("/teacher", require("./routes/teacherHandler"));
app.use("/student", require("./routes/studentHandler"));
app.use("/admin", require("./routes/adminHandler"));

// Not Found Handler
app.use(notFoundHandler);
// Default Error Handler
app.use(errorHandler);

// Listening
app.listen(process.env.PORT, () => {
  console.log(`App is running ${process.env.PORT}`);
});
