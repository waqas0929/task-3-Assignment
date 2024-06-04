import { Op } from "sequelize";
import tokenModel from "../models/tokenModel.js";

const cleanupExpiredToken = async () => {
  const now = new Date();

  try {
    await tokenModel.destroy({
      where: {
        tokenExpiration: {
          [Op.lt]: now,
        },
      },
    });
    console.log("Expired token cleanup successfully");
  } catch (error) {
    console.error("Error cleaning up expired token", error);
  }
};

export default cleanupExpiredToken;
