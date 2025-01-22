-- DropForeignKey
ALTER TABLE "SavedPatient" DROP CONSTRAINT "SavedPatient_userId_fkey";

-- AddForeignKey
ALTER TABLE "SavedPatient" ADD CONSTRAINT "SavedPatient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
