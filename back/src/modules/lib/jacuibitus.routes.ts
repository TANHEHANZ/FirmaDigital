import Router from "express";
import { firmar, listToken } from "./jacuibitus..controller";
const jacubitusRouter = Router();
jacubitusRouter.get("/", listToken);
jacubitusRouter.post("/firmar/:id_historial?", firmar);
export default jacubitusRouter;
