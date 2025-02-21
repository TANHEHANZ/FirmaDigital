/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `idUnidad` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Unidad` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cargo` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institucion` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidad` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_idUnidad_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "fecha",
DROP COLUMN "idUnidad",
ADD COLUMN     "cargo" TEXT NOT NULL,
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "institucion" TEXT NOT NULL,
ADD COLUMN     "unidad" TEXT NOT NULL;

-- DropTable
DROP TABLE "Unidad";
