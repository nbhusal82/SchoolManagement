import express from "express";
import {
  addvacancy,
  deletevacancy,
  getvacancy,
} from "../controller/vacancy.controller.js";

const vacancyroutes = express.Router();
vacancyroutes.post("/vacancy", addvacancy);
vacancyroutes.get("/getvacancy", getvacancy);
vacancyroutes.delete("/deletevac/:id", deletevacancy);

export default vacancyroutes;
