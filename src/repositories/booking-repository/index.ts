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
      roomId
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

const bookingRepository = {
  creatBooking,
  getBookingUser,
  findManyBookingRoomId,
};

export default bookingRepository;
