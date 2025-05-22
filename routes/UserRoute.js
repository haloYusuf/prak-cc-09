import express from "express";
import {
  loginAsAdmin,
  loginAsUser,
  logout,
  refreshToken,
  registerAsAdmin,
  registerAsUser,
} from "../controller/UserController.js";

const userRouter = express.Router();

// AUTHENTICATION ROUTES
userRouter.post("/login/admin", loginAsAdmin);
userRouter.post("/login/user", loginAsUser);
userRouter.post("/register/admin", registerAsAdmin);
userRouter.post("/register/user", registerAsUser);
userRouter.get("/token", refreshToken);
userRouter.delete("/logout", logout);

export default userRouter;