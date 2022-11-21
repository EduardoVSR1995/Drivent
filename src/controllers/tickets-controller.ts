import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function returnTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticket = await ticketsService.listTypes();

    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if(error.name === "NotFoundError") return res.status(httpStatus.OK).send([]);
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function returnTickets(req: AuthenticatedRequest, res: Response) {  
  const { userId } = req;

  try {
    await ticketsService.getEnrollment(userId);

    const tipeAndTicket = await ticketsService.getTicketUser(userId);

    return res.status(httpStatus.OK).send(tipeAndTicket);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);    
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body as {ticketTypeId: number};

  const { userId } = req;

  if(!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const user  = await ticketsService.getEnrollment(userId);

    await ticketsService.postTiket({
      ticketTypeId: ticketTypeId,
      enrollmentId: user.id,
      status: "RESERVED",
    });

    const tipeAndTicket = await ticketsService.getTicketUser(userId);

    return res.status(httpStatus.CREATED).send(tipeAndTicket);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND); 
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
