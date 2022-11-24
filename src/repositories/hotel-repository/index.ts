import { prisma } from "@/config";

async function getAllHotels() {
  return prisma.hotel.findMany();
}

async function getRoom(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId,
    }
  });
}  

const hotelsRepository = {
  getAllHotels,
  getRoom,
};

export default hotelsRepository;
