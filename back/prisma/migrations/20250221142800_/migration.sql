/*
  Warnings:

  - The values [Activo,Modificado,Eliminado,Remplazado] on the enum `EstadoDocumento` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `emisor` on the `Certificado` table. All the data in the column will be lost.
  - You are about to drop the column `isUpdate` on the `Documento` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `Documento` table. All the data in the column will be lost.
  - You are about to drop the column `isUpdate` on the `Rol` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Rol` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `Rol` table. All the data in the column will be lost.
  - You are about to drop the column `ci_titual` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion_titular` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `email_titular` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `id_token_provedor` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `isUpdate` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `isUpdate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `User` table. All the data in the column will be lost.
  - Added the required column `id_certificado_token` to the `Certificado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_emisor` to the `Certificado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alias` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidad_certificados` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidad_priv_key` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_token` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token_id` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validate_certificado` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVO', 'ELIMINADO', 'EDITADO');

-- AlterEnum
BEGIN;
CREATE TYPE "EstadoDocumento_new" AS ENUM ('ACTIVO', 'MODIFICADO', 'ELIMINADO', 'REMPLAZADO');
ALTER TABLE "Documento" ALTER COLUMN "estado" DROP DEFAULT;
ALTER TABLE "Documento" ALTER COLUMN "estado" TYPE "EstadoDocumento_new" USING ("estado"::text::"EstadoDocumento_new");
ALTER TYPE "EstadoDocumento" RENAME TO "EstadoDocumento_old";
ALTER TYPE "EstadoDocumento_new" RENAME TO "EstadoDocumento";
DROP TYPE "EstadoDocumento_old";
ALTER TABLE "Documento" ALTER COLUMN "estado" SET DEFAULT 'ACTIVO';
COMMIT;

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_id_certificado_fkey";

-- AlterTable
ALTER TABLE "Certificado" DROP COLUMN "emisor",
ADD COLUMN     "id_certificado_token" TEXT NOT NULL,
ADD COLUMN     "id_emisor" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Documento" DROP COLUMN "isUpdate",
DROP COLUMN "is_deleted",
ALTER COLUMN "estado" SET DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "Rol" DROP COLUMN "isUpdate",
DROP COLUMN "is_active",
DROP COLUMN "is_deleted",
ADD COLUMN     "estado_rol" "Status" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "ci_titual",
DROP COLUMN "descripcion_titular",
DROP COLUMN "email_titular",
DROP COLUMN "id_token_provedor",
DROP COLUMN "isUpdate",
DROP COLUMN "is_active",
DROP COLUMN "is_deleted",
DROP COLUMN "tipo",
ADD COLUMN     "alias" VARCHAR(100) NOT NULL,
ADD COLUMN     "cantidad_certificados" INTEGER NOT NULL,
ADD COLUMN     "cantidad_priv_key" INTEGER NOT NULL,
ADD COLUMN     "estado_token" "Status" NOT NULL DEFAULT 'ACTIVO',
ADD COLUMN     "tipo_token" VARCHAR(100) NOT NULL,
ADD COLUMN     "token_id" TEXT NOT NULL,
ADD COLUMN     "validate_certificado" BOOLEAN NOT NULL,
ALTER COLUMN "id_certificado" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isUpdate",
DROP COLUMN "is_active",
DROP COLUMN "is_deleted",
ADD COLUMN     "estado_user" "Status" NOT NULL DEFAULT 'ACTIVO';

-- CreateTable
CREATE TABLE "EmisorCertificado" (
    "id" TEXT NOT NULL,
    "entidad" TEXT NOT NULL,

    CONSTRAINT "EmisorCertificado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitularCertificado" (
    "id" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "descripcion" TEXT,
    "email" TEXT,
    "nombre" TEXT,

    CONSTRAINT "TitularCertificado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_id_certificado_fkey" FOREIGN KEY ("id_certificado") REFERENCES "Certificado"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificado" ADD CONSTRAINT "Certificado_id_emisor_fkey" FOREIGN KEY ("id_emisor") REFERENCES "EmisorCertificado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
