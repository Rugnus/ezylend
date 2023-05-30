/*
  Warnings:

  - A unique constraint covering the columns `[currency]` on the table `ActiveSupplies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ActiveSupplies_currency_key" ON "ActiveSupplies"("currency");
