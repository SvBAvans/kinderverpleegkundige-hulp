import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    sendError(event, createError({ statusMessage: "Unauthenticated", statusCode: 401 }));
    return;
  }

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
      medicalCheckups: true,
      persciptions: true,
    },
  });

  if (!patient) {
    return createError({ statusCode: 404, message: "Patient not found" });
  }

  return patient;
});
