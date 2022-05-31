-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ENGLISH', 'NORWEGIAN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" "Language" NOT NULL DEFAULT E'ENGLISH';
