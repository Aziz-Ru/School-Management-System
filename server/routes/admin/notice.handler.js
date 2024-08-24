import { Router } from "express";
import {
  addNotice,
  deleteNotice,
  getNotice,
  getNotices,
  updateNotice,
} from "../../controllers/admin/notice.controller.js";
import validatorHandler from "../../middlewares/common/validatorHandler.js";
import { addNoticeValidator } from "../../middlewares/notice.middleware.js";

const router = Router({ strict: true });

router
  .route("/")
  .get(getNotices)
  .post(addNoticeValidator, validatorHandler, addNotice);
router
  .route("/:noticeId")
  .get(getNotice)
  .put(updateNotice)
  .delete(deleteNotice);
export default router;
