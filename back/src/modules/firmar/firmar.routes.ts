import { Router } from "express";
import {
  historyDocument,
  signedDocuments,
  UpdateDocument,
  uploadAndSignDocument,
  uploadFile,
} from "./firmar.controller";
import { validate } from "../../infraestrucure/middleware/validate";
import { schemaSignedFile } from "../../infraestrucure/DTO/signedfile.dto";
const signedRouter = Router();

signedRouter.post("/", validate(schemaSignedFile), uploadAndSignDocument);
signedRouter.get("/", signedDocuments);
signedRouter.put("/:id", UpdateDocument);
signedRouter.post("/prueba/", uploadFile);
// Hostorial de documentos
signedRouter.get("/history/:id", historyDocument);

export default signedRouter;
