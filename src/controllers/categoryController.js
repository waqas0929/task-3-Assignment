import categoryModel from "../models/categoryModel.js";
import sendEmailNotification from "../services/emailNotificationServices.js";



const categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const category = await categoryModel.findAll({
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get all category", error });
    }
  },

  // Create a new category
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;

      const category = new categoryModel();
      category.name = name;
      await category.save();

      const subject = "Category";
      const content = "Category Added Successfully!";
      await sendEmailNotification(req.user.email, subject, content);

      res.status(201).json({ message: "Category created", category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create category", error });
    }
  },

  // Get a category by ID
  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await categoryModel.findByPk(id);
      if (!category) {
        res.status(404).json({ error: "Category not found" });
      } else {
        res.status(200).json(category);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch category" });
    }
  },

  // Update a category
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const [updatedRowCount] = await categoryModel.update({ name }, { where: { id } });
      if (updatedRowCount > 0) {
        const updatedCategory = await categoryModel.findByPk(id);
        res.status(200).json(updatedCategory);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update category" });
    }
  },

  // Delete a category
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRowCount = await categoryModel.destroy({ where: { id } });
      if (deletedRowCount > 0) {
        res.status(200).json({ message: "Category deleted successfully" });
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete category" });
    }
  },
};

export default categoryController;
