-- CreateTable
CREATE TABLE "ActiveSupplies" (
    "supplyID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "supplyAmount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActiveSupplies_pkey" PRIMARY KEY ("supplyID")
);

-- AddForeignKey
ALTER TABLE "ActiveSupplies" ADD CONSTRAINT "ActiveSupplies_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
