import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function listTypes() {
  return prisma.ticketType.findMany();
}

async function getTicketUser(id: number) {
  return prisma.enrollment.findUnique({
    where: {
      userId: id, 
    },
    select: {
      Ticket: {
        select: {
          id: true,
          status: true,
          ticketTypeId: true,
          enrollmentId: true,
          TicketType: {
            select: {
              id: true,
              name: true,
              price: true,
              isRemote: true,
              includesHotel: true,
              createdAt: true,
              updatedAt: true,
            } 
          },
          createdAt: true,
          updatedAt: true,
        }
      }
    }
  });
}

async function getTicket(id: number) {
  return prisma.ticket.findUnique({
    where: {
      id: id
    }
  });
}

async function getEnrollment(id: number) {
  return prisma.enrollment.findUnique({
    where: {
      userId: id,
    }
  });
}

async function postTiket(data: Omit<Ticket, "id" | "createdAt" | "updatedAt">) {
  return prisma.ticket.create({
    data: data,
  });
}

async function updatTicket(id: number) {
  return prisma.ticket.update({
    where: {
      id: id,
    },
    data: {
      status: "PAID",
    } 
  });
}

const ticketsRepository = { 
  updatTicket,
  listTypes,
  getTicketUser,
  getTicket,
  postTiket,
  getEnrollment,
};

export default ticketsRepository;
