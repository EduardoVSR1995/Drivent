import { Router } from "express";
import { authenticateToken, authenticateParams, authenticateProcess } from "@/middlewares";
import { getPayments, postPayments } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", authenticateParams, getPayments)
  .post("/process", authenticateProcess, postPayments);

export { paymentsRouter };
