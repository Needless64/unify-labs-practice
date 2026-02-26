// TITAN STORE - Checkout Page
const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    loadCartSummary();
    updateCartBadge();
    setupDeliveryOptions();
    setupNavigation();
    setupFormValidation();
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
    
    // Add back to cart button
    const header = document.querySelector('header .max-w-7xl');
    if (header && !document.getElementById('backToCart')) {
        const backBtn = document.createElement('button');
        backBtn.id = 'backToCart';
        backBtn.className = 'flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors';
        backBtn.innerHTML = '<span class="material-symbols-outlined">arrow_back</span> Back to Cart';
        backBtn.addEventListener('click', () => {
            window.location.href = 'stitch-cart.html';
        });
        header.insertBefore(backBtn, header.firstChild.nextSibling);
    }
}

function setupFormValidation() {
    const form = document.querySelector('form');
    const continueBtn = document.querySelector('button.bg-primary');
    
    if (continueBtn) {
        continueBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form?.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields?.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (isValid) {
                completeOrder();
            } else {
                showNotification('Please fill in all required fields', 'error');
            }
        });
    }
}

function completeOrder() {
    const cart = JSON.parse(localStorage.getItem('titanCart') || '[]');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    // Show success message
    showNotification('Order placed successfully!', 'success');
    
    // Clear cart after 1 second
    setTimeout(() => {
        localStorage.removeItem('titanCart');
        
        // Show order confirmation
        document.body.innerHTML = `
            <div class="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
                <div class="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-8 text-center">
                    <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span class="material-symbols-outlined text-5xl text-green-600">check_circle</span>
                    </div>
                    <h1 class="text-3xl font-bold mb-4">Order Confirmed!</h1>
                    <p class="text-lg text-slate-600 dark:text-slate-400 mb-2">Thank you for your purchase</p>
                    <p class="text-2xl font-bold text-primary mb-8">Order Total: ₹${total.toFixed(2)}</p>
                    <div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 mb-8">
                        <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">Order Number</p>
                        <p class="text-xl font-bold">#TN${Date.now().toString().slice(-8)}</p>
                    </div>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-8">
                        A confirmation email has been sent to your email address.<br/>
                        Your order will be delivered in 5-7 business days.
                    </p>
                    <button onclick="window.location.href='stitch-homepage.html'" class="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                        Continue Shopping
                    </button>
                </div>
            </div>
        `;
    }, 1000);
}

function loadCartSummary() {
    const cart = JSON.parse(localStorage.getItem('titanCart') || '[]');
    
    if (cart.length === 0) {
        window.location.href = 'stitch-cart.html';
        return;
    }
    
    // Update mini product list
    const productListHTML = cart.map(item => `
        <div class="flex gap-3">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded"/>
            <div class="flex-1">
                <div class="text-sm font-semibold">${item.name}</div>
                <div class="text-xs text-slate-500">Qty: ${item.quantity}</div>
                <div class="text-sm font-bold text-primary">₹${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        </div>
    `).join('');
    
    // Find and update the product list container
    const summarySection = document.querySelector('#orderSummary, .space-y-4.mb-6.pb-6');
    if (summarySection) {
        summarySection.innerHTML = productListHTML;
    }
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const tax = subtotal * 0.1;
    const shipping = 0; // Free shipping
    const total = subtotal + tax + shipping;
    
    // Update price breakdown
    updatePriceElement('Items', `₹${subtotal.toFixed(2)}`, totalItems);
    updatePriceElement('Shipping:', 'FREE');
    updatePriceElement('Estimated Tax:', `₹${tax.toFixed(2)}`);
    updatePriceElement('Order Total:', `₹${total.toFixed(2)}`);
}

function updatePriceElement(label, value, itemCount = null) {
    // Find all flex containers with justify-between that contain price info
    const priceRows = document.querySelectorAll('.flex.justify-between');
    
    priceRows.forEach(row => {
        const spans = row.querySelectorAll('span');
        if (spans.length >= 2) {
            const labelSpan = spans[0];
            const valueSpan = spans[1];
            
            if (label === 'Items' && labelSpan.textContent.includes('Items')) {
                if (itemCount !== null) {
                    labelSpan.textContent = `Items (${itemCount}):`;
                }
                valueSpan.textContent = value;
            } else if (labelSpan.textContent.trim() === label) {
                valueSpan.textContent = value;
            } else if (label === 'Order Total:' && labelSpan.textContent.includes('Order Total')) {
                valueSpan.textContent = value;
            }
        }
    });
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('titanCart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart badges
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

function setupDeliveryOptions() {
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const cart = JSON.parse(localStorage.getItem('titanCart') || '[]');
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const tax = subtotal * 0.1;
            
            let shippingCost = 0;
            const label = e.target.parentElement.querySelector('.font-semibold')?.textContent || '';
            
            if (label.includes('Express')) {
                shippingCost = 9.99;
            } else if (label.includes('Next Day')) {
                shippingCost = 19.99;
            }
            
            const total = subtotal + tax + shippingCost;
            
            // Update shipping display
            updatePriceElement('Shipping:', shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`);
            updatePriceElement('Order Total:', `₹${total.toFixed(2)}`);
        });
    });
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
