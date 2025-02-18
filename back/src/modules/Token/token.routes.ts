import { Router } from "express";
import {
  createToken,
  deletedToken,
  Token,
  TokenAll,
  updateToken,
} from "./token.controller";
import { validate } from "../../infraestrucure/middleware/validate";
import { schemaToken } from "../../infraestrucure/DTO/token.dto";
const tokenRouter = Router();
tokenRouter.get("/", TokenAll);
tokenRouter.get("/:id", Token);
tokenRouter.post("/", validate(schemaToken), createToken);
tokenRouter.put("/", validate(schemaToken), updateToken);
tokenRouter.delete("/", deletedToken);
export default tokenRouter;
