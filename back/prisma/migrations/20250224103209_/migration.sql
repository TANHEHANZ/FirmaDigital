/*
  Warnings:

  - You are about to drop the column `id_user_asignado` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `id_user_create` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Token` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_id_user_asignado_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_id_user_create_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "id_user_asignado",
DROP COLUMN "id_user_create",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "AsignacionToken" (
    "id" TEXT NOT NULL,
    "id_user_asignado" TEXT NOT NULL,
    "id_token" TEXT NOT NULL,
    "fecha_asignacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "Status" NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT "AsignacionToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AsignacionToken" ADD CONSTRAINT "AsignacionToken_id_user_asignado_fkey" FOREIGN KEY ("id_user_asignado") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionToken" ADD CONSTRAINT "AsignacionToken_id_token_fkey" FOREIGN KEY ("id_token") REFERENCES "Token"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
