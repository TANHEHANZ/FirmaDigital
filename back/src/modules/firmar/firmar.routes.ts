import { Router } from "express";
import {
  FileSignedById,
  historyDocument,
  signedDocuments,
  UpdateDocument,
  uploadAndSignDocument,
  uploadFile,
} from "./firmar.controller";
import { validate } from "../../infraestrucure/middleware/validate";
import { schemaSignedFile } from "../../infraestrucure/DTO/signedfile.dto";
import { paginate } from "../../infraestrucure/middleware/pagination.middleware";
const signedRouter = Router();

signedRouter.post("/", validate(schemaSignedFile), uploadAndSignDocument);
signedRouter.get("/", paginate, signedDocuments);
signedRouter.get("/file/:id", FileSignedById);
signedRouter.put("/:id", UpdateDocument);
signedRouter.post("/prueba/", uploadFile);
// Hostorial de documentos
signedRouter.get("/history/:id", historyDocument);

export default signedRouter;
