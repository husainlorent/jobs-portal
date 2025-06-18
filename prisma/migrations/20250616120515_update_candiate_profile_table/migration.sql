/*
  Warnings:

  - You are about to drop the column `open_work` on the `CandidateProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CandidateProfile" DROP COLUMN "open_work",
ADD COLUMN     "openToWork" BOOLEAN NOT NULL DEFAULT false;
