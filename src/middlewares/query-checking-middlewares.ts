import { AuthenticatedRequest } from "./authentication-middleware";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import ticketsRepository from "@/services/tickets-service";

export async function authenticateParams(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const ticketId = req.query.ticketId;
  
  if(!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

  const { userId } = req;

  try {
    const ticket = await ticketsRepository.getTicket(Number(ticketId));
  
    try {
      await ticketsRepository.getTicketUser(userId);
    } catch (error) {
      if(error.name === "NotFoundError") return res.sendStatus(httpStatus.UNAUTHORIZED); 
      return res.sendStatus(httpStatus.NO_CONTENT);   
    }
    if(ticket.id === Number(ticketId)) return next();

    return res.sendStatus(httpStatus.UNAUTHORIZED);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND); 
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function authenticateProcess(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketId, cardData  } = req.body as cardBody;

  const { userId } = req;

  if(!ticketId || !cardData) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    await ticketsRepository.getTicket(ticketId);

    try {
      await ticketsRepository.getTicketUser(userId);
    } catch (error) {
      if(error.name === "NotFoundError") return res.sendStatus(httpStatus.UNAUTHORIZED); 
      return res.sendStatus(httpStatus.NO_CONTENT);   
    }

    return next();
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND); 
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export type cardBody = {
  ticketId: number,
  cardData: {
    issuer: string,
    number: string,
    name: string,
    expirationDate: string,
    cvv: string,
  }
}
