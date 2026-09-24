// ============================================================
// GROCERYGO — CENTRAL SHARED DATA STORE (store.js)
// Single Source of Truth for Local Storage
// ============================================================

const STORAGE_KEYS = {
    PRODUCTS: "products",
    CATEGORIES: "categories",
    CART: "cart",
    ORDERS: "orders",
    RIDERS: "riders",
    COUPONS: "coupons"
};

// ============================================================
// DEFAULT SEED DATA
// ============================================================

const DEFAULT_CATEGORIES = [
    { id: "cat-1", name: "Fruits", icon: "🍎", description: "Fresh & juicy fruits", active: true },
    { id: "cat-2", name: "Vegetables", icon: "🥦", description: "Farm fresh vegetables", active: true },
    { id: "cat-3", name: "Dairy", icon: "🥛", description: "Milk, butter, paneer & more", active: true },
    { id: "cat-4", name: "Bakery", icon: "🍞", description: "Freshly baked bread & snacks", active: true },
    { id: "cat-5", name: "Snacks", icon: "🍪", description: "Crisps, cookies & treats", active: true },
    { id: "cat-6", name: "Beverages", icon: "🥤", description: "Cold juices, teas & drinks", active: true },
    { id: "cat-7", name: "Groceries", icon: "🍚", description: "Rice, dal, oil & staples", active: true },
    { id: "cat-8", name: "Household", icon: "🧼", description: "Cleaning & hygiene essentials", active: true }
];

const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: "Fresh Apples",
        category: "Fruits",
        price: 120,
        unit: "1 kg",
        stock: 50,
        icon: "🍎",
        description: "Crisp, sweet, handpicked fresh apples from Himachal.",
        available: true
    },
    {
        id: 2,
        name: "Fresh Bananas",
        category: "Fruits",
        price: 60,
        unit: "1 dozen",
        stock: 65,
        icon: "🍌",
        description: "Naturally ripened, energy-rich Robusta bananas.",
        available: true
    },
    {
        id: 3,
        name: "Nagpur Oranges",
        category: "Fruits",
        price: 90,
        unit: "1 kg",
        stock: 35,
        icon: "🍊",
        description: "Sweet, juicy, vitamin-C rich seasonal oranges.",
        available: true
    },
    {
        id: 4,
        name: "Fresh Strawberries",
        category: "Fruits",
        price: 140,
        unit: "250 g",
        stock: 22,
        icon: "🍓",
        description: "Farm-picked fresh strawberries, rich in aroma and flavor.",
        available: true
    },
    {
        id: 5,
        name: "Alphonso Mangoes",
        category: "Fruits",
        price: 260,
        unit: "1 kg",
        stock: 18,
        icon: "🥭",
        description: "Premium aromatic Ratnagiri Alphonso mangoes.",
        available: true
    },
    {
        id: 6,
        name: "Fresh Broccoli",
        category: "Vegetables",
        price: 80,
        unit: "500 g",
        stock: 28,
        icon: "🥦",
        description: "Nutritious, crunchy green florets rich in antioxidants.",
        available: true
    },
    {
        id: 7,
        name: "Fresh Tomatoes",
        category: "Vegetables",
        price: 50,
        unit: "1 kg",
        stock: 75,
        icon: "🍅",
        description: "Juicy farm-fresh red hybrid tomatoes for daily cooking.",
        available: true
    },
    {
        id: 8,
        name: "Farm Potatoes",
        category: "Vegetables",
        price: 40,
        unit: "1 kg",
        stock: 90,
        icon: "🥔",
        description: "Fresh medium-sized all-purpose potatoes.",
        available: true
    },
    {
        id: 9,
        name: "Green Spinach",
        category: "Vegetables",
        price: 30,
        unit: "1 bunch",
        stock: 40,
        icon: "🥬",
        description: "Crisp, leafy green spinach rich in iron and vitamins.",
        available: true
    },
    {
        id: 10,
        name: "Crunchy Carrots",
        category: "Vegetables",
        price: 55,
        unit: "1 kg",
        stock: 32,
        icon: "🥕",
        description: "Tender orange carrots, ideal for salads and cooking.",
        available: true
    },
    {
        id: 11,
        name: "Full Cream Milk",
        category: "Dairy",
        price: 60,
        unit: "1 litre",
        stock: 55,
        icon: "🥛",
        description: "Pasteurized, wholesome full cream cow's milk.",
        available: true
    },
    {
        id: 12,
        name: "Fresh Malai Paneer",
        category: "Dairy",
        price: 95,
        unit: "200 g",
        stock: 25,
        icon: "🧀",
        description: "Ultra-soft and fresh cottage cheese blocks.",
        available: true
    },
    {
        id: 13,
        name: "Greek Yogurt",
        category: "Dairy",
        price: 75,
        unit: "400 g",
        stock: 20,
        icon: "🥣",
        description: "Creamy, high-protein traditional Greek yogurt.",
        available: true
    },
    {
        id: 14,
        name: "Salted Table Butter",
        category: "Dairy",
        price: 58,
        unit: "100 g",
        stock: 45,
        icon: "🧈",
        description: "Pure rich pasteurized butter for breakfast and baking.",
        available: true
    },
    {
        id: 15,
        name: "Fresh White Bread",
        category: "Bakery",
        price: 40,
        unit: "1 pack",
        stock: 35,
        icon: "🍞",
        description: "Daily baked soft sandwich bread.",
        available: true
    },
    {
        id: 16,
        name: "Whole Wheat Bread",
        category: "Bakery",
        price: 50,
        unit: "1 pack",
        stock: 24,
        icon: "🥪",
        description: "100% whole grain fiber-rich healthy brown bread.",
        available: true
    },
    {
        id: 17,
        name: "Butter Croissant",
        category: "Bakery",
        price: 65,
        unit: "2 pcs",
        stock: 15,
        icon: "🥐",
        description: "Golden flaky French pastry made with pure butter.",
        available: true
    },
    {
        id: 18,
        name: "Chocolate Cookies",
        category: "Snacks",
        price: 90,
        unit: "1 pack",
        stock: 42,
        icon: "🍪",
        description: "Crunchy cookies loaded with rich melted chocolate chips.",
        available: true
    },
    {
        id: 19,
        name: "Crispy Potato Chips",
        category: "Snacks",
        price: 30,
        unit: "1 pack",
        stock: 60,
        icon: "🍟",
        description: "Classic lightly salted crunchy potato wafers.",
        available: true
    },
    {
        id: 20,
        name: "Roasted Almonds",
        category: "Snacks",
        price: 180,
        unit: "200 g",
        stock: 25,
        icon: "🥜",
        description: "California almonds slow-roasted and lightly salted.",
        available: true
    },
    {
        id: 21,
        name: "Fresh Orange Juice",
        category: "Beverages",
        price: 110,
        unit: "1 litre",
        stock: 30,
        icon: "🧃",
        description: "No added sugar, 100% freshly squeezed orange juice.",
        available: true
    },
    {
        id: 22,
        name: "Cold Brew Coffee",
        category: "Beverages",
        price: 130,
        unit: "300 ml",
        stock: 18,
        icon: "☕",
        description: "Arabica beans steeped for 18 hours for maximum smoothness.",
        available: true
    },
    {
        id: 23,
        name: "Sparkling Lemonade",
        category: "Beverages",
        price: 60,
        unit: "500 ml",
        stock: 40,
        icon: "🥤",
        description: "Fizzy natural lemon cooler with a hint of mint.",
        available: true
    },
    {
        id: 24,
        name: "Royal Basmati Rice",
        category: "Groceries",
        price: 160,
        unit: "1 kg",
        stock: 50,
        icon: "🍚",
        description: "Long grain aromatic aged basmati rice for daily meals.",
        available: true
    },
    {
        id: 25,
        name: "Organic Toor Dal",
        category: "Groceries",
        price: 140,
        unit: "1 kg",
        stock: 38,
        icon: "🍲",
        description: "Unpolished, protein-rich organic yellow lentils.",
        available: true
    },
    {
        id: 26,
        name: "Extra Virgin Olive Oil",
        category: "Groceries",
        price: 450,
        unit: "1 litre",
        stock: 14,
        icon: "🫒",
        description: "Cold-pressed extra virgin olive oil for salads & sauteing.",
        available: true
    },
    {
        id: 27,
        name: "Lemon Dishwash Gel",
        category: "Household",
        price: 105,
        unit: "500 ml",
        stock: 35,
        icon: "🧼",
        description: "Powerful anti-bacterial grease cleaner with lemon zest.",
        available: true
    },
    {
        id: 28,
        name: "Disinfectant Surface Cleaner",
        category: "Household",
        price: 120,
        unit: "500 ml",
        stock: 28,
        icon: "🧴",
        description: "Kills 99.9% germs, leaves a fresh citrus fragrance.",
        available: true
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
        profilePhoto: "",
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
        profilePhoto: "",
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
        profilePhoto: "",
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

// ============================================================
// INITIALIZATION
// ============================================================

function initializeStorage() {
    try {
        // Products
        const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        if (!storedProducts || JSON.parse(storedProducts).length === 0) {
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
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

        // Cart
        if (!localStorage.getItem(STORAGE_KEYS.CART)) {
            localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
        }

        // Orders
        if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
        }
    } catch (e) {
        console.error("Storage initialization error:", e);
    }
}

initializeStorage();

// ============================================================
// PRODUCT ACCESSORS
// ============================================================

function getProducts() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
    } catch (e) {
        console.error("Could not load products:", e);
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

// ============================================================
// CATEGORY ACCESSORS
// ============================================================

function getCategories() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
        return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
    } catch (e) {
        console.error("Could not load categories:", e);
        return DEFAULT_CATEGORIES;
    }
}

function saveCategories(categories) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
}

// ============================================================
// CART ACCESSORS
// ============================================================

function getCart() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.CART);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Could not load cart:", e);
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
    if (!product || !product.available || product.stock <= 0) {
        return { success: false, message: "Product is out of stock or unavailable." };
    }

    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        if (existing.quantity + qty > product.stock) {
            return { success: false, message: `Only ${product.stock} items in stock.` };
        }
        existing.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            quantity: qty,
            icon: product.icon,
            unit: product.unit
        });
    }

    saveCart(cart);
    return { success: true, message: `${product.name} added to cart!` };
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
// ORDER ACCESSORS & WORKFLOW
// ============================================================

function getOrders() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Could not load orders:", e);
        return [];
    }
}

function saveOrders(orders) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

function createOrder(orderPayload) {
    const orders = getOrders();
    const newOrder = {
        id: "GG" + Date.now(),
        userId: orderPayload.userId,
        customerName: orderPayload.customerName,
        phone: orderPayload.phone,
        address: orderPayload.address,
        city: orderPayload.city,
        pincode: orderPayload.pincode,
        paymentMethod: orderPayload.paymentMethod,
        items: orderPayload.items || getCart(),
        subtotal: orderPayload.subtotal,
        deliveryFee: orderPayload.deliveryFee,
        discount: orderPayload.discount || 0,
        couponCode: orderPayload.couponCode || null,
        total: orderPayload.total,
        status: "Order Placed",
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
    const order = orders.find(o => o.id === orderId);
    if (!order) return false;

    order.status = newStatus;

    if (riderInfo) {
        order.riderId = riderInfo.id || order.riderId;
        order.riderName = riderInfo.name || order.riderName;
        order.riderPhone = riderInfo.phone || order.riderPhone;
        order.riderVehicle = (riderInfo.vehicleType ? `${riderInfo.vehicleType} - ` : "") + (riderInfo.vehicleNumber || "");
    }

    // If order was delivered or cancelled, release assigned rider
    if (newStatus === "Delivered" || newStatus === "Cancelled") {
        if (order.riderId) {
            const riders = getRiders();
            const rider = riders.find(r => r.id === order.riderId);
            if (rider) {
                rider.status = "Available";
                if (!rider.assignedOrders) rider.assignedOrders = [];
                if (!rider.assignedOrders.includes(order.id)) {
                    rider.assignedOrders.push(order.id);
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
    const order = orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: "Order not found." };

    // Eligibility check per specification (Section 16)
    const cancellableStatuses = ["Order Placed", "Confirmed", "Packed"];
    if (!cancellableStatuses.includes(order.status)) {
        return {
            success: false,
            message: `Order cannot be cancelled in '${order.status}' stage.`
        };
    }

    order.status = "Cancelled";

    // Release rider if any
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
// RIDER ACCESSORS
// ============================================================

function getRiders() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.RIDERS);
        return data ? JSON.parse(data) : DEFAULT_RIDERS;
    } catch (e) {
        console.error("Could not load riders:", e);
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
        return { success: false, message: `Rider is currently '${rider.status}'. Only Available riders can be assigned.` };
    }

    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: "Order not found." };

    // Update order
    order.status = "Rider Assigned";
    order.riderId = rider.id;
    order.riderName = rider.name;
    order.riderPhone = rider.phone;
    order.riderVehicle = `${rider.vehicleType} - ${rider.vehicleNumber}`;
    saveOrders(orders);

    // Update rider
    rider.status = "Busy";
    if (!rider.assignedOrders) rider.assignedOrders = [];
    if (!rider.assignedOrders.includes(order.id)) {
        rider.assignedOrders.push(order.id);
    }
    saveRiders(riders);

    return { success: true, message: `Rider ${rider.name} assigned to order ${order.id}.` };
}

// ============================================================
// COUPON ACCESSORS
// ============================================================

function getCoupons() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.COUPONS);
        return data ? JSON.parse(data) : DEFAULT_COUPONS;
    } catch (e) {
        console.error("Could not load coupons:", e);
        return DEFAULT_COUPONS;
    }
}

function saveCoupons(coupons) {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
}

// ============================================================
// EXPOSE GLOBAL STORE OBJECT
// ============================================================

window.GroceryStore = {
    KEYS: STORAGE_KEYS,
    getProducts,
    saveProducts,
    getProductById,
    getCategories,
    saveCategories,
    getCart,
    saveCart,
    clearCart,
    getCartCount,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    calculateTotals,
    getOrders,
    saveOrders,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    getRiders,
    saveRiders,
    getRiderById,
    assignRiderToOrder,
    getCoupons,
    saveCoupons
};
