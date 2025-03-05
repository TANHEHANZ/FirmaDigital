import { Router } from "express";
import {
  changeStatus,
  createToken,
  deletedToken,
  Token,
  TokenAll,
  updateToken,
} from "./token.controller";
import { validate } from "../../infraestrucure/middleware/validate";
import { schemaToken } from "../../infraestrucure/DTO/token.dto";
import { paginate } from "../../infraestrucure/middleware/pagination.middleware";
const tokenRouter = Router();
tokenRouter.get("/", paginate, TokenAll);
tokenRouter.get("/:id", Token);
tokenRouter.post("/", validate(schemaToken), createToken);
tokenRouter.patch("/:id", changeStatus);
tokenRouter.put("/", validate(schemaToken), updateToken);
tokenRouter.delete("/", deletedToken);
export default tokenRouter;
