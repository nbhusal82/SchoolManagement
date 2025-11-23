// get me
import jwt from "jsonwebtoken";
export const islogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({
        message: "you must be login ",
      });
    }

    const decoded = jwt.verify(token, process.env.Secret_key);
    // console.log(decoded);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
  }
};
