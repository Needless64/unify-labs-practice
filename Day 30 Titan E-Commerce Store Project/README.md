<<<<<<< HEAD
# Titan E-Commerce Store

A professional, fully-functional e-commerce website built with modern web technologies.

## Features

- **Professional UI/UX**: Amazon-inspired design with clean, intuitive interface
- **Product Browsing**: Homepage with featured products, filters, and search
- **Product Details**: Detailed product pages with images, descriptions, and reviews
- **Shopping Cart**: Full cart functionality with add/remove items, quantity updates
- **Checkout Flow**: Multi-step checkout process with shipping and payment
- **INR Currency**: All prices displayed in Indian Rupees (₹)
- **Responsive Design**: Works seamlessly across all devices
- **Real-time Updates**: Cart badge updates, notifications, and dynamic content

## Tech Stack

### Frontend
- HTML5, CSS3 (Tailwind CSS)
- Vanilla JavaScript (ES6+)
- Material Symbols Icons
- Google Fonts (Inter)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- RESTful API architecture

## Project Structure

```
Day 30 Titan E-Commerce Store Project/
├── frontend/
│   ├── stitch-homepage.html      # Main homepage
│   ├── stitch-product.html       # Product detail page
│   ├── stitch-cart.html          # Shopping cart
│   ├── stitch-checkout-v2.html   # Checkout page
│   ├── js/
│   │   ├── stitch-main-v2.js     # Homepage logic
│   │   ├── stitch-product.js     # Product page logic
│   │   ├── stitch-cart.js        # Cart logic
│   │   └── stitch-checkout.js    # Checkout logic
│   └── css/
│       └── styles.css            # Custom styles
├── backend/
│   ├── server.js                 # Express server
│   ├── config/
│   │   ├── database.js           # MongoDB connection
│   │   └── mockDatabase.js       # Mock data
│   ├── models/
│   │   ├── Product.js            # Product schema
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── products.js           # Product routes
│   │   └── orders.js             # Order routes
│   └── scripts/
│       └── seedProducts.js       # Database seeding
└── README.md

```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Clone or download the project**

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment**
   - Copy `.env.example` to `.env`
   - Update MongoDB connection string if needed

4. **Start Backend Server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

5. **Open Frontend**
   - Open `frontend/stitch-homepage.html` in your browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     cd frontend
     python -m http.server 8000
     
     # Using Node.js http-server
     npx http-server frontend -p 8000
     ```

## Usage

### Shopping Flow
1. Browse products on the homepage
2. Use filters (category, price range) and search
3. Click on a product to view details
4. Add items to cart
5. View cart and adjust quantities
6. Proceed to checkout
7. Complete order

### Key Features

**Homepage**
- Product grid with images, prices, ratings
- Category filters (Electronics, Fashion, etc.)
- Price range filter
- Search functionality
- Cart badge with item count

**Product Page**
- Large product images
- Detailed descriptions
- Customer reviews and ratings
- Add to cart with quantity selection
- Related products

**Shopping Cart**
- View all cart items
- Update quantities (+/- buttons)
- Remove items
- See subtotal, tax, and total
- Proceed to checkout

**Checkout**
- Shipping address form
- Delivery options
- Order summary
- Secure payment flow

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status

## Currency

All prices are in Indian Rupees (₹). Conversion rate used: 1 USD = 83 INR

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development Notes

- Cart data stored in localStorage
- Dynamic content rendering with vanilla JavaScript
- Tailwind CSS via CDN for rapid styling
- Material Symbols for icons
- RESTful API design patterns

## Future Enhancements

- User authentication and profiles
- Product reviews and ratings system
- Wishlist functionality
- Order tracking
- Payment gateway integration
- Admin dashboard
- Email notifications
- Product recommendations

## License

This project is for educational purposes.

---

**Built with ❤️ for learning web development**
=======
# unify-labs-practice
🚀 My Unify Labs Internship Practice Code

This repository contains all my practice projects and exercises from the Unify Labs internship program.

## 📚 Projects

### Day 29 - Project Zenith: Full-Stack Blogging CMS

A premium, Twitter-inspired blogging platform with a stunning glassmorphic UI and full CRUD functionality.

**🚀 Live Demo**: https://project-zenith-coral.vercel.app

**Features**:
- Premium Glassmorphic UI with dark theme and neon gradients
- Twitter-like three-column layout
- Full CRUD operations for blog posts
- Real-time character counter (280 char limit)
- Serverless architecture with Vercel + Neon Postgres

**Tech Stack**: HTML5, CSS3, Vanilla JavaScript, Vercel Serverless Functions, Neon Postgres

📁 [View Project Details](./Day-29-Project-Zenith/README.md)

---

### Previous Days

- Day 01-28: Various practice exercises and projects

## 🛠️ Setup

Each day's project has its own setup instructions. Navigate to the specific day folder for details.

## 📝 License

MIT
>>>>>>> 284fbda8ba2bd0901e3097f59bc7139617596da1
