-- CreateTable
CREATE TABLE "CreditsList" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "creditAmount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "creditDuration" TEXT NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "depositAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fixPaidAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditsList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CreditsList" ADD CONSTRAINT "CreditsList_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
