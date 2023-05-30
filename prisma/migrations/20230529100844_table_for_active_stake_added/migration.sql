-- CreateTable
CREATE TABLE "ActiveStake" (
    "stakeID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blockDuration" TEXT NOT NULL,
    "blockedUntil" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActiveStake_pkey" PRIMARY KEY ("stakeID")
);

-- AddForeignKey
ALTER TABLE "ActiveStake" ADD CONSTRAINT "ActiveStake_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

