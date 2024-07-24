-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_motionid_fkey";

-- DropForeignKey
ALTER TABLE "MotionRun" DROP CONSTRAINT "MotionRun_motionId_fkey";

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_motionid_fkey" FOREIGN KEY ("motionid") REFERENCES "Motion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotionRun" ADD CONSTRAINT "MotionRun_motionId_fkey" FOREIGN KEY ("motionId") REFERENCES "Motion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
