import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/ticket-repository";
import { Enrollment, Ticket, TicketType, TicketTypeAndTicket } from "@prisma/client";

async function listTypes(): Promise<TicketType[]> {
  const value =  await ticketsRepository.listTypes(); 

  if(value.length===0) {
    throw notFoundError();
  }
  return value;      
}

async function getTicketUser(id: number): Promise<TicketTypeAndTicket> {
  const value =  await ticketsRepository.getTicketUser(id);   
  
  if(value.Ticket.length===0) {
    throw notFoundError();
  }
  return value.Ticket[0];  
}

async function getEnrollment(id: number): Promise<Enrollment> {
  const value = await ticketsRepository.getEnrollment(id); 

  if(!value) {
    throw notFoundError();
  }
  return value;     
}

async function postTiket(ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt">) {
  return ticketsRepository.postTiket(ticket);  
}

async function getTicket(id: number) {
  const value = await ticketsRepository.getTicket(id); 
  if(!value) {
    throw notFoundError();
  }
  return value;  
}

async function updatTicket(id: number) {
  return ticketsRepository.updatTicket(id); 
}

const ticketsService = {
  updatTicket,
  getTicket,
  listTypes,
  getTicketUser,
  postTiket,
  getEnrollment,
};

export default ticketsService;
