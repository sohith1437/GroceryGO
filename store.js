// ============================================================
// GROCERYGO — CENTRAL SHARED DATA STORE (store.js)
// Production-Ready Single Source of Truth for Local Storage
// ============================================================

const STORAGE_KEYS = {
    PRODUCTS: "products",
    CATEGORIES: "categories",
    CART: "cart",
    ORDERS: "orders",
    RIDERS: "riders",
    COUPONS: "coupons",
    OFFERS: "offers",
    REVIEWS: "reviews",
    SUPPORT_TICKETS: "supportTickets",
    DELIVERY_LOCATION: "deliveryLocation",
    USERS: "users",
    CURRENT_USER: "currentUser"
};

// ============================================================
// DEFAULT SEED DATA
// ============================================================

const DEFAULT_CATEGORIES = [
    { id: "cat-1", name: "Fruits", icon: "🍎", description: "Fresh & juicy farm fruits", active: true },
    { id: "cat-2", name: "Vegetables", icon: "🥦", description: "Fresh farm picked vegetables", active: true },
    { id: "cat-3", name: "Dairy", icon: "🥛", description: "Fresh milk, butter, paneer & yogurt", active: true },
    { id: "cat-4", name: "Bakery", icon: "🍞", description: "Oven fresh bread, buns & croissants", active: true },
    { id: "cat-5", name: "Snacks", icon: "🍪", description: "Crisps, roasted nuts & chocolate cookies", active: true },
    { id: "cat-6", name: "Beverages", icon: "🥤", description: "Pure fruit juices, coffee & coolers", active: true },
    { id: "cat-7", name: "Groceries", icon: "🍚", description: "Basmati rice, organic dals & cooking oils", active: true },
    { id: "cat-8", name: "Household", icon: "🧼", description: "Hygiene, detergents & surface cleaners", active: true }
];

const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: "Fresh Apples",
        icon: "🍎",
        category: "Fruits",
        price: 120,
        originalPrice: 150,
        unit: "1 kg",
        description: "Crisp, sweet, handpicked fresh apples from Himachal.",
        stock: 45,
        discount: 20,
        rating: 4.8,
        featured: true,
        active: true
    },
    {
        id: 2,
        name: "Fresh Bananas",
        icon: "🍌",
        category: "Fruits",
        price: 60,
        originalPrice: 75,
        unit: "1 dozen",
        description: "Naturally ripened, energy-rich Robusta bananas.",
        stock: 60,
        discount: 20,
        rating: 4.6,
        featured: true,
        active: true
    },
    {
        id: 3,
        name: "Nagpur Oranges",
        icon: "🍊",
        category: "Fruits",
        price: 90,
        originalPrice: 110,
        unit: "1 kg",
        description: "Sweet, juicy, vitamin-C rich seasonal oranges.",
        stock: 35,
        discount: 18,
        rating: 4.7,
        featured: false,
        active: true
    },
    {
        id: 4,
        name: "Fresh Strawberries",
        icon: "🍓",
        category: "Fruits",
        price: 140,
        originalPrice: 180,
        unit: "250 g",
        description: "Farm-picked fresh strawberries, rich in aroma and flavor.",
        stock: 20,
        discount: 22,
        rating: 4.9,
        featured: true,
        active: true
    },
    {
        id: 5,
        name: "Alphonso Mangoes",
        icon: "🥭",
        category: "Fruits",
        price: 260,
        originalPrice: 320,
        unit: "1 kg",
        description: "Premium aromatic Ratnagiri Alphonso mangoes.",
        stock: 18,
        discount: 19,
        rating: 5.0,
        featured: true,
        active: true
    },
    {
        id: 6,
        name: "Fresh Broccoli",
        icon: "🥦",
        category: "Vegetables",
        price: 80,
        originalPrice: 100,
        unit: "500 g",
        description: "Nutritious, crunchy green florets rich in antioxidants.",
        stock: 28,
        discount: 20,
        rating: 4.5,
        featured: true,
        active: true
    },
    {
        id: 7,
        name: "Fresh Tomatoes",
        icon: "🍅",
        category: "Vegetables",
        price: 50,
        originalPrice: 65,
        unit: "1 kg",
        description: "Juicy farm-fresh red hybrid tomatoes for daily cooking.",
        stock: 75,
        discount: 23,
        rating: 4.6,
        featured: false,
        active: true
    },
    {
        id: 8,
        name: "Farm Potatoes",
        icon: "🥔",
        category: "Vegetables",
        price: 40,
        originalPrice: 50,
        unit: "1 kg",
        description: "Fresh medium-sized all-purpose mountain potatoes.",
        stock: 90,
        discount: 20,
        rating: 4.5,
        featured: false,
        active: true
    },
    {
        id: 9,
        name: "Green Spinach",
        icon: "🥬",
        category: "Vegetables",
        price: 30,
        originalPrice: 40,
        unit: "1 bunch",
        description: "Crisp, leafy green spinach rich in iron and vitamins.",
        stock: 40,
        discount: 25,
        rating: 4.7,
        featured: true,
        active: true
    },
    {
        id: 10,
        name: "Crunchy Carrots",
        icon: "🥕",
        category: "Vegetables",
        price: 55,
        originalPrice: 70,
        unit: "1 kg",
        description: "Tender orange carrots, ideal for salads and cooking.",
        stock: 32,
        discount: 21,
        rating: 4.6,
        featured: false,
        active: true
    },
    {
        id: 11,
        name: "Full Cream Milk",
        icon: "🥛",
        category: "Dairy",
        price: 32,
        originalPrice: 40,
        unit: "500 ml",
        description: "Fresh pasteurized wholesome toned cow's milk.",
        stock: 55,
        discount: 20,
        rating: 4.8,
        featured: true,
        active: true
    },
    {
        id: 12,
        name: "Fresh Malai Paneer",
        icon: "🧀",
        category: "Dairy",
        price: 95,
        originalPrice: 120,
        unit: "200 g",
        description: "Ultra-soft and fresh traditional cottage cheese blocks.",
        stock: 25,
        discount: 21,
        rating: 4.9,
        featured: true,
        active: true
    },
    {
        id: 13,
        name: "Greek Yogurt",
        icon: "🥣",
        category: "Dairy",
        price: 75,
        originalPrice: 90,
        unit: "400 g",
        description: "Creamy, high-protein traditional Greek yogurt.",
        stock: 20,
        discount: 17,
        rating: 4.7,
        featured: false,
        active: true
    },
    {
        id: 14,
        name: "Salted Table Butter",
        icon: "🧈",
        category: "Dairy",
        price: 58,
        originalPrice: 65,
        unit: "100 g",
        description: "Pure rich pasteurized butter for breakfast and baking.",
        stock: 45,
        discount: 11,
        rating: 4.8,
        featured: false,
        active: true
    },
    {
        id: 15,
        name: "Fresh White Bread",
        icon: "🍞",
        category: "Bakery",
        price: 40,
        originalPrice: 48,
        unit: "1 pack",
        description: "Daily baked soft sandwich bread.",
        stock: 35,
        discount: 17,
        rating: 4.6,
        featured: false,
        active: true
    },
    {
        id: 16,
        name: "Whole Wheat Bread",
        icon: "🥪",
        category: "Bakery",
        price: 50,
        originalPrice: 60,
        unit: "1 pack",
        description: "100% whole grain fiber-rich healthy brown bread.",
        stock: 24,
        discount: 17,
        rating: 4.7,
        featured: true,
        active: true
    },
    {
        id: 17,
        name: "Butter Croissant",
        icon: "🥐",
        category: "Bakery",
        price: 65,
        originalPrice: 85,
        unit: "2 pcs",
        description: "Golden flaky French pastry made with pure butter.",
        stock: 15,
        discount: 24,
        rating: 4.9,
        featured: true,
        active: true
    },
    {
        id: 18,
        name: "Chocolate Cookies",
        icon: "🍪",
        category: "Snacks",
        price: 90,
        originalPrice: 110,
        unit: "1 pack",
        description: "Crunchy cookies loaded with rich melted chocolate chips.",
        stock: 42,
        discount: 18,
        rating: 4.8,
        featured: true,
        active: true
    },
    {
        id: 19,
        name: "Crispy Potato Chips",
        icon: "🍟",
        category: "Snacks",
        price: 30,
        originalPrice: 35,
        unit: "1 pack",
        description: "Classic lightly salted crunchy potato wafers.",
        stock: 60,
        discount: 14,
        rating: 4.5,
        featured: false,
        active: true
    },
    {
        id: 20,
        name: "Roasted Almonds",
        icon: "🥜",
        category: "Snacks",
        price: 180,
        originalPrice: 220,
        unit: "200 g",
        description: "California almonds slow-roasted and lightly salted.",
        stock: 25,
        discount: 18,
        rating: 4.8,
        featured: true,
        active: true
    },
    {
        id: 21,
        name: "Fresh Orange Juice",
        icon: "🧃",
        category: "Beverages",
        price: 110,
        originalPrice: 140,
        unit: "1 litre",
        description: "No added sugar, 100% freshly squeezed orange juice.",
        stock: 30,
        discount: 21,
        rating: 4.7,
        featured: true,
        active: true
    },
    {
        id: 22,
        name: "Cold Brew Coffee",
        icon: "☕",
        category: "Beverages",
        price: 130,
        originalPrice: 160,
        unit: "300 ml",
        description: "Arabica beans steeped for 18 hours for maximum smoothness.",
        stock: 18,
        discount: 19,
        rating: 4.9,
        featured: true,
        active: true
    },
    {
        id: 23,
        name: "Sparkling Lemonade",
        icon: "🥤",
        category: "Beverages",
        price: 60,
        originalPrice: 75,
        unit: "500 ml",
        description: "Fizzy natural lemon cooler with a hint of fresh mint.",
        stock: 40,
        discount: 20,
        rating: 4.6,
        featured: false,
        active: true
    },
    {
        id: 24,
        name: "Royal Basmati Rice",
        icon: "🍚",
        category: "Groceries",
        price: 160,
        originalPrice: 195,
        unit: "1 kg",
        description: "Long grain aromatic aged basmati rice for daily meals.",
        stock: 50,
        discount: 18,
        rating: 4.8,
        featured: true,
        active: true
    },
    {
        id: 25,
        name: "Organic Toor Dal",
        icon: "🍲",
        category: "Groceries",
        price: 140,
        originalPrice: 170,
        unit: "1 kg",
        description: "Unpolished, protein-rich organic yellow lentils.",
        stock: 38,
        discount: 18,
        rating: 4.7,
        featured: false,
        active: true
    },
    {
        id: 26,
        name: "Extra Virgin Olive Oil",
        icon: "🫒",
        category: "Groceries",
        price: 450,
        originalPrice: 550,
        unit: "1 litre",
        description: "Cold-pressed extra virgin olive oil for salads & cooking.",
        stock: 14,
        discount: 18,
        rating: 4.9,
        featured: true,
        active: true
    },
    {
        id: 27,
        name: "Lemon Dishwash Gel",
        icon: "🧼",
        category: "Household",
        price: 105,
        originalPrice: 130,
        unit: "500 ml",
        description: "Powerful anti-bacterial grease cleaner with lemon zest.",
        stock: 35,
        discount: 19,
        rating: 4.5,
        featured: false,
        active: true
    },
    {
        id: 28,
        name: "Disinfectant Surface Cleaner",
        icon: "🧴",
        category: "Household",
        price: 120,
        originalPrice: 150,
        unit: "500 ml",
        description: "Kills 99.9% germs, leaves a fresh citrus fragrance.",
        stock: 28,
        discount: 20,
        rating: 4.6,
        featured: false,
        active: true
    }
];

const DEFAULT_RIDERS = [
    {
        id: "R001",
        name: "Rahul Kumar",
        email: "rahul@grocerygo.com",
        phone: "9876543210",
        dateOfBirth: "2001-05-12",
        gender: "Male",
        address: "4-12 MG Road",
        city: "Vijayawada",
        pincode: "520001",
        emergencyContactName: "Ramesh Kumar",
        emergencyContactNumber: "9876500000",
        vehicleType: "Bike",
        vehicleNumber: "AP00AB1234",
        drivingLicenseNumber: "DL123456789",
        joiningDate: "2026-01-15",
        status: "Available",
        assignedOrders: []
    },
    {
        id: "R002",
        name: "Arjun Rao",
        email: "arjun@grocerygo.com",
        phone: "9876543211",
        dateOfBirth: "1999-11-20",
        gender: "Male",
        address: "12-8 Benz Circle",
        city: "Vijayawada",
        pincode: "520010",
        emergencyContactName: "Sita Rao",
        emergencyContactNumber: "9876500001",
        vehicleType: "Scooter",
        vehicleNumber: "AP16CD5678",
        drivingLicenseNumber: "DL987654321",
        joiningDate: "2026-02-01",
        status: "Available",
        assignedOrders: []
    },
    {
        id: "R003",
        name: "Suresh Varma",
        email: "suresh@grocerygo.com",
        phone: "9876543212",
        dateOfBirth: "2002-03-08",
        gender: "Male",
        address: "7-3 Patamata",
        city: "Vijayawada",
        pincode: "520010",
        emergencyContactName: "Mohan Varma",
        emergencyContactNumber: "9876500002",
        vehicleType: "Bike",
        vehicleNumber: "AP16EF9012",
        drivingLicenseNumber: "DL456789123",
        joiningDate: "2026-03-10",
        status: "Available",
        assignedOrders: []
    }
];

const DEFAULT_COUPONS = [
    {
        code: "GROCERY100",
        description: "₹100 OFF on orders above ₹500",
        discount: 100,
        minOrder: 500,
        active: true
    },
    {
        code: "WELCOME50",
        description: "₹50 OFF on your first purchase",
        discount: 50,
        minOrder: 250,
        active: true
    }
];

const DEFAULT_OFFERS = [
    {
        id: "OFF1",
        title: "⚡ Lightning Fast Grocery Delivery",
        subtitle: "Order everyday essentials & fresh produce delivered in 15 minutes",
        code: "GROCERY100",
        badge: "Limited Time Offer"
    },
    {
        id: "OFF2",
        title: "🍎 Fresh Farm Harvest Festival",
        subtitle: "Up to 25% OFF on crisp fruits and farm fresh green vegetables",
        code: "FRESH25",
        badge: "Weekend Special"
    }
];

const DEFAULT_REVIEWS = [
    {
        id: "REV1001",
        type: "item",
        orderId: "GG20260920001",
        productId: 1,
        productName: "Fresh Apples",
        productIcon: "🍎",
        userId: "user-default-1",
        userName: "Sneha Reddy",
        rating: 5,
        issue: "Product Quality",
        comment: "Apples were remarkably crisp, fresh, and sweet! Outstanding quality.",
        date: "2026-09-21",
        hidden: false
    },
    {
        id: "REV1002",
        type: "item",
        orderId: "GG20260920002",
        productId: 11,
        productName: "Full Cream Milk",
        productIcon: "🥛",
        userId: "user-default-2",
        userName: "Karthik Verma",
        rating: 5,
        issue: "Product Quality",
        comment: "Delivered chilled and fresh. Perfect for my morning coffee.",
        date: "2026-09-22",
        hidden: false
    },
    {
        id: "REV1003",
        type: "delivery",
        orderId: "GG20260920001",
        riderName: "Rahul Kumar",
        userId: "user-default-1",
        userName: "Sneha Reddy",
        rating: 5,
        issue: "On Time",
        comment: "Delivered within 12 minutes! Rider was very polite and careful with eggs and bread.",
        date: "2026-09-21",
        hidden: false
    }
];

const DEFAULT_SUPPORT_TICKETS = [
    {
        id: "SUP10001",
        userId: "user-default-1",
        userName: "Sneha Reddy",
        orderId: "GG20260920001",
        category: "Order Issue",
        issue: "Missing Item",
        description: "Ordered 2 packs of butter but only 1 packet was inside delivery bag.",
        priority: "Important",
        status: "Resolved",
        adminResponse: "We apologize for the missing item. Our rider has delivered the remaining packet with complimentary cookies.",
        createdAt: "2026-09-21"
    }
];

// ============================================================
// INITIALIZATION
// ============================================================

function initializeStorage() {
    try {
        // Products
        const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        if (!storedProducts) {
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
        } else {
            // Safety check: if parsed array is empty, re-seed so page never shows empty
            try {
                const parsed = JSON.parse(storedProducts);
                if (!Array.isArray(parsed) || parsed.length === 0) {
                    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
                } else {
                    // Normalize fields if older data format exists
                    let modified = false;
                    const upgraded = parsed.map(p => {
                        const copy = { ...p };
                        if (copy.originalPrice === undefined) {
                            copy.originalPrice = Math.round(Number(copy.price || 50) * 1.25);
                            modified = true;
                        }
                        if (copy.discount === undefined) {
                            copy.discount = Math.max(10, Math.round(((copy.originalPrice - copy.price) / copy.originalPrice) * 100));
                            modified = true;
                        }
                        if (copy.rating === undefined) {
                            copy.rating = 4.7;
                            modified = true;
                        }
                        if (copy.featured === undefined) {
                            copy.featured = true;
                            modified = true;
                        }
                        if (copy.active === undefined) {
                            copy.active = copy.available !== false;
                            modified = true;
                        }
                        return copy;
                    });
                    if (modified) {
                        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(upgraded));
                    }
                }
            } catch (err) {
                localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
            }
        }

        // Categories
        const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
        if (!storedCategories || JSON.parse(storedCategories).length === 0) {
            localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
        }

        // Riders
        const storedRiders = localStorage.getItem(STORAGE_KEYS.RIDERS);
        if (!storedRiders || JSON.parse(storedRiders).length === 0) {
            localStorage.setItem(STORAGE_KEYS.RIDERS, JSON.stringify(DEFAULT_RIDERS));
        }

        // Coupons
        const storedCoupons = localStorage.getItem(STORAGE_KEYS.COUPONS);
        if (!storedCoupons || JSON.parse(storedCoupons).length === 0) {
            localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(DEFAULT_COUPONS));
        }

        // Offers
        const storedOffers = localStorage.getItem(STORAGE_KEYS.OFFERS);
        if (!storedOffers || JSON.parse(storedOffers).length === 0) {
            localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(DEFAULT_OFFERS));
        }

        // Reviews
        const storedReviews = localStorage.getItem(STORAGE_KEYS.REVIEWS);
        if (!storedReviews) {
            localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(DEFAULT_REVIEWS));
        }

        // Support Tickets
        const storedTickets = localStorage.getItem(STORAGE_KEYS.SUPPORT_TICKETS);
        if (!storedTickets) {
            localStorage.setItem(STORAGE_KEYS.SUPPORT_TICKETS, JSON.stringify(DEFAULT_SUPPORT_TICKETS));
        }

        // Cart
        if (!localStorage.getItem(STORAGE_KEYS.CART)) {
            localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
        }

        // Orders
        if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
        }

        // Location
        if (!localStorage.getItem(STORAGE_KEYS.DELIVERY_LOCATION)) {
            localStorage.setItem(STORAGE_KEYS.DELIVERY_LOCATION, "Vijayawada");
        }
    } catch (e) {
        console.error("Storage initialization error:", e);
    }
}

initializeStorage();

// ============================================================
// HELPER ACCESSORS (Section 26 Requirements)
// ============================================================

function getUsers() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.USERS);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getProducts() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        const list = data ? JSON.parse(data) : DEFAULT_PRODUCTS;
        return Array.isArray(list) && list.length > 0 ? list : DEFAULT_PRODUCTS;
    } catch (e) {
        return DEFAULT_PRODUCTS;
    }
}

function saveProducts(products) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

function getProductById(id) {
    const numericId = Number(id);
    return getProducts().find(p => p.id === numericId) || null;
}

function getCategories() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
        return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
    } catch (e) {
        return DEFAULT_CATEGORIES;
    }
}

function saveCategories(categories) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
}

function getCart() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.CART);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
}

function clearCart() {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
}

function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + Number(item.quantity || 0), 0);
}

function addToCart(productId, qty = 1) {
    const product = getProductById(productId);
    if (!product || product.active === false || product.available === false || product.stock <= 0) {
        return { success: false, message: "Product is currently out of stock or unavailable." };
    }

    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        if (existing.quantity + qty > product.stock) {
            return { success: false, message: `Only ${product.stock} units available in stock.` };
        }
        existing.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            originalPrice: product.originalPrice || product.price,
            discount: product.discount || 0,
            quantity: qty,
            icon: product.icon,
            unit: product.unit
        });
    }

    saveCart(cart);
    return { success: true, message: `${product.icon} ${product.name} added to cart!` };
}

function updateCartQuantity(productId, delta) {
    const numericId = Number(productId);
    let cart = getCart();
    const item = cart.find(i => i.id === numericId);
    if (!item) return;

    const product = getProductById(numericId);
    const maxStock = product ? product.stock : 999;

    item.quantity += delta;

    if (item.quantity > maxStock) {
        item.quantity = maxStock;
        alert(`Cannot add more. Only ${maxStock} items available in stock.`);
    }

    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== numericId);
    }

    saveCart(cart);
}

function removeFromCart(productId) {
    const numericId = Number(productId);
    const cart = getCart().filter(i => i.id !== numericId);
    saveCart(cart);
}

function calculateTotals(couponCode = "") {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);

    let deliveryFee = 0;
    if (subtotal > 0 && subtotal < 500) {
        deliveryFee = 30;
    } else if (subtotal >= 500) {
        deliveryFee = 0;
    }

    let discount = 0;
    let appliedCoupon = null;

    if (couponCode) {
        const coupons = getCoupons();
        const found = coupons.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.active);
        if (found) {
            if (subtotal >= found.minOrder) {
                discount = found.discount;
                appliedCoupon = found;
            }
        }
    }

    const total = Math.max(0, subtotal + deliveryFee - discount);

    return {
        subtotal,
        deliveryFee,
        discount,
        total,
        appliedCoupon
    };
}

// ============================================================
// ORDERS & LIFECYCLE (Section 18, 19, 20)
// ============================================================

function getOrders() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function saveOrders(orders) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

function generateOrderId() {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `GG${dateStr}${randomNum}`;
}

function createOrder(orderPayload) {
    const orders = getOrders();
    const orderId = orderPayload.orderId || generateOrderId();

    const newOrder = {
        orderId: orderId,
        id: orderId, // dual compatibility
        userId: orderPayload.userId,
        customerName: orderPayload.customerName,
        phone: orderPayload.phone,
        address: orderPayload.address,
        city: orderPayload.city,
        state: orderPayload.state || "Andhra Pradesh",
        pincode: orderPayload.pincode,
        paymentMethod: orderPayload.paymentMethod, // 'Cash on Delivery' or 'UPI'
        paymentStatus: orderPayload.paymentStatus, // 'Pending' for COD, 'Paid' for UPI
        transactionId: orderPayload.transactionId || null,
        items: orderPayload.items || getCart(),
        subtotal: orderPayload.subtotal,
        deliveryFee: orderPayload.deliveryFee,
        discount: orderPayload.discount || 0,
        total: orderPayload.total,
        status: "Order Placed", // Initial status
        assignedRider: null,
        riderId: null,
        riderName: null,
        riderPhone: null,
        riderVehicle: null,
        orderDate: new Date().toLocaleString()
    };

    orders.push(newOrder);
    saveOrders(orders);

    // Reduce product stock accordingly
    const products = getProducts();
    newOrder.items.forEach(cartItem => {
        const p = products.find(prod => prod.id === cartItem.id);
        if (p) {
            p.stock = Math.max(0, p.stock - cartItem.quantity);
        }
    });
    saveProducts(products);

    // Clear cart
    clearCart();

    return newOrder;
}

function updateOrderStatus(orderId, newStatus, riderInfo = null) {
    const orders = getOrders();
    const order = orders.find(o => o.orderId === orderId || o.id === orderId);
    if (!order) return false;

    order.status = newStatus;

    if (riderInfo) {
        order.riderId = riderInfo.id || order.riderId;
        order.riderName = riderInfo.name || order.riderName;
        order.assignedRider = riderInfo.name || order.assignedRider;
        order.riderPhone = riderInfo.phone || order.riderPhone;
        order.riderVehicle = (riderInfo.vehicleType ? `${riderInfo.vehicleType} - ` : "") + (riderInfo.vehicleNumber || "");
    }

    // Release assigned rider if delivered or cancelled
    if (newStatus === "Delivered" || newStatus === "Cancelled") {
        if (order.riderId) {
            const riders = getRiders();
            const rider = riders.find(r => r.id === order.riderId);
            if (rider) {
                rider.status = "Available";
                if (!rider.assignedOrders) rider.assignedOrders = [];
                const idVal = order.orderId || order.id;
                if (!rider.assignedOrders.includes(idVal)) {
                    rider.assignedOrders.push(idVal);
                }
                saveRiders(riders);
            }
        }
    }

    saveOrders(orders);
    return true;
}

function cancelOrder(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.orderId === orderId || o.id === orderId);
    if (!order) return { success: false, message: "Order not found." };

    const cancellableStatuses = ["Order Placed", "Confirmed", "Preparing", "Packed"];
    if (!cancellableStatuses.includes(order.status)) {
        return {
            success: false,
            message: `Order cannot be cancelled in '${order.status}' stage.`
        };
    }

    order.status = "Cancelled";

    // Release rider if assigned
    if (order.riderId) {
        const riders = getRiders();
        const rider = riders.find(r => r.id === order.riderId);
        if (rider) {
            rider.status = "Available";
            saveRiders(riders);
        }
    }

    // Restore stock
    const products = getProducts();
    order.items.forEach(cartItem => {
        const p = products.find(prod => prod.id === cartItem.id);
        if (p) {
            p.stock += cartItem.quantity;
        }
    });
    saveProducts(products);

    saveOrders(orders);
    return { success: true, message: "Order cancelled successfully." };
}

// ============================================================
// RIDERS (Section 21)
// ============================================================

function getRiders() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.RIDERS);
        return data ? JSON.parse(data) : DEFAULT_RIDERS;
    } catch (e) {
        return DEFAULT_RIDERS;
    }
}

function saveRiders(riders) {
    localStorage.setItem(STORAGE_KEYS.RIDERS, JSON.stringify(riders));
}

function getRiderById(id) {
    return getRiders().find(r => r.id === id) || null;
}

function assignRiderToOrder(orderId, riderId) {
    const riders = getRiders();
    const rider = riders.find(r => r.id === riderId);
    if (!rider) return { success: false, message: "Rider not found." };

    if (rider.status !== "Available") {
        return { success: false, message: `Rider is '${rider.status}'. Only Available riders can be assigned.` };
    }

    const orders = getOrders();
    const order = orders.find(o => o.orderId === orderId || o.id === orderId);
    if (!order) return { success: false, message: "Order not found." };

    order.status = "Rider Assigned";
    order.assignedRider = rider.name;
    order.riderId = rider.id;
    order.riderName = rider.name;
    order.riderPhone = rider.phone;
    order.riderVehicle = `${rider.vehicleType} - ${rider.vehicleNumber}`;
    saveOrders(orders);

    rider.status = "Busy";
    if (!rider.assignedOrders) rider.assignedOrders = [];
    const idVal = order.orderId || order.id;
    if (!rider.assignedOrders.includes(idVal)) {
        rider.assignedOrders.push(idVal);
    }
    saveRiders(riders);

    return { success: true, message: `Rider ${rider.name} assigned to Order #${idVal}.` };
}

// ============================================================
// REVIEWS (Section 28, 29, 30, 38)
// ============================================================

function getReviews() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
        return data ? JSON.parse(data) : DEFAULT_REVIEWS;
    } catch (e) {
        return DEFAULT_REVIEWS;
    }
}

function saveReviews(reviews) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
}

function addReview(reviewPayload) {
    const reviews = getReviews();
    const newRev = {
        id: "REV" + Date.now(),
        type: reviewPayload.type || "item", // 'item' or 'delivery'
        orderId: reviewPayload.orderId || "",
        productId: reviewPayload.productId || null,
        productName: reviewPayload.productName || "",
        productIcon: reviewPayload.productIcon || "🛒",
        riderName: reviewPayload.riderName || "",
        userId: reviewPayload.userId || "guest",
        userName: reviewPayload.userName || "Customer",
        rating: Number(reviewPayload.rating || 5),
        issue: reviewPayload.issue || "Product Quality",
        comment: reviewPayload.comment || "",
        date: new Date().toISOString().split("T")[0],
        hidden: false
    };

    reviews.unshift(newRev);
    saveReviews(reviews);
    return newRev;
}

// ============================================================
// SUPPORT TICKETS (Section 31, 32, 33, 34, 35, 36, 37)
// ============================================================

function getSupportTickets() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.SUPPORT_TICKETS);
        return data ? JSON.parse(data) : DEFAULT_SUPPORT_TICKETS;
    } catch (e) {
        return DEFAULT_SUPPORT_TICKETS;
    }
}

function saveSupportTickets(tickets) {
    localStorage.setItem(STORAGE_KEYS.SUPPORT_TICKETS, JSON.stringify(tickets));
}

function createSupportTicket(ticketPayload) {
    const tickets = getSupportTickets();
    const nextNum = 10000 + tickets.length + 1;
    const ticketId = "SUP" + nextNum;

    const newTicket = {
        id: ticketId,
        userId: ticketPayload.userId || "guest",
        userName: ticketPayload.userName || "Customer",
        orderId: ticketPayload.orderId || "N/A",
        category: ticketPayload.category || "General",
        issue: ticketPayload.issue || "Issue Reported",
        description: ticketPayload.description || "",
        priority: ticketPayload.priority || "Normal", // Normal, Important, Urgent
        status: "Open", // Open, In Progress, Resolved, Closed
        adminResponse: "",
        createdAt: new Date().toISOString().split("T")[0]
    };

    tickets.unshift(newTicket);
    saveSupportTickets(tickets);
    return newTicket;
}

function updateTicket(ticketId, newStatus, adminResponse = null) {
    const tickets = getSupportTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return false;

    if (newStatus) ticket.status = newStatus;
    if (adminResponse !== null) ticket.adminResponse = adminResponse;

    saveSupportTickets(tickets);
    return true;
}

// ============================================================
// CUSTOMER SERVICE ANALYTICS (Section 39)
// ============================================================

function getCustomerServiceAnalytics() {
    const reviews = getReviews().filter(r => !r.hidden);
    const tickets = getSupportTickets();

    const itemReviews = reviews.filter(r => r.type === "item");
    const deliveryReviews = reviews.filter(r => r.type === "delivery");

    const avgItemRating = itemReviews.length > 0
        ? (itemReviews.reduce((sum, r) => sum + Number(r.rating || 5), 0) / itemReviews.length).toFixed(1)
        : "5.0";

    const avgDeliveryRating = deliveryReviews.length > 0
        ? (deliveryReviews.reduce((sum, r) => sum + Number(r.rating || 5), 0) / deliveryReviews.length).toFixed(1)
        : "5.0";

    const openTickets = tickets.filter(t => t.status === "Open").length;
    const pendingTickets = tickets.filter(t => t.status === "In Progress").length;
    const resolvedTickets = tickets.filter(t => t.status === "Resolved" || t.status === "Closed").length;
    const urgentTickets = tickets.filter(t => t.priority === "Urgent" && t.status !== "Resolved" && t.status !== "Closed").length;

    // Most Reported Issue
    const issueMap = {};
    tickets.forEach(t => {
        if (t.issue) {
            issueMap[t.issue] = (issueMap[t.issue] || 0) + 1;
        }
    });
    let mostReportedIssue = "None";
    let maxIssueCount = 0;
    for (const [k, v] of Object.entries(issueMap)) {
        if (v > maxIssueCount) {
            maxIssueCount = v;
            mostReportedIssue = k;
        }
    }

    // Most Reviewed Product
    const prodReviewMap = {};
    itemReviews.forEach(r => {
        if (r.productName) {
            prodReviewMap[r.productName] = (prodReviewMap[r.productName] || 0) + 1;
        }
    });
    let mostReviewedProduct = "Fresh Milk";
    let maxRevCount = 0;
    for (const [k, v] of Object.entries(prodReviewMap)) {
        if (v > maxRevCount) {
            maxRevCount = v;
            mostReviewedProduct = k;
        }
    }

    return {
        avgItemRating,
        avgDeliveryRating,
        openTickets,
        pendingTickets,
        resolvedTickets,
        urgentTickets,
        mostReportedIssue,
        mostReviewedProduct,
        totalReviews: reviews.length,
        totalTickets: tickets.length
    };
}

// ============================================================
// COUPONS & OFFERS
// ============================================================

function getCoupons() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.COUPONS);
        return data ? JSON.parse(data) : DEFAULT_COUPONS;
    } catch (e) {
        return DEFAULT_COUPONS;
    }
}

function saveCoupons(coupons) {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
}

function getOffers() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.OFFERS);
        return data ? JSON.parse(data) : DEFAULT_OFFERS;
    } catch (e) {
        return DEFAULT_OFFERS;
    }
}

function saveOffers(offers) {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
}

// ============================================================
// LOCATION
// ============================================================

function getDeliveryLocation() {
    return localStorage.getItem(STORAGE_KEYS.DELIVERY_LOCATION) || "Vijayawada";
}

function saveDeliveryLocation(loc) {
    localStorage.setItem(STORAGE_KEYS.DELIVERY_LOCATION, loc || "Vijayawada");
}

// ============================================================
// EXPOSE GLOBAL STORE
// ============================================================

window.GroceryStore = {
    KEYS: STORAGE_KEYS,
    // Products
    getProducts,
    saveProducts,
    getProductById,
    // Categories
    getCategories,
    saveCategories,
    // Cart
    getCart,
    saveCart,
    clearCart,
    getCartCount,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    calculateTotals,
    // Orders
    getOrders,
    saveOrders,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    generateOrderId,
    // Riders
    getRiders,
    saveRiders,
    getRiderById,
    assignRiderToOrder,
    // Reviews
    getReviews,
    saveReviews,
    addReview,
    // Support Tickets
    getSupportTickets,
    saveSupportTickets,
    createSupportTicket,
    updateTicket,
    // Analytics
    getCustomerServiceAnalytics,
    // Coupons & Offers
    getCoupons,
    saveCoupons,
    getOffers,
    saveOffers,
    // Location & Users
    getDeliveryLocation,
    saveDeliveryLocation,
    getUsers,
    saveUsers
};
