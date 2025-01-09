export default defineEventHandler(async (event) => {
  const prisma = usePrisma();
  const patientId = event.context.params?.id;

  if (!patientId) {
    return createError({ statusCode: 400, message: "Invalid patient id" });
  }

  const patient = await prisma.patient.findUnique({
    where: {
      id: patientId,
    },
    include: {
      persciptions: true
    }
  });

  if (!patient) {
    return createError({ statusCode: 404, message: "Patient not found" });
  }

  return patient;
});
