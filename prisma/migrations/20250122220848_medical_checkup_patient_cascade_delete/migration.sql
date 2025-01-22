-- DropForeignKey
ALTER TABLE "MedicalCheckup" DROP CONSTRAINT "MedicalCheckup_patientId_fkey";

-- AddForeignKey
ALTER TABLE "MedicalCheckup" ADD CONSTRAINT "MedicalCheckup_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
