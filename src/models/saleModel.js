import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";
import productModel from "../models/productModel.js"



const salesModel = sequelize.define("sale", {
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    
    productId:{
        type:DataTypes.UUID,
        references:{
            model: productModel,
            key:"id"
        },
        allowNull:false
    },

    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    }
})

export default salesModel
