const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(express.json());
/**
 * By using express.json(),
 *  Express automatically parses the JSON data and makes
 * it readily available in the req.body object.
 */

app.get("/", (req, res) => {
  res.json({ j: "kl" });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running ${process.env.PORT}`);
});
