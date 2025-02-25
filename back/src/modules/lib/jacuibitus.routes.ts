import Router from "express";
import { listToken } from "./jacuibitus..controller";
const jacubitusRouter = Router();
jacubitusRouter.get("/", listToken);
export default jacubitusRouter;
