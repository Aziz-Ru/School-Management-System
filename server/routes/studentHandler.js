const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Student route");
});

module.exports = router;
