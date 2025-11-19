import express from "express"
import {  login, test  } from "../controller/auth.controller.js" 


const router=express.Router();

router.get("/users",test);
router.post("/user",login);

// router.get("/hey",test1 );

// router.get("/is",add);
export default router;


