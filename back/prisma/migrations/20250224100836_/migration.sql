-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_id_user_asignado_fkey";

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "id_user_asignado" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_id_user_asignado_fkey" FOREIGN KEY ("id_user_asignado") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
