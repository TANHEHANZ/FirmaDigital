import { Router } from "express";
import { createRol, deletedRol, rolAll, updateRol } from "./rol.controller";
import { validate } from "../../infraestrucure/middleware/validate";
import { rolSchema } from "../../infraestrucure/DTO/rol.dto";

const rolRouter = Router();
rolRouter.get("/", rolAll);
rolRouter.post("/", validate(rolSchema), createRol);
rolRouter.put("/:id", validate(rolSchema), updateRol);
rolRouter.delete("/:id", deletedRol);

export default rolRouter;
