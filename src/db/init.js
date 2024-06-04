import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import tokenModel from "../models/tokenModel.js";
import userModel from "../models/userModel.js";
import "../models/associations.js";
import productCategoryModel from "../models/productCategoryModel.js";
import salesModel from "../models/saleModel.js";
import emailModel from "../models/emailModel.js";

const syncDB = async () => {
  await categoryModel.sync({ alter: true, force: false });
  await productModel.sync({ alter: true, force: false });
  await userModel.sync({ alter: true, force: false });
  await tokenModel.sync({ alter: true, force: false });
  await productCategoryModel.sync({ alter: true, force: false });
  await salesModel.sync({ alter: true, force: false });
  await emailModel.sync({ alter: true, force: false });
};

export default syncDB;
