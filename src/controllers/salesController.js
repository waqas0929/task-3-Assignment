import productModel from "../models/productModel.js";
import salesModel from "../models/saleModel.js";
import sendEmailNotification from "../services/emailNotificationServices.js";

const salesController = {
  createSale: async (req, res) => {
    try {
      const { productId, quantity } = req.body;

      // Check if the product exists
      const product = await productModel.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Check if there is enough stock
      if (product.stock < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      const price = product.price * quantity;

      const updatedStock = product.stock - quantity;
      await product.update({ stock: updatedStock });

      // Create the sale record
      const newSale = await salesModel.create({
        productId,
        quantity,
        price,
      });

      const subject = "Sales";
      const content = "Happy Selling!";
      await sendEmailNotification(req.user.email, subject, content);

      res.status(201).json({ message: "Sale created", sale: newSale });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server error", error });
    }
  },

  getSalesById: async (req, res) => {
    try {
      const { saleId } = req.params;
      const sale = await salesModel.findByPk(saleId);
      if (!sale) {
        return res.status(404).json({ message: "Sale not found" });
      }
      res.json({ sale });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server error", error });
    }
  },

  getAllSales: async (req, res) => {
    try {
      const allSales = await salesModel.findAll();
      res.json({ sales: allSales });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server error", error });
    }
  },

  updateSalesById: async (req, res) => {
    try {
      const { saleId } = req.params;
      const { quantity, totalPrice } = req.body;

      const sale = await salesModel.findByPk(saleId);
      if (!sale) {
        return res.status(404).json({ message: "Sale not found" });
      }

      await sale.update({ quantity, totalPrice });

      res.json({ message: "Sale updated", sale });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server error", error });
    }
  },

  deleteSalesById: async (req, res) => {
    try {
      const { saleId } = req.params;

      const sale = await salesModel.findByPk(saleId);
      if (!sale) {
        return res.status(404).json({ message: "Sale not found" });
      }

      await sale.destroy();

      res.json({ message: "Sale deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server error", error });
    }
  },
};

export default salesController;
