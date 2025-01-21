-- DropForeignKey
ALTER TABLE "Perscription" DROP CONSTRAINT "Perscription_patientId_fkey";

-- AddForeignKey
ALTER TABLE "Perscription" ADD CONSTRAINT "Perscription_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
