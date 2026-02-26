const { ObjectId } = require('mongodb');
const { getDB } = require('../config/mockDatabase');

class Product {
  static getCollection() {
    return getDB().getCollection('products');
  }

  // Get all products with optional filters
  static async findAll(filters = {}) {
    try {
      const query = {};
      
      // Category filter
      if (filters.category) {
        query.category = filters.category;
      }
      
      // Price range filter
      if (filters.minPrice || filters.maxPrice) {
        query.price = {};
        if (filters.minPrice) query.price.$gte = parseFloat(filters.minPrice);
        if (filters.maxPrice) query.price.$lte = parseFloat(filters.maxPrice);
      }
      
      // Search by name
      if (filters.search) {
        query.name = { $regex: filters.search, $options: 'i' };
      }

      const collection = this.getCollection();
      const products = await collection.find(query).toArray();
      
      return products;
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  // Get single product by ID
  static async findById(id) {
    try {
      const collection = this.getCollection();
      const product = await collection.findOne({ _id: new ObjectId(id) });
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      return product;
    } catch (error) {
      throw new Error(`Error fetching product: ${error.message}`);
    }
  }

  // Search products
  static async search(searchTerm) {
    try {
      const collection = this.getCollection();
      const products = await collection.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } }
        ]
      }).toArray();
      
      return products;
    } catch (error) {
      throw new Error(`Error searching products: ${error.message}`);
    }
  }

  // Get products by category
  static async findByCategory(category) {
    try {
      const collection = this.getCollection();
      const products = await collection.find({ category }).toArray();
      
      return products;
    } catch (error) {
      throw new Error(`Error fetching products by category: ${error.message}`);
    }
  }

  // Create new product (admin function)
  static async create(productData) {
    try {
      const collection = this.getCollection();
      const result = await collection.insertOne({
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      return { _id: result.insertedId, ...productData };
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  // Update product (admin function)
  static async update(id, productData) {
    try {
      const collection = this.getCollection();
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            ...productData, 
            updatedAt: new Date() 
          } 
        }
      );
      
      if (result.matchedCount === 0) {
        throw new Error('Product not found');
      }
      
      return await this.findById(id);
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  // Delete product (admin function)
  static async delete(id) {
    try {
      const collection = this.getCollection();
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      
      if (result.deletedCount === 0) {
        throw new Error('Product not found');
      }
      
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }
}

module.exports = Product;
