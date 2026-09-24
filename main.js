// ============================================
// GROCERYGO MAIN PAGE (main.js)
// Connected with Shared Store & Auth Layer
// ============================================

// Fetch products from shared store
function getActiveProducts() {
    if (window.GroceryStore && typeof window.GroceryStore.getProducts === "function") {
        return window.GroceryStore.getProducts().filter(p => p.available !== false);
    }
    return [];
}

let activeProducts = getActiveProducts();
let currentFilterCategory = "All";

// DOM Elements
const productContainer = document.getElementById("productContainer");
const noProducts = document.getElementById("noProducts");
const searchInput = document.getElementById("searchInput");

// ================================
// DISPLAY PRODUCTS
// ================================
function displayProducts(productList) {
    if (!productContainer) return;

    productContainer.innerHTML = "";

    if (!productList || productList.length === 0) {
        if (noProducts) noProducts.style.display = "block";
        return;
    }

    if (noProducts) noProducts.style.display = "none";

    productList.forEach(function (product) {
        const card = document.createElement("div");
        card.className = "product-card";

        const isOutOfStock = product.stock <= 0;

        card.innerHTML = `
            <div class="product-image">
                ${product.icon}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category} • ${product.unit}</p>
                <div class="product-bottom">
                    <span class="product-price">₹${product.price}</span>
                    <button
                        class="add-btn"
                        ${isOutOfStock ? "disabled style='opacity:0.5;cursor:not-allowed;background:#eee;color:#888;'" : ""}
                        onclick="handleAddToCart(${product.id})">
                        ${isOutOfStock ? "Out of Stock" : "ADD"}
                    </button>
                </div>
            </div>
        `;

        productContainer.appendChild(card);
    });
}

// ================================
// ADD TO CART
// ================================
function handleAddToCart(productId) {
    if (!window.GroceryStore) return;

    const result = window.GroceryStore.addToCart(productId, 1);
    updateCartCount();

    if (result.success) {
        showToast(result.message);
    } else {
        showToast(result.message, "#d9534f");
    }
}

// For backward compatibility
window.addToCart = handleAddToCart;

// ================================
// CART COUNT
// ================================
function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    if (!cartCount) return;

    const count = window.GroceryStore ? window.GroceryStore.getCartCount() : 0;
    cartCount.textContent = count;
}

// ================================
// CATEGORY FILTER
// ================================
function filterCategory(category) {
    currentFilterCategory = category;
    activeProducts = getActiveProducts();

    const filtered = activeProducts.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
    );

    displayProducts(filtered);

    const targetSection = document.getElementById("products");
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
    }
}
window.filterCategory = filterCategory;

// ================================
// SHOW ALL PRODUCTS
// ================================
function showAllProducts() {
    currentFilterCategory = "All";
    if (searchInput) searchInput.value = "";
    activeProducts = getActiveProducts();
    displayProducts(activeProducts);
}
window.showAllProducts = showAllProducts;

// ================================
// SEARCH
// ================================
if (searchInput) {
    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase().trim();
        activeProducts = getActiveProducts();

        const filteredProducts = activeProducts.filter(product => {
            const matchesText =
                product.name.toLowerCase().includes(searchText) ||
                product.category.toLowerCase().includes(searchText);

            if (currentFilterCategory !== "All") {
                return matchesText && product.category.toLowerCase() === currentFilterCategory.toLowerCase();
            }
            return matchesText;
        });

        displayProducts(filteredProducts);
    });
}

// ================================
// TOAST NOTIFICATION
// ================================
function showToast(message, bgColor = "#17241b") {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: ${bgColor};
            color: #fff;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 8px 24px rgba(0,0,0,0.18);
            z-index: 9999;
            transition: opacity 0.3s, transform 0.3s;
        `;
        document.body.appendChild(toast);
    }

    toast.style.background = bgColor;
    toast.textContent = message;
    toast.style.display = "block";
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    clearTimeout(window.__homeToastTimer);
    window.__homeToastTimer = setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        setTimeout(() => {
            toast.style.display = "none";
        }, 300);
    }, 2000);
}

// ================================
// NAVBAR SESSION UPDATE
// ================================
function updateNavbarSession() {
    const navActions = document.getElementById("navActions");
    const user = window.GroceryAuth?.getCurrentUser();

    if (user && navActions) {
        const loginLink = document.getElementById("navLogin");
        const registerLink = document.getElementById("navRegister");

        if (loginLink) loginLink.style.display = "none";
        if (registerLink) registerLink.style.display = "none";

        // Remove any previous dynamic links
        const existingDynamic = document.querySelectorAll(".nav-session-item");
        existingDynamic.forEach(el => el.remove());

        if (user.role === "admin") {
            const adminLink = document.createElement("a");
            adminLink.href = "admin/dashboard.html";
            adminLink.className = "login-link nav-session-item";
            adminLink.innerHTML = "⚙️ Admin Panel";
            navActions.insertBefore(adminLink, navActions.firstChild);
        } else {
            const dashLink = document.createElement("a");
            dashLink.href = "user/dashboard.html";
            dashLink.className = "login-link nav-session-item";
            dashLink.innerHTML = `👤 ${user.name.split(" ")[0]}`;
            navActions.insertBefore(dashLink, navActions.firstChild);

            const ordersLink = document.createElement("a");
            ordersLink.href = "user/orders.html";
            ordersLink.className = "login-link nav-session-item";
            ordersLink.innerHTML = "📦 Orders";
            navActions.insertBefore(ordersLink, navActions.children[1]);
        }

        const logoutBtn = document.createElement("button");
        logoutBtn.type = "button";
        logoutBtn.className = "register-link nav-session-item";
        logoutBtn.style.cssText = "border:none;background:none;cursor:pointer;font-size:14px;";
        logoutBtn.textContent = "Logout";
        logoutBtn.onclick = function() {
            window.GroceryAuth.logout();
        };
        navActions.appendChild(logoutBtn);
    }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
    activeProducts = getActiveProducts();
    displayProducts(activeProducts);
    updateCartCount();
    updateNavbarSession();
});

// Also trigger immediately in case DOM is already ready
activeProducts = getActiveProducts();
displayProducts(activeProducts);
updateCartCount();
updateNavbarSession();