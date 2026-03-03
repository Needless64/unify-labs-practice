// Stitch Cart Page - Backend Integration
const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    // Find the cart items container and add ID if missing
    const cartItemsContainer = document.querySelector('.space-y-6');
    if (cartItemsContainer && !cartItemsContainer.id) {
        cartItemsContainer.id = 'cartItems';
        
        // Add empty cart message if it doesn't exist
        if (!document.getElementById('emptyCart')) {
            const emptyCartDiv = document.createElement('div');
            emptyCartDiv.id = 'emptyCart';
            emptyCartDiv.className = 'text-center py-12';
            emptyCartDiv.style.display = 'none';
            emptyCartDiv.innerHTML = `
                <span class="material-symbols-outlined text-6xl text-slate-300 mb-4 block">shopping_cart</span>
                <h3 class="text-2xl font-bold mb-2">Your cart is empty</h3>
                <p class="text-slate-500 mb-6">Add items to get started</p>
                <a href="stitch-homepage.html" class="inline-block px-6 py-3 bg-primary hover:bg-orange-600 text-white font-bold rounded-lg transition-colors">
                    Continue Shopping
                </a>
            `;
            cartItemsContainer.parentElement.appendChild(emptyCartDiv);
        }
    }
    
    renderCart();
    updateCartBadge();
    setupNavigation();
});

function setupNavigation() {
    // Setup logo click to go back to homepage
    const logo = document.querySelector('h1');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.location.href = 'stitch-homepage.html';
        });
    }
    
    // Setup all links in header
    document.querySelectorAll('header a').forEach(link => {
        if (!link.href || link.href.includes('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'stitch-homepage.html';
            });
        }
    });
}

function formatINR(amount) {
    // Convert to number and format with 2 decimal places
    const num = parseFloat(amount) || 0;
    return num.toLocaleString('en-IN', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
}

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('titanCart') || '[]');
    const cartContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    
    if (cart.length === 0) {
        if (cartContainer) cartContainer.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        updateSummary(0, 0);
        return;
    }
    
    if (cartContainer) cartContainer.style.display = 'block';
    if (emptyCart) emptyCart.style.display = 'none';
    
    // Calculate totals - ensure all values are numbers
    let subtotal = 0;
    let totalItems = 0;
    
    if (cartContainer) {
        cartContainer.innerHTML = cart.map(item => {
            // Parse price and quantity as numbers
            const itemPrice = parseFloat(item.price) || 0;
            const itemQuantity = parseInt(item.quantity) || 0;
            const itemTotal = itemPrice * itemQuantity;
            
            // Add to running totals
            subtotal += itemTotal;
            totalItems += itemQuantity;
            
            return `
            <div class="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <img src="${item.image}" alt="${item.name}" class="w-32 h-32 object-cover rounded-lg"/>
                <div class="flex-1">
                    <h3 class="font-bold text-lg mb-2">${item.name}</h3>
                    <div class="flex items-center gap-1 mb-2">
                        ${renderStars(4.5)}
                        <span class="text-xs text-slate-500 ml-1">(${Math.floor(Math.random() * 1000 + 100)})</span>
                    </div>
                    <p class="text-sm text-green-600 font-semibold mb-3">In Stock</p>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg">
                            <button onclick="updateQuantity('${item.id}', ${itemQuantity - 1})" class="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800">-</button>
                            <span class="px-4 py-1 border-x border-slate-300 dark:border-slate-700">${itemQuantity}</span>
                            <button onclick="updateQuantity('${item.id}', ${itemQuantity + 1})" class="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800">+</button>
                        </div>
                        <button onclick="removeItem('${item.id}')" class="text-sm text-blue-600 hover:text-red-600 hover:underline">Delete</button>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-2xl font-bold text-primary">₹${formatINR(itemTotal)}</div>
                    <div class="text-sm text-slate-500">₹${formatINR(itemPrice)} each</div>
                </div>
            </div>
        `;
        }).join('');
    }
    
    updateSummary(subtotal, totalItems);
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<span class="material-symbols-outlined text-yellow-400 text-sm fill-gold">star</span>';
    }
    for (let i = fullStars; i < 5; i++) {
        stars += '<span class="material-symbols-outlined text-slate-300 text-sm">star</span>';
    }
    return stars;
}

function updateSummary(subtotal, totalItems) {
    // Format the subtotal
    const formattedSubtotal = `₹${formatINR(subtotal)}`;
    const itemText = totalItems === 1 ? 'item' : 'items';
    const itemCountText = `Subtotal (${totalItems} ${itemText}):`;
    
    // Update main subtotal (bottom of cart items)
    const mainSubtotalText = document.getElementById('mainSubtotalText');
    const mainSubtotal = document.getElementById('mainSubtotal');
    if (mainSubtotalText) {
        mainSubtotalText.innerHTML = `${itemCountText} <span class="font-bold text-xl" id="mainSubtotal">${formattedSubtotal}</span>`;
    } else if (mainSubtotal) {
        mainSubtotal.textContent = formattedSubtotal;
    }
    
    // Update sidebar subtotal
    const sidebarItemCount = document.getElementById('sidebarItemCount');
    const sidebarSubtotal = document.getElementById('sidebarSubtotal');
    
    if (sidebarItemCount) {
        sidebarItemCount.textContent = itemCountText;
    }
    if (sidebarSubtotal) {
        sidebarSubtotal.textContent = formattedSubtotal;
    }
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeItem(productId);
        return;
    }
    
    let cart = JSON.parse(localStorage.getItem('titanCart') || '[]');
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('titanCart', JSON.stringify(cart));
        renderCart();
        updateCartBadge();
    }
}

function removeItem(productId) {
    let cart = JSON.parse(localStorage.getItem('titanCart') || '[]');
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('titanCart', JSON.stringify(cart));
    renderCart();
    updateCartBadge();
    showNotification('Item removed from cart');
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('titanCart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + parseInt(item.quantity || 0), 0);
    
    // Find all cart badge elements
    document.querySelectorAll('span').forEach(span => {
        // Check if this span is a cart badge (has bg-primary class and is near a shopping_cart icon)
        if (span.classList.contains('bg-primary') && span.classList.contains('rounded-full')) {
            const parent = span.closest('button');
            if (parent) {
                const hasCartIcon = parent.querySelector('.material-symbols-outlined');
                if (hasCartIcon && hasCartIcon.textContent.includes('shopping_cart')) {
                    span.textContent = totalItems;
                }
            }
        }
    });
}

function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('titanCart') || '[]');
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    window.location.href = 'stitch-checkout-v2.html';
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}
