import express from "express"
import dotenv from "dotenv"
import db from "./config/dbconn.js";


dotenv.config();
const app=express();
const port =process.env.port
//api ko path dine..
app.get("/api/school/users", (req, res) => {

    res.json({
        message: "welcome i am user",
        status: "success",
        users: [
            { id: 1, name: "Nabin" },
            { id: 2, name: "Ram" }
        ]
    });
    
});


try {
    await db.connect();
    console.log("MySQL Connection");
} catch (error) {
    console.log("MySQL Connection Error:", error);
    
}


//arrow function..
app.listen(port,()=>
{
    console.log(`server is running in port ${port}`)
})


