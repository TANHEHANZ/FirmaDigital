/*
  Warnings:

  - Added the required column `id_user_create` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "id_user_create" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
