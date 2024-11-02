-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "accessTokenExpires" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
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
    "availableId" TEXT NOT NULL,
    "triggerMetadata" JSONB NOT NULL,

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
    "sortingOrder" INTEGER NOT NULL DEFAULT 0,
    "actionmetadata" JSONB NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "requiredfields" JSONB NOT NULL,

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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_key" ON "Token"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Motion_id_key" ON "Motion"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Motion_triggerId_key" ON "Motion"("triggerId");

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_motionId_key" ON "Trigger"("motionId");

-- CreateIndex
CREATE UNIQUE INDEX "AvailableAction_id_key" ON "AvailableAction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MotionRun_id_key" ON "MotionRun"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MotionRunOutbox_motionrunId_key" ON "MotionRunOutbox"("motionrunId");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_motionId_fkey" FOREIGN KEY ("motionId") REFERENCES "Motion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_availableId_fkey" FOREIGN KEY ("availableId") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_motionid_fkey" FOREIGN KEY ("motionid") REFERENCES "Motion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AvailableAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotionRun" ADD CONSTRAINT "MotionRun_motionId_fkey" FOREIGN KEY ("motionId") REFERENCES "Motion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotionRunOutbox" ADD CONSTRAINT "MotionRunOutbox_motionrunId_fkey" FOREIGN KEY ("motionrunId") REFERENCES "MotionRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
