import { notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";

async function getBookingUserId(userId: number) {
  const bookingRoons = await bookingRepository.getBookingUser(userId);

  if (!bookingRoons) {
    throw notFoundError();
  }
  return bookingRoons;
}

async function getBookingUserIdEmpty(userId: number) {
  return bookingRepository.getBookingUser(userId);
}

async function createBooking(userId: number, roomId: number) {
  return bookingRepository.creatBooking(userId, roomId);
}

const bookingService = {
  createBooking,
  getBookingUserId,
  getBookingUserIdEmpty,  
};

export default bookingService;
