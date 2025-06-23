-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('BACHELOR', 'MASTER', 'ENGINEER');

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "map" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);
