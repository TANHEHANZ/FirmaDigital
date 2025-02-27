import Router from "express";
import {
  asignarToken,
  deletedAssignment,
  unsubcribe,
  updateData,
} from "./asignar.comtroller";
const asignarRouter = Router();
asignarRouter.post("/", asignarToken);
asignarRouter.patch("/", unsubcribe);
asignarRouter.put("/:id", updateData);
asignarRouter.delete("/:id", deletedAssignment);
export default asignarRouter;
