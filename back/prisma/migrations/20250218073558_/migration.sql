/*
  Warnings:

  - You are about to drop the column `is_active` on the `Documento` table. All the data in the column will be lost.
  - You are about to alter the column `nombre` on the `Documento` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `isUpdate` on the `Firmar` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Firmar` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `Firmar` table. All the data in the column will be lost.
  - You are about to drop the column `ci_titual` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion_titular` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `email_titular` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `id_certificado` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `id_token_provedor` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the `Certificado` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[serial]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `modelo` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serial` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoDocumento" AS ENUM ('Activo', 'Modificado', 'Eliminado', 'Remplazado');

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_id_certificado_fkey";

-- DropIndex
DROP INDEX "Documento_nombre_key";

-- AlterTable
ALTER TABLE "Documento" DROP COLUMN "is_active",
ADD COLUMN     "estado" "EstadoDocumento" NOT NULL DEFAULT 'Activo',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_eliminacion" TIMESTAMP(3),
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Firmar" DROP COLUMN "isUpdate",
DROP COLUMN "is_active",
DROP COLUMN "is_deleted";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "ci_titual",
DROP COLUMN "descripcion_titular",
DROP COLUMN "email_titular",
DROP COLUMN "id_certificado",
DROP COLUMN "id_token_provedor",
DROP COLUMN "tipo",
ADD COLUMN     "modelo" VARCHAR(100) NOT NULL,
ADD COLUMN     "serial" TEXT NOT NULL,
ADD COLUMN     "usuario_id" TEXT NOT NULL,
ALTER COLUMN "is_active" SET DEFAULT 'TRUE';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "is_active" SET DEFAULT 'TRUE';

-- DropTable
DROP TABLE "Certificado";

-- CreateIndex
CREATE UNIQUE INDEX "Token_serial_key" ON "Token"("serial");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
