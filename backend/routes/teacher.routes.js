import express from "express";
import {
  addteacher,
  deleteTeacher,
  getteacher,
  updateteacher,
} from "../controller/teacher.controller.js";
import { islogin } from "../middlewares/islogin.js";
import { upload } from "../utils/multer.js";

const teacher_router = express.Router();
teacher_router.post(
  "/add-teacher",
  islogin,
  upload.single("image"),
  addteacher
);
teacher_router.get("/get-teacher", islogin, getteacher);
teacher_router.delete("/delete/:id", islogin, deleteTeacher);
teacher_router.patch(
  "/update/:id",
  islogin,
  upload.single("image"),
  updateteacher
);

export default teacher_router;
