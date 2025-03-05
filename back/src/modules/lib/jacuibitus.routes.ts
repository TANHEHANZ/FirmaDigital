import Router from "express";
import { firmar, listToken, ValidatedDocument } from "./jacuibitus..controller";
const jacubitusRouter = Router();
jacubitusRouter.get("/", listToken);
jacubitusRouter.post("/validar", ValidatedDocument);
jacubitusRouter.post("/firmar/:id_historial?", firmar);
export default jacubitusRouter;
