import { Router } from "express";
import { ctrlLogin, ctrlRegister } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/register", ctrlRegister);
userRouter.post("/login", ctrlLogin);

export { userRouter };
