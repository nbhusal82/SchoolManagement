import express from "express";
import dotenv from "dotenv";
import db from "./config/dbconn.js";
import router from "./routes/auth.routes.js";
import cookie from "cookie-parser";
import teacher_router from "./routes/teacher.routes.js";
import vacancyroutes from "./routes/vacancy.routes.js";
import { errorhandeler } from "./middlewares/errorhandel.js";
import cors from "cors";
dotenv.config();
const app = express();

app.use(cookie());
// to parse JSON request body (data aune user bbhata).
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));

const port = process.env.port;
//api ko path dine..

app.use("/api/auth", router);
app.use("/api/teacher", teacher_router);
app.use("/api/vacancy", vacancyroutes);
app.use(errorhandeler);

try {
  await db.connect();
  console.log("MySQL Connection");
} catch (error) {
  console.log("MySQL Connection Error:", error);
}

//arrow function..
app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
