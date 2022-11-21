import { AuthenticatedRequest, cardBody } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId;

  try {
    const ticket = await paymentsService.getPayments(Number(ticketId));

    return res.status(httpStatus.OK).send(ticket[0]);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);    
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postPayments(req: AuthenticatedRequest, res: Response) {
  const { ticketId, cardData } = req.body as cardBody;

  const { userId } = req;

  try {
    const ticketUser = await ticketsService.getTicketUser(userId);

    const ticket = await paymentsService.postPayments({
      ticketId: ticketId,
      value: ticketUser.TicketType.price,
      cardIssuer: cardData.issuer,
      cardLastDigits: cardData.number.slice(-4),
    });

    await ticketsService.updatTicket(ticketId);
    
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);    
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
