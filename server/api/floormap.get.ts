import { getServerSession } from "#auth";
import { Patient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    sendError(event, createError({ statusMessage: "Unauthenticated", statusCode: 401 }));
    return;
  }

  const prisma = usePrisma();
  const patients = await prisma.patient.findMany();

  const rooms: { roomNr: string; patient?: Patient }[] = [
    { roomNr: "1" },
    { roomNr: "2" },
    { roomNr: "3" },
    { roomNr: "4" },
    { roomNr: "5" },
    { roomNr: "6" },
    { roomNr: "7" },
    { roomNr: "8" },
    { roomNr: "neo1-a" },
    { roomNr: "neo2-a" },
    { roomNr: "neo1-b" },
    { roomNr: "neo2-b" },
    { roomNr: "neo1-c" },
    { roomNr: "neo2-c" },
    { roomNr: "neo1-d" },
    { roomNr: "neo2-d" },
  ];

  rooms.forEach((room) => {
    const patient = patients.find((patient) => patient.roomNr == room.roomNr);
    room.patient = patient;
  });

  return rooms;
});
