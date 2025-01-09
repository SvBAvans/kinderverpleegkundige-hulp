export default defineEventHandler(async (event) => {
    const prisma = usePrisma();
    const body = await readBody(event);

    const patientId = event.context.params?.id as string;

    //Check database of patientId bestaat en of patientId niet null is.
  
    return await prisma.perscription.create({
      data: {
        name: body.name,
        dosage: body.dosage,
        recurrance: body.recurrance,
        notes: body.notes,
        patientId: patientId,
      },
    });
  });
  