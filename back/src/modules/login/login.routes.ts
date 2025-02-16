import Router from "express";
import { dataToken, loginController } from "./login.controller";
import { validate } from "../../infraestrucure/middleware/validate";
import { loginSchema } from "../../infraestrucure/DTO/login.dto";
const loginRouter = Router();

loginRouter.post("/", validate(loginSchema), loginController);
loginRouter.get("/token", dataToken);

export default loginRouter;
