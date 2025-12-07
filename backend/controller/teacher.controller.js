import db from "../config/dbconn.js";

import { removeimg } from "../utils/removeimg.js";

export const addteacher = async (req, res, next) => {
  try {
    const { name, email, position, phone } = req.body;
    if (!name || !email || !position || !phone) {
      if (req.file) {
        removeimg(req.file.path);
      }
      res.status(400).json({
        message: "All Fileds are Required",
      });
    }
    const [oldemail] = await db.execute(
      "select id from teachers where email=?",
      [email]
    );
    if (oldemail.length > 0) {
      if (req.file) {
        removeimg(req.file.path);
      }
      return res.status(409).json({
        message: "Email already exists .Use another eamil",
      });
    }
    const image = req.file ? `uploads/teachers/${req.file.filename}` : null;
    // data halne database ma..filename
    await db.execute(
      "Insert into teachers(name,email,position,phone,image) values(?,?,?,?,?)",
      [name, email, position, phone, image]
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
    console.log(id);
    const [existing] = await db.execute(
      "select id,image from teachers where id=?",
      [id]
    );
    if (existing.length == 0) {
      return res.status(404).json({
        message: `teacher not found with this ${id}`,
      });
    }

    // Delete image if exists
    if (existing[0].img) {
      removeImage(`uploads/teachers/${existing[0].img.split("/").pop()}`);
    }

    await db.execute("delete from teachers where id=?", [id]);
    return res.status(200).json({
      message: `Teachers is deletted Successfully ${id}`,
    });
  } catch (error) {
    next(error);
  }
};
export const updateteacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, position } = req.body;

    // Check if teacher exists
    const [existing] = await db.execute("SELECT * FROM teachers WHERE id = ?", [
      id,
    ]);

    if (existing.length === 0) {
      return res.status(404).json({
        message: `Teacher not found with id ${id}`,
      });
    }

    const teacher = existing[0];

    // Use existing values if not provided
    const updatedName = name || teacher.name;
    const updatedEmail = email || teacher.email;
    const updatedPhone = phone || teacher.phone;
    const updatedPosition = position || teacher.position;

    let updatedImage = teacher.image;
    if (req.file) {
      updatedImage = `uploads/teachers/${req.file.filename}`;

      if (teacher.image) {
        removeimg(`uploads/teachers/${teacher.image.split("/").pop()}`);
      }
    }

    // Check if email already exists for another teacher
    if (email && email !== teacher.email) {
      const [emailCheck] = await db.execute(
        "SELECT id FROM teachers WHERE email = ? AND id != ?",
        [email, id]
      );

      if (emailCheck.length > 0) {
        return res.status(409).json({
          message: "Email already exists. Use another email.",
        });
      }
    }

    // Update teacher
    await db.execute(
      "UPDATE teachers SET name = ?, email = ?, phone = ?, position = ? ,image = ? WHERE id = ?",
      [
        updatedName,
        updatedEmail,
        updatedPhone,
        updatedPosition,
        updatedImage,
        id,
      ]
    );

    return res.status(200).json({
      message: "Teacher updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
