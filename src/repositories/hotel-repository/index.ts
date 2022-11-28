import { prisma } from "@/config";

async function getAllHotels() {
  return prisma.hotel.findMany();
}

async function getRoom(hotelId: number) {
  return prisma.hotel.findUnique({
    where: {
      id: hotelId
    },
    include: {
      Rooms: true
    }
  });
}  

const hotelsRepository = {
  getAllHotels,
  getRoom,
};

export default hotelsRepository;
