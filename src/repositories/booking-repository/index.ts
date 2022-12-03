import { prisma } from "@/config";

async function getBookingUser(userId: number) {
  return prisma.booking.findFirst({
    where: { 
      userId: userId
    },
    include: {
      Room: true,
    },
  });
}

async function findManyBookingRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: { 
      roomId: roomId
    }
  });
}

async function findUniqueBookingId(id: number) {
  return prisma.booking.findUnique({
    where: { 
      id
    }
  });
}

async function creatBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: { 
      userId,
      roomId,
    }
  });
}

async function updateBookingId(id: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id
    },
    data: {
      roomId,
      updatedAt: new Date().toISOString(),
    }
  });
}

const bookingRepository = {
  updateBookingId,
  findUniqueBookingId,
  creatBooking,
  getBookingUser,
  findManyBookingRoomId,
};

export default bookingRepository;
