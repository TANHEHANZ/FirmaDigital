-- AddForeignKey
ALTER TABLE "Firmar" ADD CONSTRAINT "Firmar_idToken_fkey" FOREIGN KEY ("idToken") REFERENCES "Token"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_id_certificado_fkey" FOREIGN KEY ("id_certificado") REFERENCES "Certificado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
