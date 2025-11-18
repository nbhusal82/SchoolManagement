import db from "../config/dbconn.js";

export const test=async(req,res)=>
{
   try { 
    const [users]= await db.execute("select * from users");
    res.status(200).json({
        data:users,
    });
    
   } catch (error) {
    console.log(error);
   }
}
export const test1 =(req,res)=>
{
    res.send("hello nirajan bhusal")
}
