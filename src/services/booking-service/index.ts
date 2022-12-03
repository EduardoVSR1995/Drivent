import { notFoundError, unauthorizedError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";

async function getBookingUserId(userId: number) {
  const bookingRoons = await bookingRepository.getBookingUser(userId);

  if (!bookingRoons) {
    throw notFoundError();
  }
  return bookingRoons;
}

async function findBookingId(id: number) {
  const booking = await bookingRepository.findUniqueBookingId(id);

  if (!booking) {
    throw unauthorizedError();
  }
  return booking;
}

async function updateBookingId(id: number, roomId: number) {
  return bookingRepository.updateBookingId(id, roomId);
}

async function getBookingUserIdEmpty(userId: number) {
  return bookingRepository.getBookingUser(userId);
}

async function createBooking(userId: number, roomId: number) {
  return bookingRepository.creatBooking(userId, roomId);
}

const bookingService = {
  updateBookingId,
  findBookingId,
  createBooking,
  getBookingUserId,
  getBookingUserIdEmpty,  
};

export default bookingService;
