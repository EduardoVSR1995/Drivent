import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getAllHotels, getRoom } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("", getAllHotels)
  .get("/:hotelId", getRoom);
  
export { hotelsRouter };
