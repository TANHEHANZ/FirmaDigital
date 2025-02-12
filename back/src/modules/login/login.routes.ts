import Router from "express";
import { dataToken, loginController } from "./login.controller";
const loginRouter = Router();

loginRouter.post("/", loginController);
loginRouter.get("/token", dataToken);

export default loginRouter;
