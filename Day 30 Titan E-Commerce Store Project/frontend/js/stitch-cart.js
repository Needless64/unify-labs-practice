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
    
    // Force update sidebar after a short delay to ensure DOM is ready
    setTimeout(() => {
        const cart = JSON.parse(localStorage.getItem('titanCart') || '[]');
        const subtotal = cart.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0);
        updateSummary(subtotal, 0, subtotal);
    }, 100);
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

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('titanCart') || '[]');
    const cartContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    
    if (cart.length === 0) {
        if (cartContainer) cartContainer.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        updateSummary(0, 0, 0);
        return;
    }
    
    if (cartContainer) cartContainer.style.display = 'block';
    if (emptyCart) emptyCart.style.display = 'none';
    
    if (cartContainer) {
        cartContainer.innerHTML = cart.map(item => {
            // Handle null or undefined prices - use 0 as fallback
            const itemPrice = item.price || 0;
            const totalPrice = itemPrice * item.quantity;
            
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
                            <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" class="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800">-</button>
                            <span class="px-4 py-1 border-x border-slate-300 dark:border-slate-700">${item.quantity}</span>
                            <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" class="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800">+</button>
                        </div>
                        <button onclick="removeItem('${item.id}')" class="text-sm text-blue-600 hover:text-red-600 hover:underline">Delete</button>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-2xl font-bold text-primary">₹${totalPrice.toFixed(2)}</div>
                    <div class="text-sm text-slate-500">₹${itemPrice.toFixed(2)} each</div>
                </div>
            </div>
        `;
        }).join('');
    }
    
    const subtotal = cart.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    updateSummary(subtotal, tax, total);
    updateItemCount(cart.length);
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

function updateSummary(subtotal, tax, total) {
    const cart = JSON.parse(localStorage.getItem('titanCart') || '[]');
    const itemCount = cart.length;
    
    // Format prices with commas for INR
    const formatINR = (amount) => {
        return '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    
    // Update ALL price elements on the page
    document.querySelectorAll('p, div, span').forEach(el => {
        const text = el.textContent.trim();
        
        // Skip if element is too large
        if (text.length > 200) return;
        
        // Replace any dollar signs with rupee
        if (text.includes('$')) {
            // Check if this is a price element (contains $ followed by numbers)
            if (text.match(/\$[\d,]+\.?\d*/)) {
                // Determine which price this is based on context
                const parentText = el.parentElement?.textContent || '';
                
                if (parentText.includes('Subtotal') || text.match(/^\$[\d,]+\.?\d*$/) && el.previousElementSibling?.textContent.includes('Subtotal')) {
                    el.textContent = formatINR(subtotal);
                } else if (parentText.includes('Tax') || text.match(/^\$[\d,]+\.?\d*$/) && el.previousElementSibling?.textContent.includes('Tax')) {
                    el.textContent = formatINR(tax);
                } else if (parentText.includes('Total') || text.match(/^\$[\d,]+\.?\d*$/) && el.previousElementSibling?.textContent.includes('Total')) {
                    el.textContent = formatINR(total);
                } else {
                    // Generic dollar to rupee replacement
                    el.textContent = text.replace(/\$[\d,]+\.?\d*/g, (match) => {
                        const amount = parseFloat(match.replace('$', '').replace(',', ''));
                        return formatINR(amount);
                    });
                }
            }
        }
        
        // Update item count
        if (text.includes('items)') || text.includes('item)')) {
            el.textContent = text.replace(/\(\d+ items?\)/, `(${itemCount} item${itemCount !== 1 ? 's' : ''})`);
        }
    });
    
    // Specifically target sidebar summary elements
    const summaryElements = document.querySelectorAll('aside p, .bg-white p, .dark\\:bg-slate-900 p');
    summaryElements.forEach(el => {
        const text = el.textContent.trim();
        if (text.match(/^\$[\d,]+\.?\d*$/)) {
            const prevSibling = el.previousElementSibling;
            if (prevSibling) {
                const label = prevSibling.textContent.toLowerCase();
                if (label.includes('subtotal')) {
                    el.textContent = formatINR(subtotal);
                } else if (label.includes('tax')) {
                    el.textContent = formatINR(tax);
                } else if (label.includes('total')) {
                    el.textContent = formatINR(total);
                }
            }
        }
    });
}

function updateItemCount(count) {
    const countEl = document.getElementById('itemCount');
    if (countEl) countEl.textContent = `(${count} items)`;
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('titanCart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update all cart badges on the page
    // Method 1: Find buttons with "CART" text
    document.querySelectorAll('button').forEach(btn => {
        const btnText = btn.textContent;
        if (btnText.includes('CART') || btnText.includes('Cart')) {
            // Look for span with number inside button
            const spans = btn.querySelectorAll('span');
            spans.forEach(span => {
                const spanText = span.textContent.trim();
                if (!isNaN(parseInt(spanText)) && spanText.length < 4) {
                    span.textContent = totalItems;
                }
            });
            
            // Update "CART X" text format
            if (btnText.match(/CART\s+\d+/i)) {
                btn.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        node.textContent = node.textContent.replace(/CART\s+\d+/i, `CART ${totalItems}`);
                    }
                });
            }
        }
    });
    
    // Method 2: Find any span with cart badge classes or small numbers
    document.querySelectorAll('span').forEach(span => {
        const parent = span.parentElement;
        if (parent && parent.querySelector('.material-symbols-outlined')) {
            const iconText = parent.querySelector('.material-symbols-outlined')?.textContent;
            if (iconText && iconText.includes('shopping_cart')) {
                const spanText = span.textContent.trim();
                if (!isNaN(parseInt(spanText)) && spanText.length < 4 && span.classList.contains('bg-primary')) {
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
