-- CreateTable
CREATE TABLE "SavedPatient" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedPatient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavedPatient" ADD CONSTRAINT "SavedPatient_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedPatient" ADD CONSTRAINT "SavedPatient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
