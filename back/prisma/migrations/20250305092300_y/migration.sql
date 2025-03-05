/*
  Warnings:

  - You are about to drop the column `idRol` on the `User` table. All the data in the column will be lost.
  - Added the required column `rol` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoRol" AS ENUM ('ADMINISTRADOR', 'USUARIO');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "idRol",
ADD COLUMN     "rol" "TipoRol" NOT NULL;
