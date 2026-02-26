const { ObjectId } = require('mongodb');
const { getDB } = require('../config/mockDatabase');

class Order {
  static getCollection() {
    return getDB().getCollection('orders');
  }

  // Create new order
  static async create(orderData) {
    try {
      const collection = this.getCollection();
      
      const order = {
        customerName: orderData.customerName,
        email: orderData.email,
        phone: orderData.phone,
        address: {
          line1: orderData.addressLine1,
          line2: orderData.addressLine2 || '',
          city: orderData.city,
          state: orderData.state,
          zipCode: orderData.zipCode,
          country: orderData.country
        },
        items: orderData.items,
        subtotal: orderData.subtotal,
        shipping: orderData.shipping || 0,
        tax: orderData.tax || 0,
        totalAmount: orderData.totalAmount,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await collection.insertOne(order);
      
      return { 
        _id: result.insertedId, 
        ...order,
        message: 'Order created successfully' 
      };
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  }

  // Get order by ID
  static async findById(id) {
    try {
      const collection = this.getCollection();
      const order = await collection.findOne({ _id: new ObjectId(id) });
      
      if (!order) {
        throw new Error('Order not found');
      }
      
      return order;
    } catch (error) {
      throw new Error(`Error fetching order: ${error.message}`);
    }
  }

  // Get all orders (admin function)
  static async findAll(filters = {}) {
    try {
      const query = {};
      
      if (filters.status) {
        query.status = filters.status;
      }
      
      if (filters.email) {
        query.email = filters.email;
      }

      const collection = this.getCollection();
      const orders = await collection
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();
      
      return orders;
    } catch (error) {
      throw new Error(`Error fetching orders: ${error.message}`);
    }
  }

  // Update order status (admin function)
  static async updateStatus(id, status) {
    try {
      const collection = this.getCollection();
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            status, 
            updatedAt: new Date() 
          } 
        }
      );
      
      if (result.matchedCount === 0) {
        throw new Error('Order not found');
      }
      
      return await this.findById(id);
    } catch (error) {
      throw new Error(`Error updating order status: ${error.message}`);
    }
  }

  // Get orders by email
  static async findByEmail(email) {
    try {
      const collection = this.getCollection();
      const orders = await collection
        .find({ email })
        .sort({ createdAt: -1 })
        .toArray();
      
      return orders;
    } catch (error) {
      throw new Error(`Error fetching orders by email: ${error.message}`);
    }
  }
}

module.exports = Order;
