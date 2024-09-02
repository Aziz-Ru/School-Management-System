import { Router } from "express";
import {
  addTimeSlot,
  getTimeSlots,
} from "../../controllers/admin/timeslot.controller.js";
import validatorHandler from "../../middlewares/common/validatorHandler.js";
import { timeslotValidator } from "../../middlewares/timeslot.middleware.js";
const router = Router({ strict: true });
router
  .route("/")
  .get(getTimeSlots)
  .post(timeslotValidator, validatorHandler, addTimeSlot)
  .delete();
export default router;
