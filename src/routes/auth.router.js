import express from "express";
import {
  logIn,
  signUp,
  logout,
  checkAuth,
} from "../controllers/authController.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", logIn);
authRouter.post("/logout", logout);
authRouter.get("/check-auth", protectedRoute, checkAuth);

export default authRouter;
