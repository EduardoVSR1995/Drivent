import { notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";

async function getBookingUserId(userId: number) {
  const bookingRoons = await bookingRepository.getBookingUser(userId);
  
  if (!bookingRoons) {
    throw notFoundError();
  }
  return bookingRoons;
}

const bookingService = {
  getBookingUserId,
  
};

export default bookingService;
