/*
  Warnings:

  - Added the required column `userLogin` to the `CreditorApplications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CreditorApplications" DROP CONSTRAINT "CreditorApplications_userID_fkey";

-- AlterTable
ALTER TABLE "CreditorApplications" ADD COLUMN     "userLogin" VARCHAR(20) NOT NULL;

-- AddForeignKey
ALTER TABLE "CreditorApplications" ADD CONSTRAINT "CreditorApplications_userID_userLogin_fkey" FOREIGN KEY ("userID", "userLogin") REFERENCES "User"("userID", "login") ON DELETE RESTRICT ON UPDATE CASCADE;
