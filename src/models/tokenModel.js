import sequelize from "../db/config.js";
import userModel from "./userModel.js";
import { DataTypes } from "sequelize";

const tokenModel = sequelize.define('token',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tokenExpiration: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: userModel,
          key: "id",
        },
      },
    
})

export default tokenModel
