/*
  Warnings:

  - A unique constraint covering the columns `[triggerId]` on the table `Motion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Motion_triggerId_key" ON "Motion"("triggerId");
