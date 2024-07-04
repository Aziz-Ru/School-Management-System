const addUser = require("../controllers/post/userPostController");
const validatorHandler = require("../middlewares/common/validatorHandler");
const { addUserValidator } = require("../middlewares/userValidator");

const router = require("express").Router();

// Import AdminController

// Import validatorHandler

// Handle incoming HTTP requests to /admin
router.get('/:userId',)
router.post("/", addUserValidator, validatorHandler, addUser);

module.exports = router;
