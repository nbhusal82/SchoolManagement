export const isadmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(401).json({
      message: "You are not authorized to access this route",
    });
  }
  next();
};
