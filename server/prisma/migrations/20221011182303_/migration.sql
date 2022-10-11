/*
  Warnings:

  - You are about to drop the `Integration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `YearlyTaxProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Integration" DROP CONSTRAINT "Integration_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "YearlyTaxProfile" DROP CONSTRAINT "YearlyTaxProfile_userId_fkey";

-- DropTable
DROP TABLE "Integration";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "YearlyTaxProfile";
