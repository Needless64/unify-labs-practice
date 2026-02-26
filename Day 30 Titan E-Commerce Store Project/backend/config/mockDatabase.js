// Mock database for testing without MongoDB
const { ObjectId } = require('mongodb');

class MockDatabase {
  constructor() {
    this.products = [];
    this.orders = [];
    this.connected = false;
  }

  async connect() {
    console.log('✅ Using Mock Database (No MongoDB required)');
    this.connected = true;
    
    // Seed with sample products
    this.products = [
      {
        _id: new ObjectId(),
        name: "Premium Wireless Headphones",
        description: "High-quality noise-cancelling wireless headphones with 30-hour battery life.",
        price: 199.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        stock: 50,
        rating: 4.5,
        reviews: 128
      },
      {
        _id: new ObjectId(),
        name: "Smart Watch Pro",
        description: "Advanced fitness tracking smartwatch with heart rate monitor and GPS.",
        price: 299.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        stock: 35,
        rating: 4.7,
        reviews: 95
      },
      {
        _id: new ObjectId(),
        name: "Leather Messenger Bag",
        description: "Handcrafted genuine leather messenger bag perfect for work or travel.",
        price: 149.99,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        stock: 25,
        rating: 4.3,
        reviews: 67
      },
      {
        _id: new ObjectId(),
        name: "Running Shoes Elite",
        description: "Professional running shoes with advanced cushioning.",
        price: 129.99,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        stock: 60,
        rating: 4.6,
        reviews: 142
      },
      {
        _id: new ObjectId(),
        name: "Minimalist Desk Lamp",
        description: "Modern LED desk lamp with adjustable brightness.",
        price: 79.99,
        category: "Home",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
        stock: 40,
        rating: 4.4,
        reviews: 89
      },
      {
        _id: new ObjectId(),
        name: "Portable Bluetooth Speaker",
        description: "Waterproof portable speaker with 360-degree sound.",
        price: 89.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
        stock: 45,
        rating: 4.5,
        reviews: 103
      },
      {
        _id: new ObjectId(),
        name: "Classic Sunglasses",
        description: "Timeless aviator sunglasses with UV protection.",
        price: 159.99,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
        stock: 30,
        rating: 4.2,
        reviews: 76
      },
      {
        _id: new ObjectId(),
        name: "Yoga Mat Premium",
        description: "Extra-thick non-slip yoga mat with carrying strap.",
        price: 49.99,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
        stock: 55,
        rating: 4.8,
        reviews: 156
      }
    ];
    
    console.log(`📦 Loaded ${this.products.length} sample products`);
  }

  getCollection(name) {
    if (name === 'products') {
      return {
        find: (query = {}) => ({
          toArray: async () => {
            let results = [...this.products];
            
            if (query.category) {
              results = results.filter(p => p.category === query.category);
            }
            
            if (query.price) {
              if (query.price.$gte) {
                results = results.filter(p => p.price >= query.price.$gte);
              }
              if (query.price.$lte) {
                results = results.filter(p => p.price <= query.price.$lte);
              }
            }
            
            if (query.name && query.name.$regex) {
              const regex = new RegExp(query.name.$regex, query.name.$options || '');
              results = results.filter(p => regex.test(p.name));
            }
            
            if (query.$or) {
              results = this.products.filter(p => {
                return query.$or.some(condition => {
                  if (condition.name && condition.name.$regex) {
                    const regex = new RegExp(condition.name.$regex, condition.name.$options || '');
                    return regex.test(p.name);
                  }
                  if (condition.description && condition.description.$regex) {
                    const regex = new RegExp(condition.description.$regex, condition.description.$options || '');
                    return regex.test(p.description);
                  }
                  if (condition.category && condition.category.$regex) {
                    const regex = new RegExp(condition.category.$regex, condition.category.$options || '');
                    return regex.test(p.category);
                  }
                  return false;
                });
              });
            }
            
            return results;
          },
          sort: () => ({ toArray: async () => this.products })
        }),
        findOne: async (query) => {
          if (query._id) {
            return this.products.find(p => p._id.toString() === query._id.toString());
          }
          return this.products.find(p => {
            return Object.keys(query).every(key => p[key] === query[key]);
          });
        },
        insertOne: async (doc) => {
          const newDoc = { _id: new ObjectId(), ...doc };
          this.products.push(newDoc);
          return { insertedId: newDoc._id };
        },
        updateOne: async (query, update) => {
          const index = this.products.findIndex(p => p._id.toString() === query._id.toString());
          if (index !== -1) {
            this.products[index] = { ...this.products[index], ...update.$set };
            return { matchedCount: 1, modifiedCount: 1 };
          }
          return { matchedCount: 0, modifiedCount: 0 };
        },
        deleteOne: async (query) => {
          const index = this.products.findIndex(p => p._id.toString() === query._id.toString());
          if (index !== -1) {
            this.products.splice(index, 1);
            return { deletedCount: 1 };
          }
          return { deletedCount: 0 };
        },
        deleteMany: async () => {
          this.products = [];
          return { deletedCount: this.products.length };
        }
      };
    }
    
    if (name === 'orders') {
      return {
        find: (query = {}) => ({
          sort: () => ({
            toArray: async () => {
              let results = [...this.orders];
              if (query.status) {
                results = results.filter(o => o.status === query.status);
              }
              if (query.email) {
                results = results.filter(o => o.email === query.email);
              }
              return results;
            }
          }),
          toArray: async () => this.orders
        }),
        findOne: async (query) => {
          if (query._id) {
            return this.orders.find(o => o._id.toString() === query._id.toString());
          }
          return this.orders.find(o => {
            return Object.keys(query).every(key => o[key] === query[key]);
          });
        },
        insertOne: async (doc) => {
          const newDoc = { _id: new ObjectId(), ...doc };
          this.orders.push(newDoc);
          return { insertedId: newDoc._id };
        },
        updateOne: async (query, update) => {
          const index = this.orders.findIndex(o => o._id.toString() === query._id.toString());
          if (index !== -1) {
            this.orders[index] = { ...this.orders[index], ...update.$set };
            return { matchedCount: 1, modifiedCount: 1 };
          }
          return { matchedCount: 0, modifiedCount: 0 };
        }
      };
    }
  }
}

const mockDB = new MockDatabase();

module.exports = {
  connectDB: async () => mockDB.connect(),
  getDB: () => mockDB,
  closeDB: async () => { mockDB.connected = false; }
};
