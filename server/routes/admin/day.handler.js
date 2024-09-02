import { Router } from "express";
import {
  addDay,
  deleteDays,
  getDays,
} from "../../controllers/admin/day.controller.js";
import validatorHandler from "../../middlewares/common/validatorHandler.js";
import { addDayValidator } from "../../middlewares/day.middleware.js";

const router = Router({ strict: true });

router
  .route("/")
  .get(getDays)
  .post(addDayValidator, validatorHandler, addDay)
  .delete(deleteDays);

export default router;
