import Router from "express";
import { asignarToken } from "./asignar.comtroller";
const asignarRouter = Router();
asignarRouter.post("/", asignarToken);
export default asignarRouter;
