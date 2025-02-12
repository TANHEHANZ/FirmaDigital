import { Router } from "express";
import userRouter from "./modules/user/user.routes";
import rolRouter from "./modules/rol/rol.routes";
const router = Router();

router.use("/user", userRouter);
router.use("/rol", rolRouter);

export default router;
