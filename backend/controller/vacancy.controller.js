import db from "../config/dbconn.js";

export const addvacancy = async (req, res) => {
  try {
    const { position, description, deadline } = req.body;
    if (!position || !description || !deadline) {
      return res.status(404).json({
        message: "Please Filed",
      });
    }
    await db.execute(
      "Insert into vacancy(position,description,deadline) values(?,?,?)",
      [position, description, deadline]
    );
    return res.status(201).json({
      Message: "Vacancy add",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getvacancy = async (req, res) => {
  try {
    const [allteacher] = await db.execute("select * from vacancy ");
    res.status(200).json({
      message: "your data",
      data: allteacher,
    });
  } catch (error) {
    console.log(error);
  }
};



export const deletevacancy=async(req,res)=>{
    try {
        const { id } = req.params;
    const [checkout] = await db.execute("select id from vacancy where id=?", [
      id,
    ]); 
if (checkout.length === 0) {
      return res.status(404).json({
        message: "vacancy  not found",
        message: `vacancy not found with this ${id}`,
      });
    }
    await db.execute("DELETE from vacancy where id=?", [id]);
    return res.status(200).json({
      message: `vacancy deleted suceessfully with id ${id}`,
    });
        
    } catch (error) {
        
    }
}