import db from "../config/dbconn.js";

export const addteacher = async (req, res, next) => {
  try {
    const { name, email, position, phone } = req.body;
    if (!name || !email || !position || !phone) {
      return res.status(400).json({
        message: "All Fileds are Required",
      });
    }
    const [oldemail] = await db.execute(
      "select id from teachers where email=?",
      [email]
    );
    if (oldemail.length > 0) {
      return res.status(409).json({
        message: "Email already exists .Use another eamil",
      });
    }

    // data halne database ma..
    await db.execute(
      "Insert into teachers(name,email,position,phone) values(?,?,?,?)",
      [name, email, position, phone]
    );

    return res.status(201).json({
      message: "teacher add sucessfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getteacher = async (req, res, next) => {
  try {
    const [allteacher] = await db.execute("select * from teachers ");
    res.status(200).json({
      message: "your data",
      data: allteacher,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [checkout] = await db.execute("select id from teachers where id=?", [
      id,
    ]);
    if (checkout.length === 0) {
      return res.status(404).json({
        message: "teacher not found",
        message: `teacher not found with this ${id}`,
      });
    }
    await db.execute("DELETE from teachers where id=?", [id]);
    return res.status(200).json({
      message: `teacher deleted suceessfully with id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};
export const updateteacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update_data = req.body;

    // 1. Check teacher exists
    const [teacher] = await db.execute("SELECT * FROM teachers WHERE id=?", [
      id,
    ]);

    if (teacher.length === 0) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const oldteacher = teacher[0];

    // 2. If email changed → check duplicate (ignore current ID)
    if (update_data.email && update_data.email !== oldteacher.email) {
      const [emailteacher] = await db.execute(
        "SELECT email FROM teachers WHERE email=? AND id != ?",
        [update_data.email, id]
      );

      if (emailteacher.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    // 3. Safe final data (undefined allowed NO)
    const finaldata = {
      name: update_data.name ?? oldteacher.name,
      email: update_data.email ?? oldteacher.email,
      phone: update_data.phone ?? oldteacher.phone,
      position: update_data.position ?? oldteacher.position,
    };

    // 4. Update SQL
    await db.execute(
      "UPDATE teachers SET name=?, email=?, phone=?, position=? WHERE id=?",
      [finaldata.name, finaldata.email, finaldata.phone, finaldata.position, id]
    );

    res.status(200).json({ message: "Teacher updated successfully" });
  } catch (error) {
    next(error);
  }
};
