/*
  Warnings:

  - Added the required column `id_titular` to the `Certificado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certificado" ADD COLUMN     "id_titular" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Certificado" ADD CONSTRAINT "Certificado_id_titular_fkey" FOREIGN KEY ("id_titular") REFERENCES "TitularCertificado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
