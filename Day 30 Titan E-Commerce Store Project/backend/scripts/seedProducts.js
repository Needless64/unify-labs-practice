require('dotenv').config();
const { connectDB, closeDB } = require('../config/database');
const Product = require('../models/Product');

const sampleProducts = [
  {
    name: "Premium Wireless Headphones",
    description: "High-quality noise-cancelling wireless headphones with 30-hour battery life and premium sound quality.",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 50,
    rating: 4.5,
    reviews: 128
  },
  {
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking smartwatch with heart rate monitor, GPS, and water resistance.",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: 35,
    rating: 4.7,
    reviews: 95
  },
  {
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
    name: "Running Shoes Elite",
    description: "Professional running shoes with advanced cushioning and breathable mesh design.",
    price: 129.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    stock: 60,
    rating: 4.6,
    reviews: 142
  },
  {
    name: "Minimalist Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness and USB charging port.",
    price: 79.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
    stock: 40,
    rating: 4.4,
    reviews: 89
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Waterproof portable speaker with 360-degree sound and 12-hour battery life.",
    price: 89.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    stock: 45,
    rating: 4.5,
    reviews: 103
  },
  {
    name: "Classic Sunglasses",
    description: "Timeless aviator sunglasses with UV protection and polarized lenses.",
    price: 159.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    stock: 30,
    rating: 4.2,
    reviews: 76
  },
  {
    name: "Yoga Mat Premium",
    description: "Extra-thick non-slip yoga mat with carrying strap, perfect for all exercises.",
    price: 49.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    stock: 55,
    rating: 4.8,
    reviews: 156
  },
  {
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 handmade ceramic coffee mugs with unique glazed finish.",
    price: 39.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500",
    stock: 70,
    rating: 4.6,
    reviews: 112
  },
  {
    name: "Wireless Keyboard & Mouse",
    description: "Ergonomic wireless keyboard and mouse combo with long battery life.",
    price: 69.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    stock: 42,
    rating: 4.4,
    reviews: 98
  },
  {
    name: "Designer Backpack",
    description: "Stylish and functional backpack with laptop compartment and water-resistant material.",
    price: 119.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    stock: 38,
    rating: 4.5,
    reviews: 87
  },
  {
    name: "Fitness Resistance Bands",
    description: "Set of 5 resistance bands with different strength levels for home workouts.",
    price: 29.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500",
    stock: 80,
    rating: 4.7,
    reviews: 134
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    
    await connectDB();
    
    // Clear existing products
    const collection = Product.getCollection();
    await collection.deleteMany({});
    console.log('🗑️  Cleared existing products');
    
    // Insert sample products
    for (const product of sampleProducts) {
      await Product.create(product);
    }
    
    console.log(`✅ Successfully seeded ${sampleProducts.length} products`);
    console.log('📦 Products added:');
    sampleProducts.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.name} - $${p.price} (${p.category})`);
    });
    
    await closeDB();
    console.log('✨ Database seed completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
