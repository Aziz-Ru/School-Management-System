const router = require("express").Router();

import {
  addSchool,
  deleteSchool,
  getSchool,
} from "../../controllers/SchoolController";

import {
  addSchoolValidator,
  getSchoolValidator,
} from "../../middlewares/SchoolValidator";
import validatorHandler from "../../middlewares/common/validatorHandler";

router.get("/", getSchool);
router.post("/", addSchoolValidator, validatorHandler, addSchool);
router.delete("/:id", getSchoolValidator, validatorHandler, deleteSchool);

export default router;
