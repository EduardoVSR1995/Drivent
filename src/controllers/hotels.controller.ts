import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import ticketService from "@/services/tickets-service";
import { TicketStatus } from "@prisma/client";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    
    if(ticket.status !== TicketStatus.PAID) return res.sendStatus(httpStatus.UNAUTHORIZED);

    const hotels = await hotelsService.getAllHotels();

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getRoom(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const hotelId = req.params.hotelId;

  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    
    if(ticket.status !== TicketStatus.PAID) return res.sendStatus(httpStatus.UNAUTHORIZED);

    const rooms = await hotelsService.getRoom(Number(hotelId));

    if(rooms.length===0) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
