/*
  Warnings:

  - You are about to drop the column `validado` on the `Firmar` table. All the data in the column will be lost.
  - You are about to drop the column `modelo` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `serial` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `Token` table. All the data in the column will be lost.
  - Added the required column `ci_titual` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion_titular` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_titular` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_certificado` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_token_provedor` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_usuario_id_fkey";

-- DropIndex
DROP INDEX "Token_serial_key";

-- AlterTable
ALTER TABLE "Firmar" DROP COLUMN "validado";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "modelo",
DROP COLUMN "serial",
DROP COLUMN "usuario_id",
ADD COLUMN     "ci_titual" VARCHAR(10) NOT NULL,
ADD COLUMN     "descripcion_titular" TEXT NOT NULL,
ADD COLUMN     "email_titular" TEXT NOT NULL,
ADD COLUMN     "id_certificado" TEXT NOT NULL,
ADD COLUMN     "id_token_provedor" TEXT NOT NULL,
ADD COLUMN     "tipo" VARCHAR(100) NOT NULL,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "is_active" SET DEFAULT 'FALSE';

-- CreateTable
CREATE TABLE "Certificado" (
    "id" TEXT NOT NULL,
    "tipo_certificado" TEXT NOT NULL,
    "desde" TIMESTAMP(3) NOT NULL,
    "hasta" TIMESTAMP(3) NOT NULL,
    "emisor" TEXT NOT NULL,

    CONSTRAINT "Certificado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_id_certificado_fkey" FOREIGN KEY ("id_certificado") REFERENCES "Certificado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
