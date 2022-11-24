import { notFoundError, conflictError } from "@/errors";
import hotelsRepository from "@/repositories/hotel-repository";

async function getAllHotels() {
  const hotels = await hotelsRepository.getAllHotels();
  
  if (!hotels) {
    throw notFoundError();
  }
  return hotels;
}

async function getRoom(hotelsId: number) {
  const room = await hotelsRepository.getRoom(hotelsId);

  if (!room) {
    throw conflictError("");
  }
  return room;
}
  
const hotelsService = {
  getAllHotels,
  getRoom,
};
  
export default hotelsService;
