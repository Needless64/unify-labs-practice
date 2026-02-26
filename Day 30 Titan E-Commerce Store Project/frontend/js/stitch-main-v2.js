// TITAN STORE - Homepage Functionality
(function() {
    'use strict';
    
    const API_URL = 'http://localhost:5000/api';
    let cart = [];
    
    // Load cart from localStorage
    function loadCart() {
        try {
            const stored = localStorage.getItem('titanCart');
            cart = stored ? JSON.parse(stored) : [];
            return cart;
        } catch (e) {
            console.error('Error loading cart:', e);
            cart = [];
            return cart;
        }
    }
    
    // Save cart to localStorage
    function saveCart() {
        try {
            localStorage.setItem('titanCart', JSON.stringify(cart));
        } catch (e) {
            console.error('Error saving cart:', e);
        }
    }
    
    // Update cart badge
    function updateCartBadge() {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        // Find all elements that might be the cart badge
        document.querySelectorAll('span').forEach(span => {
            const text = span.textContent.trim();
            // Look for the badge near shopping_cart icon
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
    
    // Setup product buttons
    function setupProductButtons() {
        const productCards = document.querySelectorAll('#productsGrid > div');
        
        productCards.forEach((card, index) => {
            const button = card.querySelector('button');
            if (!button) return;
            
            // Extract product data
            const title = card.querySelector('h3');
            const priceEl = card.querySelector('.text-xl, .text-2xl');
            const img = card.querySelector('img');
            
            if (!title || !priceEl) return;
            
            const productData = {
                id: 'product-' + (index + 1),
                name: title.textContent.trim(),
                price: parseFloat(priceEl.textContent.replace('₹', '').replace(',', '')),
                image: img ? img.src : ''
            };
            
            // Remove old listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add new listener
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                addToCart(productData);
            });
        });
    }
    
    // Setup cart navigation
    function setupCartNavigation() {
        // Find all shopping_cart icons
        document.querySelectorAll('.material-symbols-outlined').forEach(icon => {
            if (icon.textContent.trim() === 'shopping_cart') {
                // Find clickable parent
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
    }
    
    // Setup product click navigation
    function setupProductNavigation() {
        const productCards = document.querySelectorAll('#productsGrid > div');
        productCards.forEach((card, index) => {
            const title = card.querySelector('h3');
            const image = card.querySelector('img');
            
            if (title) {
                title.style.cursor = 'pointer';
                title.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const productId = 'product-' + (index + 1);
                    window.location.href = 'stitch-product.html?id=' + productId;
                });
            }
            
            if (image) {
                image.style.cursor = 'pointer';
                image.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const productId = 'product-' + (index + 1);
                    window.location.href = 'stitch-product.html?id=' + productId;
                });
            }
        });
    }
    
    // Setup search functionality
    function setupSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchButton = searchInput?.nextElementSibling;
        
        if (searchInput && searchButton) {
            searchButton.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') performSearch();
            });
        }
    }
    
    function performSearch() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput?.value.trim().toLowerCase();
        
        if (!query) return;
        
        const productCards = document.querySelectorAll('#productsGrid > div');
        let visibleCount = 0;
        
        productCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            if (title.includes(query)) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        showNotification(`Found ${visibleCount} products`);
    }
    
    // Setup filter functionality
    function setupFilters() {
        // Price filter
        const applyFiltersBtn = document.getElementById('applyFilters');
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', applyPriceFilter);
        }
        
        // Category checkboxes
        document.querySelectorAll('aside input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', applyCategoryFilter);
        });
    }
    
    function applyPriceFilter() {
        const minPrice = parseFloat(document.getElementById('minPrice')?.value) || 0;
        const maxPrice = parseFloat(document.getElementById('maxPrice')?.value) || Infinity;
        
        const productCards = document.querySelectorAll('#productsGrid > div');
        let visibleCount = 0;
        
        productCards.forEach(card => {
            const priceEl = card.querySelector('.text-xl, .text-2xl');
            const priceText = priceEl?.textContent.replace('₹', '').replace(',', '').trim() || '0';
            const price = parseFloat(priceText);
            
            if (price >= minPrice && price <= maxPrice) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        showNotification(`Showing ${visibleCount} products`);
    }
    
    function applyCategoryFilter() {
        const checkedCategories = [];
        document.querySelectorAll('aside input[type="checkbox"]:checked').forEach(checkbox => {
            const label = checkbox.parentElement.textContent.trim();
            checkedCategories.push(label.toLowerCase());
        });
        
        if (checkedCategories.length === 0) {
            // Show all if no filters
            document.querySelectorAll('#productsGrid > div').forEach(card => {
                card.style.display = 'flex';
            });
            showNotification('All products shown');
            return;
        }
        
        const productCards = document.querySelectorAll('#productsGrid > div');
        let visibleCount = 0;
        
        productCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const matchesCategory = checkedCategories.some(cat => 
                title.includes(cat) || 
                (cat.includes('electronics') && (title.includes('headphone') || title.includes('speaker') || title.includes('phone') || title.includes('tablet') || title.includes('tv'))) ||
                (cat.includes('home') && (title.includes('vase') || title.includes('speaker'))) ||
                (cat.includes('fashion') && (title.includes('watch') || title.includes('backpack'))) ||
                (cat.includes('computers') && (title.includes('keyboard') || title.includes('tablet') || title.includes('laptop')))
            );
            
            if (matchesCategory) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        showNotification(`Showing ${visibleCount} products`);
    }
    
    // Initialize
    function init() {
        loadCart();
        updateCartBadge();
        setupProductButtons();
        setupCartNavigation();
        setupProductNavigation();
        setupSearch();
        setupFilters();
    }
    
    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
