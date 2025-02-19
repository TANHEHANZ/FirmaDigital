/*
  Warnings:

  - Changed the type of `documento_blob` on the `Documento` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Documento" DROP COLUMN "documento_blob",
ADD COLUMN     "documento_blob" BYTEA NOT NULL;
