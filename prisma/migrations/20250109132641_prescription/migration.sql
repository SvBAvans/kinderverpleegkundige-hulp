-- CreateTable
CREATE TABLE "Perscription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "recurrance" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "Perscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Perscription" ADD CONSTRAINT "Perscription_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
