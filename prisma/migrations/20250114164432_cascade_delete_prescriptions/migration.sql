-- DropForeignKey
ALTER TABLE "SavedPatient" DROP CONSTRAINT "SavedPatient_patientId_fkey";

-- AddForeignKey
ALTER TABLE "SavedPatient" ADD CONSTRAINT "SavedPatient_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
