import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import sendEmailNotification from "../services/emailNotificationServices.js";

const productsController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productModel.findAll({
        include: [
          {
            model: category,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get all products", error });
    }
  },

  // Create a new product
  createProduct: async (req, res) => {
    try {
      const { name, price, stock, category } = req.body;

      if (!name || !price || !stock) {
        return res
          .status(400)
          .json({ error: "Missing required fields: name, price, or stock" });
      }
      
      const existingProduct = await productModel.findOne({ where: { name } });
      if (existingProduct) {
        return res
          .status(400)
          .json({ message: "Product with this name is already added" });
      }

      const newProduct = await productModel.create({
        name,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
      });

      if (category && Array.isArray(category)) {
        const categories = await categoryModel.findAll({
          where: {
            id: category,
          },
        });
        await newProduct.setCategories(categories);
      }

      const subject = "Product";
      const content = "Product added successfully!";
      await sendEmailNotification(req.user.email, subject, content);

      res.status(201).json({ message: "Product created", product: newProduct });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Failed to create product", details: error });
    }
  },

  // Get a product by ID
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productModel.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  },

  // Update a product
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const [updatedRowCount] = await Product.update(
        { name, email },
        { where: { id } }
      );
      if (updatedRowCount > 0) {
        const updatedProduct = await Product.findByPk(id);
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update product" });
    }
  },

  // Delete a product
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRowCount = await Product.destroy({ where: { id } });
      if (deletedRowCount > 0) {
        res.status(200).json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete product", error });
    }
  },
};

export default productsController;
