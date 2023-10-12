/*
  Warnings:

  - A unique constraint covering the columns `[userID,login]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userLogin` to the `CreditsList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CreditsList" DROP CONSTRAINT "CreditsList_userID_fkey";

-- AlterTable
ALTER TABLE "CreditsList" ADD COLUMN     "userLogin" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_userID_login_key" ON "User"("userID", "login");

-- AddForeignKey
ALTER TABLE "CreditsList" ADD CONSTRAINT "CreditsList_userID_userLogin_fkey" FOREIGN KEY ("userID", "userLogin") REFERENCES "User"("userID", "login") ON DELETE RESTRICT ON UPDATE CASCADE;
