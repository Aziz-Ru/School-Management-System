const router = require("express").Router();

// Import AdminController

// Import validatorHandler

// Handle incoming HTTP requests to /admin
router.get("/", (req, res) => {
  res.send("Admin route");
});

module.exports = router;
