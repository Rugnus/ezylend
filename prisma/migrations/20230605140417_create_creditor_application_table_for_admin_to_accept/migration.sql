-- CreateTable
CREATE TABLE "CreditorApplications" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "walletAdress" VARCHAR(100) NOT NULL,
    "role" "Role" NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditorApplications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CreditorApplications" ADD CONSTRAINT "CreditorApplications_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
