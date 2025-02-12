import { Request, Response, Router } from "express";
import { createUser, userAll } from "./user.controller";

const userRouter = Router();

userRouter.get("/", (req: Request, res: Response) => {
  userAll(req, res);
});
userRouter.post("/", (req, res) => {
  createUser(req, res);
});
export default userRouter;
