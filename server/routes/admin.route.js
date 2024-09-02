import { Router } from "express";
import { isAdmin, verifyJwt } from "../middlewares/common/verifyJWT.js";
import courseRoute from "./admin/course.handler.js";
import dayRoute from "./admin/day.handler.js";
import facultyRoute from "./admin/faculty.handler.js";
import noticeRoute from "./admin/notice.handler.js";
import timeRoute from "./admin/routine-time.handler.js";
import schoolRoute from "./admin/school.handler.js";
import studentRoute from "./admin/student.handler.js";
const router = Router({ strict: true });

router.use("/school", verifyJwt, isAdmin, schoolRoute);
router.use("/notice", verifyJwt, isAdmin, noticeRoute);
router.use("/course", verifyJwt, isAdmin, courseRoute);
router.use("/faculty", verifyJwt, isAdmin, facultyRoute);
router.use("/student", verifyJwt, isAdmin, studentRoute);
router.use("/day", verifyJwt, isAdmin, dayRoute);
router.use("/time", timeRoute);
export default router;
