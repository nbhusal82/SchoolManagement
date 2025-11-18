import express from "express"
import { test, test1 } from "../controller/auth.controller.js" 
const router=express.Router();
router.get("/users",test);
router.get("/hey",test1);


export default router;


