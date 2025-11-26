import db from "../config/dbconn.js";
import bcryptjs from "bcryptjs";
import jweb from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const test = async (req, res, next) => {
  try {
    const [users] = await db.execute("select * from users");
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
// login api
export const login = async (req, res, next) => {
  try {
    //1. get mail and password from users side
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        Message: "invaild email & password",
      });
    }

    // check users is available in database..
    const [result] = await db.execute("select * from users where email=? ", [
      email,
    ]);
    const user = result[0];
    // users found garne?
    if (result.length === 0) {
      return res.status(400).json({
        Message: "Invaild Credenntials",
      });
    }
    // check garne becrpyt bhata        //users ko passs ra database ko pass..
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "invalid credenntials" });
    }

    // jsonwebtoken
    const token = await jweb.sign(
      {
        //1 your details

        id: user.id,
        name: user.name,
        email: user.email,
      },
      //2.Secret key
      process.env.Secret_key,
      {
        //3.Expire time
        expiresIn: process.env.expire_time,
      }
    );
    res.cookie("token", token);

    // Success bhaye poxe deykine ho..

    res.status(200).json({
      Message: "login sucessful",
      user: {
        id: user.id,
        //   name: user.name,
        email: user.email,
        //   token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "logout success",
    });
  } catch (error) {
    next(error);
  }
};
