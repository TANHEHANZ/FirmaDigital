import { Router } from "express";
import {
  createUser,
  deletedUser,
  infoUser,
  updateUser,
  userAll,
  userById,
} from "./user.controller";
import { validate } from "../../infraestrucure/middleware/validate";
import { userSchema } from "../../infraestrucure/DTO/user.dto";

const userRouter = Router();

userRouter.get("/", userAll);
userRouter.get("/:id", userById);

userRouter.post("/", validate(userSchema), createUser);
userRouter.post("/info/:ci", infoUser);
userRouter.put("/:id", validate(userSchema), updateUser);
userRouter.delete("/:id", deletedUser);
export default userRouter;
