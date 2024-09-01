const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Student route");
});

export default router;
