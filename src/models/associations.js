import productModels from './productModel.js';
import categoryModels from './categoryModel.js';

// Define many-to-many relationship through a junction table
productModels.belongsToMany(categoryModels, { through: 'ProductCategories' });
categoryModels.belongsToMany(productModels, { through: 'ProductCategories' });
