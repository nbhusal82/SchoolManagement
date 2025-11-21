import express from "express";
import { login, signout, test } from "../controller/auth.controller.js";
import { islogin } from "../middlewares/islogin.js";

const router = express.Router();

router.get("/users", islogin, test);
router.post("/login", login);
router.post("/signout", signout);

// router.get("/hey",test1 );

// router.get("/is",add);
export default router;
