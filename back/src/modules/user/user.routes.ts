import { Request, Response, Router } from "express";
import { createUser, userAll } from "./user.controller";
import {
  handlePrismaError,
  validate,
} from "../../infraestrucure/middleware/validate";
import { userSchema } from "../../infraestrucure/DTO/user.dto";

const userRouter = Router();

userRouter.get("/", (req: Request, res: Response) => {
  userAll(req, res);
});
userRouter.post("/", validate(userSchema), createUser);
userRouter.use(handlePrismaError);
export default userRouter;
