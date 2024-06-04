import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const emailModel = sequelize.define(
  "emailNotification",
  {
    recipient: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "sent", "failed"),
      defaultValue: "pending",
    },
  },
  { timestamps: true }
);

export default emailModel;
