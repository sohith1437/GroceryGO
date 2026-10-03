// ============================================
// GROCERYGO MAIN SCRIPT (main.js)
// Connected with Shared Store & Auth Layer
// ============================================

let currentFilterCategory = "All";

// Helper to fetch active products
function getActiveProducts() {
    if (window.GroceryStore && typeof window.GroceryStore.getProducts === "function") {
        return window.GroceryStore.getProducts().filter(p => p.active !== false && p.available !== false);
    }
    return [];
}

// Helper to generate rich product card HTML
function createProductCardHTML(product) {
    const isOutOfStock = Number(product.stock) <= 0;
    const hasDiscount = Number(product.discount) > 0;
    const originalPrice = product.originalPrice || (hasDiscount ? Math.round(product.price * (1 + product.discount / 100)) : null);
    const rating = product.rating || "4.8";

    return `
        <div class="product-card" data-product-id="${product.id}">
            ${hasDiscount ? `<span class="product-badge">-${product.discount}%</span>` : (product.featured ? `<span class="product-badge featured">⭐ Featured</span>` : "")}
            <div class="product-image">
                ${product.icon || "🍎"}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category} • ${product.unit || "unit"}</p>
                <div class="product-rating">
                    <span>⭐</span>
                    <strong>${rating}</strong>
                    <span style="color:#999;font-weight:400;font-size:11px;">(40+ reviews)</span>
                </div>
                <div class="product-bottom">
                    <div class="price-box">
                        <span class="product-price">₹${product.price}</span>
                        ${originalPrice && originalPrice > product.price ? `<span class="original-price">₹${originalPrice}</span>` : ""}
                    </div>
                    <button
                        class="add-btn"
                        ${isOutOfStock ? "disabled" : ""}
                        onclick="handleAddToCart(${product.id})">
                        ${isOutOfStock ? "Out of Stock" : "ADD"}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ================================
// RENDER DYNAMIC CATEGORIES
// ================================
function renderCategories() {
    const grid = document.getElementById("categoryGrid");
    const pillsBar = document.getElementById("categoryPillsBar");
    if (!window.GroceryStore) return;

    const categories = window.GroceryStore.getCategories();
    const allProducts = getActiveProducts();

    // 1. Category Grid Cards
    if (grid) {
        grid.innerHTML = "";
        categories.forEach(cat => {
            const count = allProducts.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length;
            const card = document.createElement("div");
            card.className = "category-card";
            card.onclick = () => filterCategory(cat.name);
            card.innerHTML = `
                <div class="category-image">${cat.icon || "🛒"}</div>
                <h3>${cat.name}</h3>
                <p>${count > 0 ? `${count} Products` : "Fresh & Handpicked"}</p>
            `;
            grid.appendChild(card);
        });
    }

    // 2. Category Filter Pills
    if (pillsBar) {
        pillsBar.innerHTML = "";
        const allPill = document.createElement("button");
        allPill.className = `filter-pill ${currentFilterCategory === "All" ? "active" : ""}`;
        allPill.textContent = "All Items";
        allPill.onclick = () => showAllProducts();
        pillsBar.appendChild(allPill);

        categories.forEach(cat => {
            const pill = document.createElement("button");
            pill.className = `filter-pill ${currentFilterCategory.toLowerCase() === cat.name.toLowerCase() ? "active" : ""}`;
            pill.textContent = `${cat.icon || ""} ${cat.name}`;
            pill.onclick = () => filterCategory(cat.name);
            pillsBar.appendChild(pill);
        });
    }
}

// ================================
// RENDER SECTIONS
// ================================
function renderAllSections() {
    const allProducts = getActiveProducts();

    // 1. Featured Products
    const featuredContainer = document.getElementById("featuredContainer");
    if (featuredContainer) {
        const featured = allProducts.filter(p => p.featured);
        const listToRender = featured.length > 0 ? featured : allProducts.slice(0, 4);
        featuredContainer.innerHTML = listToRender.map(createProductCardHTML).join("");
    }

    // 2. Deals & Discounts
    const dealsContainer = document.getElementById("dealsContainer");
    if (dealsContainer) {
        const deals = allProducts.filter(p => Number(p.discount) > 0);
        const listToRender = deals.length > 0 ? deals : allProducts.slice(0, 4);
        dealsContainer.innerHTML = listToRender.map(createProductCardHTML).join("");
    }

    // 3. Fresh Fruits & Vegetables
    const freshContainer = document.getElementById("freshContainer");
    if (freshContainer) {
        const fresh = allProducts.filter(p => p.category === "Fruits" || p.category === "Vegetables");
        freshContainer.innerHTML = fresh.slice(0, 4).map(createProductCardHTML).join("");
    }

    // 4. Daily Essentials
    const essentialsContainer = document.getElementById("essentialsContainer");
    if (essentialsContainer) {
        const essentials = allProducts.filter(p => ["Dairy", "Bakery", "Snacks", "Beverages"].includes(p.category));
        essentialsContainer.innerHTML = essentials.slice(0, 4).map(createProductCardHTML).join("");
    }

    // 5. Main Catalog Grid
    renderCatalogGrid(allProducts);
}

function renderCatalogGrid(productList) {
    const container = document.getElementById("productContainer");
    const noProducts = document.getElementById("noProducts");
    if (!container) return;

    container.innerHTML = "";

    if (!productList || productList.length === 0) {
        if (noProducts) noProducts.style.display = "block";
        return;
    }

    if (noProducts) noProducts.style.display = "none";
    container.innerHTML = productList.map(createProductCardHTML).join("");
}

// ================================
// FILTER & SEARCH LOGIC
// ================================
function filterCategory(categoryName) {
    currentFilterCategory = categoryName;
    const allProducts = getActiveProducts();

    const filtered = allProducts.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
    renderCatalogGrid(filtered);

    // Update pill states
    const pills = document.querySelectorAll(".filter-pill");
    pills.forEach(pill => {
        if (pill.textContent.toLowerCase().includes(categoryName.toLowerCase())) {
            pill.classList.add("active");
        } else {
            pill.classList.remove("active");
        }
    });

    const targetSection = document.getElementById("products");
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
    }
}
window.filterCategory = filterCategory;

function showAllProducts() {
    currentFilterCategory = "All";
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = "";

    const allProducts = getActiveProducts();
    renderCatalogGrid(allProducts);

    const pills = document.querySelectorAll(".filter-pill");
    pills.forEach((p, idx) => {
        if (idx === 0) p.classList.add("active");
        else p.classList.remove("active");
    });
}
window.showAllProducts = showAllProducts;

// Search Input Listener
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase().trim();
        const allProducts = getActiveProducts();

        const filtered = allProducts.filter(product => {
            const matchesText =
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                (product.description && product.description.toLowerCase().includes(query));

            if (currentFilterCategory !== "All") {
                return matchesText && product.category.toLowerCase() === currentFilterCategory.toLowerCase();
            }
            return matchesText;
        });

        renderCatalogGrid(filtered);
    });
}

// ================================
// CART OPERATIONS
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
window.handleAddToCart = handleAddToCart;
window.addToCart = handleAddToCart;

function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    if (!cartCount) return;

    const count = window.GroceryStore ? window.GroceryStore.getCartCount() : 0;
    cartCount.textContent = count;
}

// ================================
// TOAST NOTIFICATIONS
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
            padding: 12px 22px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
            z-index: 99999;
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
    }, 2200);
}

// ================================
// DELIVERY LOCATION PICKER
// ================================
function initLocationPicker() {
    const locationBtn = document.getElementById("navLocationBtn");
    const locationText = document.getElementById("navLocationText");

    const savedLoc = window.GroceryStore ? window.GroceryStore.getDeliveryLocation() : "Vijayawada - 520001";
    if (locationText) {
        locationText.textContent = savedLoc.split(" - ")[0] || savedLoc;
    }

    if (locationBtn) {
        locationBtn.onclick = function() {
            const current = window.GroceryStore.getDeliveryLocation();
            const newLoc = prompt("Enter your Delivery City or Pincode:", current);
            if (newLoc && newLoc.trim()) {
                window.GroceryStore.setDeliveryLocation(newLoc.trim());
                if (locationText) {
                    locationText.textContent = newLoc.trim().split(" - ")[0] || newLoc.trim();
                }
                showToast(`📍 Delivery location updated to ${newLoc.trim()}`);
            }
        };
    }
}

// ================================
// NAVBAR SESSION SYNC
// ================================
function updateNavbarSession() {
    const navActions = document.getElementById("navActions");
    const user = window.GroceryAuth?.getCurrentUser();

    if (user && navActions) {
        const loginLink = document.getElementById("navLogin");
        const registerLink = document.getElementById("navRegister");

        if (loginLink) loginLink.style.display = "none";
        if (registerLink) registerLink.style.display = "none";

        const existingDynamic = document.querySelectorAll(".nav-session-item");
        existingDynamic.forEach(el => el.remove());

        if (user.role === "admin") {
            const adminLink = document.createElement("a");
            adminLink.href = "admin/dashboard.html";
            adminLink.className = "login-link nav-session-item";
            adminLink.innerHTML = "⚙️ Admin Console";
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

            const supportLink = document.createElement("a");
            supportLink.href = "user/support.html";
            supportLink.className = "login-link nav-session-item";
            supportLink.innerHTML = "🎧 Help";
            navActions.insertBefore(supportLink, navActions.children[2]);
        }

        const logoutBtn = document.createElement("button");
        logoutBtn.type = "button";
        logoutBtn.className = "register-link nav-session-item";
        logoutBtn.style.cssText = "border:none;background:none;cursor:pointer;font-size:14px;color:#e02424;";
        logoutBtn.textContent = "Logout";
        logoutBtn.onclick = function() {
            window.GroceryAuth.logout();
        };
        navActions.appendChild(logoutBtn);
    }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", function () {
    renderCategories();
    renderAllSections();
    updateCartCount();
    updateNavbarSession();
    initLocationPicker();
});

// Immediately trigger in case script loads after DOM
renderCategories();
renderAllSections();
updateCartCount();
updateNavbarSession();
initLocationPicker();