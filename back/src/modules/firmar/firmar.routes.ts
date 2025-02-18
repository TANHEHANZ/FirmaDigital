import { Router } from "express";
import { signedDocuments, uploadAndSignDocument } from "./firmar.controller";
import { validate } from "../../infraestrucure/middleware/validate";
import { schemaSignedFile } from "../../infraestrucure/DTO/signedfile.dto";
const signedRouter = Router();

signedRouter.post("/", validate(schemaSignedFile), uploadAndSignDocument);
signedRouter.get("/", signedDocuments);

export default signedRouter;
