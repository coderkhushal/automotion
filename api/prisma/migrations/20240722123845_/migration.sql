-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Motion" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "triggerId" TEXT NOT NULL,

    CONSTRAINT "Motion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trigger" (
    "id" TEXT NOT NULL,
    "motionId" TEXT NOT NULL,
    "triggerid" TEXT NOT NULL,

    CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableTrigger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableTrigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "motionid" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotionRun" (
    "id" TEXT NOT NULL,
    "motionId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "MotionRunOutbox" (
    "id" TEXT NOT NULL,
    "motionrunId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "MotionRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Motion_id_key" ON "Motion"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_motionId_key" ON "Trigger"("motionId");

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_triggerid_key" ON "Trigger"("triggerid");

-- CreateIndex
CREATE UNIQUE INDEX "AvailableAction_id_key" ON "AvailableAction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MotionRun_id_key" ON "MotionRun"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MotionRunOutbox_motionrunId_key" ON "MotionRunOutbox"("motionrunId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_motionId_fkey" FOREIGN KEY ("motionId") REFERENCES "Motion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_triggerid_fkey" FOREIGN KEY ("triggerid") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_motionid_fkey" FOREIGN KEY ("motionid") REFERENCES "Motion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AvailableAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotionRun" ADD CONSTRAINT "MotionRun_motionId_fkey" FOREIGN KEY ("motionId") REFERENCES "Motion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotionRunOutbox" ADD CONSTRAINT "MotionRunOutbox_motionrunId_fkey" FOREIGN KEY ("motionrunId") REFERENCES "MotionRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
