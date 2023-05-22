-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin', 'Creditor');

-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "login" VARCHAR(20) NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',
    "walletAdress" VARCHAR(100),
    "firstName" TEXT,
    "lastName" TEXT,
    "password" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
