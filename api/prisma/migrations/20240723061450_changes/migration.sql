/*
  Warnings:

  - You are about to drop the column `triggerid` on the `Trigger` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[availableId]` on the table `Trigger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `availableId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_triggerid_fkey";

-- DropIndex
DROP INDEX "Trigger_triggerid_key";

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "triggerid",
ADD COLUMN     "availableId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_availableId_key" ON "Trigger"("availableId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_availableId_fkey" FOREIGN KEY ("availableId") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
