/*
  Warnings:

  - You are about to drop the column `code` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `totalComments` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `totalLikes` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Userlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "code",
DROP COLUMN "createdAt",
DROP COLUMN "language",
DROP COLUMN "totalComments",
DROP COLUMN "totalLikes",
DROP COLUMN "updatedAt",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Userlist";
