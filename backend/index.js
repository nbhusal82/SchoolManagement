import express from "express";
import dotenv from "dotenv";
import db from "./config/dbconn.js";
import router from "./routes/auth.routes.js";
import cookie from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookie());
// to parse JSON request body (data aune user bbhata).
app.use(express.json());

const port = process.env.port;
//api ko path dine..

app.use("/api/school", router);

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
