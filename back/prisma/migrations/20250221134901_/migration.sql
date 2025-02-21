/*
  Warnings:

  - You are about to drop the column `idToken` on the `Firmar` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Firmar" DROP CONSTRAINT "Firmar_idToken_fkey";

-- AlterTable
ALTER TABLE "Firmar" DROP COLUMN "idToken";
