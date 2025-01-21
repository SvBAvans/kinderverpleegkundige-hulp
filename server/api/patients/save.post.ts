const prisma = usePrisma();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, patientIds } = body;

  if (!userId || !Array.isArray(patientIds) || patientIds.length === 0) {
    console.error("Invalid request body:", body);
    return {
      status: 400,
      message: "Invalid request. Ensure userId and patientIds are provided.",
    };
  }

  try {
    console.log("Saving patients for user:", userId, "Patients:", patientIds);

    const savedPatients = patientIds.map((patientId) => ({
      userId,
      patientId,
    }));

    await prisma.savedPatient.createMany({
      data: savedPatients,
      skipDuplicates: true,
    });

    return {
      status: 200,
      message: "Patients successfully saved!",
    };
  } catch (error) {
    console.error("Error saving patients:", error);
  }
});
