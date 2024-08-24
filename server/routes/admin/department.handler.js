import { Router } from "express";
import {
  addDept,
  deleteDept,
  getDepartment,
  getDepartments,
  updateDept,
} from "../../controllers/admin/department.controller";

const router = Router();

router.route("/").get(getDepartments).post(addDept).delete(deleteDept);
router.route("/:facId").get(getDepartment).put(updateDept);

export default router;
