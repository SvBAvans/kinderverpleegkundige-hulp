export default defineEventHandler(async (event) => {
    const prisma = usePrisma();
    const body = await readBody(event);

    const patientId = event.context.params?.id as string;
    const currentTime = new Date();

    //Check database of patientId bestaat en of patientId niet null is.
  
    return await prisma.medicalCheckup.create({
      data: {
        notes: body.notes,
        timestamp: currentTime,
        patientId: patientId,
      },
    });
  });