import Router from "express";
import { loginController } from "./login.controller";
const loginRouter = Router();

loginRouter.post("/", loginController);
export default loginRouter;
