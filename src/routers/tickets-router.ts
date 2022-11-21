import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { returnTicketsTypes, returnTickets, postTicket } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", returnTicketsTypes)
  .get("/", returnTickets)
  .post("/", postTicket);

export { ticketsRouter };
