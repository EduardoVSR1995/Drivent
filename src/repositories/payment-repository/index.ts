import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function getPayments(ticketId: number) {
  return prisma.payment.findMany({
    where: {
      ticketId: ticketId,
    }
  });
}

async function postPayments(data: Omit<Payment, "id"  |  "createdAt"  |  "updatedAt">) {
  return prisma.payment.create({
    data: data,
  });
}

const paymentsRepository = { 
  postPayments,  
  getPayments,
};
  
export default paymentsRepository;
