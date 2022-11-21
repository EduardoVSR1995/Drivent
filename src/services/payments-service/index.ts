import { notFoundError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import { Payment } from "@prisma/client";

async function getPayments(id: number): Promise<Payment[]> {
  const value = await paymentRepository.getPayments(id); 

  if(!value) {
    throw notFoundError();
  }
  return value;      
}

async function postPayments(data: Omit<Payment, "id"  |  "createdAt"  |  "updatedAt">): Promise<Payment> {
  const value = await paymentRepository.postPayments(data); 

  if(!value) {
    throw notFoundError();
  }
  return value;      
}

const paymentsService = {
  postPayments,
  getPayments,
};
  
export default paymentsService;
