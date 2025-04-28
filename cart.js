class Cart {
    constructor() {
        this.items = [];
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.initializeCart();
        this.setupEventListeners();
    }

    initializeCart() {
        const t = translations.cart[this.currentLanguage];
        // Create cart HTML structure
        const cartHTML = `
            <div class="cart-overlay"></div>
            <div class="cart-sidebar">
                <div class="cart-header">
                    <h2 class="cart-title">${t.title}</h2>
                    <button class="close-cart">×</button>
                </div>
                <div class="cart-items"></div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <span>${t.total}</span>
                        <span class="total-amount">€0</span>
                    </div>
                    <button class="confirm-order">${t.confirmButton}</button>
                </div>
            </div>
            <div class="toast">${t.addedToCart}</div>
        `;

        // Add cart HTML to the body
        document.body.insertAdjacentHTML('beforeend', cartHTML);

        // Initialize elements
        this.cartSidebar = document.querySelector('.cart-sidebar');
        this.cartOverlay = document.querySelector('.cart-overlay');
        this.cartItemsContainer = document.querySelector('.cart-items');
        this.totalAmount = document.querySelector('.total-amount');
        this.toast = document.querySelector('.toast');

        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.updateCartDisplay();
        }

        // Listen for language changes
        window.addEventListener('languageChanged', (event) => {
            this.currentLanguage = event.detail.language;
            this.updateLanguage();
        });
    }

    updateLanguage() {
        const t = translations.cart[this.currentLanguage];
        
        // Update static text
        document.querySelector('.cart-title').textContent = t.title;
        document.querySelector('.cart-total span:first-child').textContent = t.total;
        document.querySelector('.confirm-order').textContent = t.confirmButton;
        document.querySelector('.toast').textContent = t.addedToCart;
    }

    setupEventListeners() {
        // Cart toggle button
        const cartButton = document.querySelector('.cart-button');
        cartButton.addEventListener('click', () => this.toggleCart());

        // Close cart button
        const closeButton = document.querySelector('.close-cart');
        closeButton.addEventListener('click', () => this.toggleCart());

        // Close cart when clicking overlay
        this.cartOverlay.addEventListener('click', () => this.toggleCart());

        // Add to cart buttons - Using event delegation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-button')) {
                const menuItem = e.target.closest('.menu-item');
                const title = menuItem.querySelector('.menu-item-title').textContent;
                const price = parseFloat(menuItem.querySelector('.menu-item-price').textContent.replace('€', ''));
                const description = menuItem.querySelector('.menu-item-description').textContent;
                
                this.addItem({ title, price, description });
                this.showToast();
            }
        });

        // Confirm order button
        const confirmButton = document.querySelector('.confirm-order');
        confirmButton.addEventListener('click', () => this.confirmOrder());
    }

    toggleCart() {
        this.cartSidebar.classList.toggle('open');
        this.cartOverlay.classList.toggle('open');
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.title === item.title);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...item,
                quantity: 1
            });
        }

        this.updateCartDisplay();
        this.saveCart();
    }

    updateQuantity(title, delta) {
        const item = this.items.find(i => i.title === title);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                this.items = this.items.filter(i => i.title !== title);
            }
            this.updateCartDisplay();
            this.saveCart();
        }
    }

    updateCartDisplay() {
        this.cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <p class="cart-item-description">${item.description}</p>
                    <div class="cart-item-details">
                        <p class="cart-item-price">€${(item.price * item.quantity).toFixed(2)}</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" onclick="cart.updateQuantity('${item.title}', -1)">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn plus" onclick="cart.updateQuantity('${item.title}', 1)">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.totalAmount.textContent = `€${total.toFixed(2)}`;

        // Update cart button appearance
        const cartButton = document.querySelector('.cart-button');
        if (this.items.length > 0) {
            cartButton.classList.add('has-items');
        } else {
            cartButton.classList.remove('has-items');
        }
    }

    showToast() {
        this.toast.classList.add('show');
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 2000);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    confirmOrder() {
        const t = translations.cart[this.currentLanguage];
        
        if (this.items.length === 0) {
            alert(t.emptyCart);
            return;
        }

        // Generate random 6-digit order ID
        const orderId = Math.floor(100000 + Math.random() * 900000);
        
        // Get current time
        const now = new Date();
        const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

        // Calculate total
        const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Create order details object
        const orderDetails = {
            items: this.items,
            orderId: orderId,
            time: time,
            total: total,
            language: this.currentLanguage
        };

        // Save order details to sessionStorage
        sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));

        // Clear cart
        this.items = [];
        this.updateCartDisplay();
        this.saveCart();
        
        // Redirect to confirmation page
        window.location.href = 'order-confirmation.html';
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
}); 