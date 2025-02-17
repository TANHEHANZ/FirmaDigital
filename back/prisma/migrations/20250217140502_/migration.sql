/*
  Warnings:

  - The values [natural] on the enum `TypeUser` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeUser_new" AS ENUM ('Juridica', 'Natural');
ALTER TABLE "User" ALTER COLUMN "tipo_user" TYPE "TypeUser_new" USING ("tipo_user"::text::"TypeUser_new");
ALTER TYPE "TypeUser" RENAME TO "TypeUser_old";
ALTER TYPE "TypeUser_new" RENAME TO "TypeUser";
DROP TYPE "TypeUser_old";
COMMIT;
