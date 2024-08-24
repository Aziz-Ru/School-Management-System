import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import validatorHandler from "../middlewares/common/validatorHandler.js";
import { verifyJwt } from "../middlewares/common/verifyJWT.js";

const router = Router({ strict: true });

router.post("/login", authMiddleware, validatorHandler, login);
router.post("/logout", verifyJwt, logout);

export default router;
