import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token 

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    jwt.verify(token, process.env.SRTOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }

      req.userid = decoded.id; 
      next(); 
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
