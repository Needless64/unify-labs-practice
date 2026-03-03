# Day 30: Titan E-Commerce Store

A full-stack e-commerce application built with vanilla JavaScript, Node.js, Express, and PostgreSQL (Neon), deployed on Vercel.

## 🚀 Live Demo

**Frontend:** [https://titan-ecommerce-store.vercel.app/frontend/stitch-homepage.html](https://titan-ecommerce-store.vercel.app/frontend/stitch-homepage.html)

## ✨ Features

- **Product Catalog**: Browse 8+ premium products with detailed information
- **Shopping Cart**: Add/remove items with real-time subtotal calculations
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Database Integration**: PostgreSQL database hosted on Neon
- **RESTful API**: Express.js backend with product and order endpoints
- **Persistent Storage**: Cart data stored in localStorage

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3 (Tailwind CSS)
- Vanilla JavaScript (ES6+)
- Material Icons
- Google Fonts (Inter)

### Backend
- Node.js
- Express.js
- PostgreSQL (Neon Database)
- CORS enabled for cross-origin requests

### Deployment
- **Platform**: Vercel
- **Database**: Neon PostgreSQL
- **Environment**: Production

## 📁 Project Structure

```
Day 30 Titan E-Commerce Store Project/
├── frontend/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── stitch-main-v2.js      # Homepage functionality
│   │   ├── stitch-cart.js         # Cart page logic
│   │   ├── stitch-product.js      # Product detail page
│   │   └── stitch-checkout.js     # Checkout functionality
│   ├── stitch-homepage.html
│   ├── stitch-cart.html
│   ├── stitch-product.html
│   └── stitch-checkout-v2.html
├── backend/
│   ├── config/
│   │   └── database.js            # PostgreSQL connection
│   ├── models/
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── products.js
│   │   └── orders.js
│   ├── scripts/
│   │   ├── setupDatabase.js       # Database initialization
│   │   └── seedProducts.js        # Seed sample data
│   ├── schema.sql                 # Database schema
│   └── server.js                  # Express server
└── vercel.json                    # Vercel configuration
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database (or Neon account)
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/Needless64/unifylabs.git
cd "Day 30 Titan E-Commerce Store Project"
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. **Setup database**
```bash
node scripts/setupDatabase.js
node scripts/seedProducts.js
```

5. **Start the server**
```bash
npm start
```

6. **Open frontend**
Open `frontend/stitch-homepage.html` in your browser

## 🌐 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel --prod
```

3. **Configure Environment Variables**
Add your Neon database credentials in Vercel dashboard:
- `DATABASE_URL`

## 🗄️ Database Schema

### Products Table
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    category VARCHAR(100),
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Key Features Implemented

### Cart Functionality
- ✅ Add products to cart
- ✅ Update quantities
- ✅ Remove items
- ✅ Real-time subtotal calculation (fixed INR formatting)
- ✅ Persistent cart using localStorage
- ✅ Cart badge counter

### Product Display
- ✅ Grid layout with product cards
- ✅ Product images and details
- ✅ Price formatting (₹ INR)
- ✅ Star ratings
- ✅ Stock status

### API Endpoints
- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch single product
- `POST /api/orders` - Create new order

## 🐛 Bug Fixes

### Cart Calculation Fix (Latest)
- Fixed price parsing from database (string to number conversion)
- Implemented proper INR formatting with commas
- Added IDs to HTML elements for reliable DOM updates
- Removed hardcoded subtotal values
- Ensured consistent number handling across all cart operations

## 📝 Environment Variables

```env
DATABASE_URL=postgresql://user:password@host/database
PORT=5000
```

## 🤝 Contributing

This is a learning project from UnifyLabs practice. Feel free to fork and experiment!

## 📄 License

MIT License - Feel free to use this project for learning purposes.

## 🙏 Acknowledgments

- UnifyLabs for the project structure
- Tailwind CSS for styling
- Neon for PostgreSQL hosting
- Vercel for deployment platform
