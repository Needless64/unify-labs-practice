// TITAN STORE - Product Detail Page
(function() {
    'use strict';
    
    let cart = [];
    let currentProduct = null;
    
    // Load cart from localStorage
    function loadCart() {
        try {
            const stored = localStorage.getItem('titanCart');
            cart = stored ? JSON.parse(stored) : [];
            return cart;
        } catch (e) {
            cart = [];
            return cart;
        }
    }
    
    // Save cart to localStorage
    function saveCart() {
        try {
            localStorage.setItem('titanCart', JSON.stringify(cart));
        } catch (e) {
            console.error('Error saving cart');
        }
    }
    
    // Update cart badge
    function updateCartBadge() {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        document.querySelectorAll('span').forEach(span => {
            const text = span.textContent.trim();
            if (!isNaN(text) && text.length <= 2) {
                const parent = span.parentElement;
                if (parent) {
                    const hasCartIcon = parent.innerHTML.includes('shopping_cart');
                    if (hasCartIcon && span.classList.contains('bg-primary')) {
                        span.textContent = totalItems;
                    }
                }
            }
        });
    }
    
    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 10000;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease-out;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }
    
    // Add to cart
    function addToCart(productData) {
        const existing = cart.find(item => item.id === productData.id);
        if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            cart.push({
                id: productData.id,
                name: productData.name,
                price: productData.price,
                image: productData.image,
                quantity: 1
            });
        }
        
        saveCart();
        updateCartBadge();
        showNotification('✓ Added to cart!');
    }
    
    // Setup navigation
    function setupNavigation() {
        // Logo click
        const logo = document.querySelector('h1');
        if (logo) {
            logo.style.cursor = 'pointer';
            logo.addEventListener('click', () => {
                window.location.href = 'stitch-homepage.html';
            });
        }
        
        // Breadcrumb navigation
        const breadcrumbs = document.querySelectorAll('nav a');
        breadcrumbs.forEach(link => {
            if (!link.href || link.href.includes('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = 'stitch-homepage.html';
                });
            }
        });
        
        // Cart navigation
        document.querySelectorAll('.material-symbols-outlined').forEach(icon => {
            if (icon.textContent.trim() === 'shopping_cart') {
                let parent = icon.parentElement;
                while (parent && parent !== document.body) {
                    if (parent.classList.contains('cursor-pointer') || 
                        parent.tagName === 'BUTTON' || 
                        parent.tagName === 'A') {
                        
                        parent.style.cursor = 'pointer';
                        parent.addEventListener('click', function(e) {
                            e.preventDefault();
                            window.location.href = 'stitch-cart.html';
                        });
                        break;
                    }
                    parent = parent.parentElement;
                }
            }
        });
        
        // Add back button to header
        const header = document.querySelector('header .max-w-7xl');
        if (header && !document.getElementById('backToHome')) {
            const backBtn = document.createElement('button');
            backBtn.id = 'backToHome';
            backBtn.className = 'flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-primary transition-colors';
            backBtn.innerHTML = '<span class="material-symbols-outlined text-lg">arrow_back</span> Back to Shop';
            backBtn.addEventListener('click', () => {
                window.location.href = 'stitch-homepage.html';
            });
            header.insertBefore(backBtn, header.firstChild);
        }
    }
    
    // Setup product buttons
    function setupProductButtons() {
        // Get product data from page
        const title = document.querySelector('h2')?.textContent.trim();
        const priceEl = document.querySelector('.text-3xl.font-bold');
        const price = priceEl ? parseFloat(priceEl.textContent.replace('₹', '').replace(',', '')) : 16599;
        const img = document.querySelector('img[alt="Main Product"]');
        
        currentProduct = {
            id: 'product-detail-' + Date.now(),
            name: title || 'Premium Product',
            price: price,
            image: img ? img.src : ''
        };
        
        // Setup Add to Cart button
        const addToCartBtn = document.querySelector('button.bg-\\[\\#FF9900\\]');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                addToCart(currentProduct);
            });
        }
        
        // Setup Buy Now button
        const buyNowBtn = document.querySelector('button.bg-\\[\\#FFD814\\]');
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', (e) => {
                e.preventDefault();
                addToCart(currentProduct);
                setTimeout(() => {
                    window.location.href = 'stitch-checkout-v2.html';
                }, 500);
            });
        }
        
        // Setup image gallery
        const thumbnails = document.querySelectorAll('button img');
        const mainImage = document.querySelector('img[alt="Main Product"]');
        
        thumbnails.forEach(thumb => {
            thumb.parentElement.addEventListener('click', () => {
                if (mainImage) {
                    mainImage.src = thumb.src;
                }
                // Update active thumbnail
                thumbnails.forEach(t => t.parentElement.classList.remove('border-primary'));
                thumb.parentElement.classList.add('border-primary', 'border-2');
            });
        });
    }
    
    // Initialize
    function init() {
        loadCart();
        updateCartBadge();
        setupNavigation();
        setupProductButtons();
    }
    
    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
