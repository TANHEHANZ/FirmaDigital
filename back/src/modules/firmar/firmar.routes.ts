import { Router } from "express";
import { uploadAndSignDocument } from "./firmar.controller";
import { validate } from "../../infraestrucure/middleware/validate";
import { schemaSignedFile } from "../../infraestrucure/DTO/signedfile.dto";
const signedRouter = Router();

signedRouter.post("/", validate(schemaSignedFile), uploadAndSignDocument);
export default signedRouter;
