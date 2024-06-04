import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";
import productModel from "./productModel.js";
import categoryModel from "./categoryModel.js";

const productCategoryModel = sequelize.define("ProductCategory", {
  productId: {
    type: DataTypes.UUID,
    references: {
      model: productModel,
      key: 'id',
    }
  },
  categoryId: {
    type: DataTypes.UUID,
    references: {
      model: categoryModel,
      key: 'id',
    }
  },
  
},
//  {
//   timestamps: false
// }
);

productModel.belongsToMany(categoryModel, { through: productCategoryModel });
categoryModel.belongsToMany(productModel, { through: productCategoryModel });

export default productCategoryModel;
