/*
  Warnings:

  - Added the required column `requiredfields` to the `AvailableAction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableAction" ADD COLUMN     "requiredfields" JSONB NOT NULL;
