import { array } from "zod";

export default defineEventHandler(async (event) => {
  const prisma = usePrisma();

  const patients = await prisma.patient.findMany({
    select: {
      roomNr: true,
    },
  });

  const assignedRoomNumbers = patients.map((patient) => String(patient.roomNr));

  const allRoomNumbers = Array.from({ length: 20 }, (_, i) => String(i + 1));

  const availableRooms = allRoomNumbers.filter(
    (room) => !assignedRoomNumbers.includes(room)
  );

  return availableRooms;
});
