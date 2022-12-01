import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import bookingService from "@/services/booking-service";
import ticketService from "@/services/tickets-service";
import hotelService from "@/services/hotels-service";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBookingUserId(userId);

    delete booking.createdAt;
    delete booking.roomId;
    delete booking.updatedAt;
    delete booking.userId;

    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const { roomId } = req.body;

  if(!roomId || roomId === String || roomId <= 0 ) return res.sendStatus(httpStatus.FORBIDDEN);

  try {
    const bookingUser = await bookingService.getBookingUserIdEmpty(userId);

    if(bookingUser) return res.sendStatus(httpStatus.FORBIDDEN);

    const ticket = await ticketService.getTicketByUserId(userId);
    
    if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status === "RESERVED" ) return res.sendStatus(httpStatus.FORBIDDEN);

    const room = await hotelService.getRoom(roomId);
    
    const AllRooms = await hotelService.getAllBookingRooms(roomId);

    if(AllRooms.length === room.capacity ) return res.sendStatus(httpStatus.FORBIDDEN);

    const booking = await bookingService.createBooking(userId, roomId);

    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
