const prisma = usePrisma();

export default defineEventHandler(async (event) => {
   const query = getQuery(event);
    const userId = query.userId as string;

    if(!userId){
        console.error('no userId found');
    }

    try {
        const savedPatients = await prisma.savedPatient.findMany({
            where: { userId },
            include: { patient: true },
        });

        const formattedPatients = savedPatients.map((entry) => ({
            id: entry.patient.id,
            firstName: entry.patient.firstName,
            lastName: entry.patient.lastName,
            dateOfBirth: entry.patient.dateOfBirth,
            diseaseProfile: entry.patient.diseaseProfile,
            patientId: entry.patientId,
            roomNr: entry.patient.roomNr,

        }));

        return {
            status: 200,
            patients: formattedPatients,
        };
    } catch (error) {
        console.error('error getting patients', error);
    }
});

