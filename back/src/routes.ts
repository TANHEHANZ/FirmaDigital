import { Router } from "express";
import userRouter from "./modules/user/user.routes";
import rolRouter from "./modules/rol/rol.routes";
import unidadRouter from "./modules/unidad/unidad.routes";
import loginRouter from "./modules/login/login.routes";
import tokenRouter from "./modules/Token/token.routes";
import signedRouter from "./modules/firmar/firmar.routes";
const router = Router();

router.use("/login", loginRouter);
router.use("/user", userRouter);
router.use("/rol", rolRouter);
router.use("/unidad", unidadRouter);
router.use("/token", tokenRouter);
router.use("/signed", signedRouter);

export default router;
