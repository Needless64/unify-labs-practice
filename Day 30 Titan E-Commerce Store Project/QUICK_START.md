# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Start Backend Server
```bash
npm start
```
Server will run on `http://localhost:5000`

### Step 3: Open Frontend
Open `frontend/stitch-homepage.html` in your browser

**OR** use a local server (recommended):
```bash
# Using Python
cd frontend
python -m http.server 8000

# Using Node.js
npx http-server frontend -p 8000
```

Then visit `http://localhost:8000/stitch-homepage.html`

---

## 📁 File Guide

### Main Pages
- `stitch-homepage.html` - Start here! Main product listing page
- `stitch-product.html` - Product detail page
- `stitch-cart.html` - Shopping cart
- `stitch-checkout-v2.html` - Checkout flow

### JavaScript Files
- `stitch-main-v2.js` - Homepage functionality (search, filters, add to cart)
- `stitch-product.js` - Product page logic
- `stitch-cart.js` - Cart management (add/remove/update)
- `stitch-checkout.js` - Checkout process

---

## ✨ Key Features to Try

1. **Search Products** - Use the search bar on homepage
2. **Filter by Category** - Check Electronics, Fashion, etc.
3. **Filter by Price** - Enter min/max price in ₹
4. **Add to Cart** - Click "Add to Cart" on any product
5. **View Cart** - Click cart icon (shows item count)
6. **Update Quantities** - Use +/- buttons in cart
7. **Remove Items** - Click "Delete" button
8. **Checkout** - Click "Proceed to checkout"

---

## 💡 Tips

- Cart data is saved in browser localStorage
- All prices are in Indian Rupees (₹)
- Cart badge shows total item count
- Notifications appear for cart actions
- Backend API runs on port 5000
- Frontend can run on any port (8000 recommended)

---

## 🐛 Troubleshooting

**Backend won't start?**
- Make sure MongoDB is running
- Check `.env` file configuration
- Run `npm install` again

**Frontend not loading?**
- Use a local server (don't open HTML directly)
- Check browser console for errors
- Make sure backend is running

**Cart not working?**
- Clear browser localStorage
- Refresh the page
- Check browser console

---

## 📞 Need Help?

Check the main README.md for detailed documentation!
