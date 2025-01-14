export default defineEventHandler(async (event) => {
    const prisma = usePrisma();
    const patientId = event.context.params?.id; 

  
    return await prisma.patient.delete({
        where: {
            id: patientId
        }
    });
  });
  