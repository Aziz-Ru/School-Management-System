import { Router } from "express";
import {
  addSchool,
  getSchool,
} from "../../controllers/admin/school.controller.js";
import validatorHandler from "../../middlewares/common/validatorHandler.js";
import { addSchoolValidator } from "../../middlewares/school.middleware.js";

const router = Router({ strict: true });

router
  .route("/")
  .get(getSchool)
  .post(addSchoolValidator, validatorHandler, addSchool);

export default router;
