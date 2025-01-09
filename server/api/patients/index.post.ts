export default defineEventHandler(async (event) => {
  const prisma = usePrisma();
  const body = await readBody(event);

  return await prisma.patient.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      dateOfBirth: body.dateOfBirth,
      diseaseProfile: body.diseaseProfile,
      patientId: body.patientId,
      roomNr: body.roomNr
    },
  });
});
