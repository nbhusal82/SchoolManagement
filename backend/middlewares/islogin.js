// get me
export const islogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({
        message: "hey hacker login ",
      });
    }
    next();
  } catch (error) {}
};

