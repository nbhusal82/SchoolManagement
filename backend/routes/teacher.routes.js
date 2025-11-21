import express from "express";
import {
  addteacher,
  deleteTeacher,
  getteacher,
} from "../controller/teacher.controller.js";
import { islogin } from "../middlewares/islogin.js";

const teacher_router = express.Router();
teacher_router.post("/add-teacher", islogin, addteacher);
teacher_router.get("/get-teacher", islogin, getteacher);
teacher_router.delete("/delete/:id", islogin, deleteTeacher);
export default teacher_router;
