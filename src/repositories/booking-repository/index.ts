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

const bookingRepository = {
  getBookingUser
};

export default bookingRepository;
