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
// app.use("/school", require("./routes/schoolHandler"));
app.use("/class", require("./routes/ClassHandler"));
app.use("/teacher", require("./routes/TeacherHandler"));
app.use("/school", require("./routes/schoolHandler"));
app.use("/student", require("./routes/StudentHandler"));
app.use("/admin", require("./routes/AdminHandler"));

// Not Found Handler
app.use(notFoundHandler);
// Default Error Handler
app.use(errorHandler);

// Listening
app.listen(process.env.PORT, () => {
  console.log(`App is running ${process.env.PORT}`);
});
