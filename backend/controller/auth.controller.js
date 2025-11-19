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
// login api
export const login=async(req,res)=>{
try {
    //1. get mail and password from users side
    const {email,password}=req.body;
    if (!email || !password){
        return res.status(400).json(
            {
                message:"invaild email & password"
            }
        )
    }

   // check users is available in database..
    const [result]=await db.execute("select * from users where email=? ANd password=?",[email,password]);
    

    // users found garne?
    if(result.length===0)
    {
        return res.status(400).json({
            message:"Invaild Credenntials",
        });
    }


    // Sucess 

    const user=result[0];
    res.status(600).json({
        Message:"login sucessful",
        user:{
            id:user.id,
            name:user.name,
            email:user.email
        }
    });

} catch (error) {
    console.log(error);
    
}


}
