import { Router } from "express";
import {
  addFaculty,
  deleteFaculty,
  getFaculties,
  getFaculty,
  updateFaculty,
} from "../../controllers/admin/faculty.controller.js";

const router = Router();

router.route("/").get(getFaculties).post(addFaculty).delete(deleteFaculty);
router.route("/:facId").get(getFaculty).put(updateFaculty);

export default router;
