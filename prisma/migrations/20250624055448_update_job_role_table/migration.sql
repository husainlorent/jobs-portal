/*
  Warnings:

  - You are about to drop the `JobRoles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "JobRoles";

-- CreateTable
CREATE TABLE "JobRole" (
    "name" TEXT NOT NULL,

    CONSTRAINT "JobRole_pkey" PRIMARY KEY ("name")
);
