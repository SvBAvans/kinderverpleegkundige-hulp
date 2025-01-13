const prisma = usePrisma();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const userId = query.userId as string;

    if(!userId){
        console.error('no userId');
    }

    try {
        await prisma.savedPatient.deleteMany({
            where: { userId },
        });

        return {
            status: 200,
            message: 'deleted all patients for this shift',
        };
    } catch (error) {
        console.error('error deleting patients for this shift.');
    }
});