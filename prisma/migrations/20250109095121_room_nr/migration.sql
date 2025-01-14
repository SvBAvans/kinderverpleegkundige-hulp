/*
  Warnings:

  - Added the required column `roomNr` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "roomNr" TEXT NOT NULL;
