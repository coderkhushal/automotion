/*
  Warnings:

  - You are about to drop the `AvaiableAction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `actionId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `triggerId` to the `Motion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Motion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `triggerMetadata` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_id_fkey";

-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "actionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Motion" ADD COLUMN     "triggerId" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "triggerMetadata" JSONB NOT NULL;

-- DropTable
DROP TABLE "AvaiableAction";

-- CreateTable
CREATE TABLE "AvailableAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AvailableAction_id_key" ON "AvailableAction"("id");

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AvailableAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
