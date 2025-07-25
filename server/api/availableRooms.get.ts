import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    sendError(event, createError({ statusMessage: "Unauthenticated", statusCode: 401 }));
    return;
  }

  const prisma = usePrisma();

  const patients = await prisma.patient.findMany({
    select: {
      roomNr: true,
    },
  });

  const assignedRoomNumbers = patients.map((patient) => String(patient.roomNr));

  const allRoomNumbers = Array.from({ length: 20 }, (_, i) => String(i + 1));
  const neoRooms: string[] = ["neo1-a", "neo1-b", "neo1-c", "neo1-d", "neo2-a", "neo2-b", "neo2-c", "neo2-d"];

  const availableRooms = allRoomNumbers.filter((room) => !assignedRoomNumbers.includes(room));
  const availableNeoRooms = neoRooms.filter((room) => !assignedRoomNumbers.includes(room));

  return { rooms: availableRooms, neoRooms: availableNeoRooms };
});
