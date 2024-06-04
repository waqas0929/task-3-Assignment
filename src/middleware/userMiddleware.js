import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import tokenModel from "../models/tokenModel.js";


const authenticateJWT = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    
    const tokenEntry = await tokenModel.findOne({ where: { token } });
    
    if (!tokenEntry) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    const user = await userModel.findByPk(decoded.id);;
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateJWT;
