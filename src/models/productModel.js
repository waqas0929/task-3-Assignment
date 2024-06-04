// user.js
import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";
// import categoryModelModel from "./categoryModels.js"

const productModel = sequelize.define("product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default productModel;
