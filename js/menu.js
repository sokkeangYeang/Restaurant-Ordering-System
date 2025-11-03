// Menu.js - Connected to Database
// API Configuration
const API_BASE = 'http://127.0.0.1:5000/api';

// Global variables
let allProducts = [];
let currentCategory = 'all';
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load products from database
async function loadProducts() {
  try {
    showLoading(true);
    const response = await fetch(`${API_BASE}/products`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    allProducts = await response.json();
    console.log('Loaded products from database:', allProducts);

    displayProducts(allProducts);
    updateCategoryButtons();
    showLoading(false);

  } catch (error) {
    console.error('Error loading products:', error);
    showError('Failed to load menu items. Please make sure the server is running.');
    showLoading(false);
  }
}

// Display products in grid
function displayProducts(products) {
  const grid = document.getElementById('menuGrid');

  if (!products || products.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <div class="text-6xl mb-4">🍽️</div>
        <p class="text-gray-500 text-lg">No products available in this category.</p>
        <p class="text-gray-400 text-sm mt-2">Check back soon or try another category!</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(product => createProductCard(product)).join('');

  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.target.dataset.productId);
      addToCart(productId);
    });
  });
}

// Create product card HTML
function createProductCard(product) {
  const imageUrl = product.image_url || 'https://via.placeholder.com/400x300?text=No+Image';
  const name = product.name || 'Unnamed Product';
  const description = product.description || 'No description available';
  const price = parseFloat(product.price) || 0;
  const category = (product.category || 'other').toLowerCase();

  return `
    <div class="menu-item bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1" data-category="${category}">
      <div class="relative">
        <img src="${imageUrl}" alt="${name}" class="w-full h-48 object-cover" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
        <div class="absolute top-2 right-2 bg-primary-yellow text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
          ${category}
        </div>
      </div>
      <div class="p-5">
        <h3 class="text-xl font-bold text-gray-800 mb-2">${name}</h3>
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">${description}</p>
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold text-primary-yellow">$${price.toFixed(2)}</span>
          <button class="add-to-cart-btn bg-primary-yellow hover:bg-yellow-500 px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2" data-product-id="${product.id}">
            <span>🛒</span>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

// Filter products by category
function filterCategory(category) {
  currentCategory = category;

  // Update active button
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  // Filter and display products
  if (category === 'all') {
    displayProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p =>
      (p.category || '').toLowerCase() === category.toLowerCase()
    );
    displayProducts(filtered);
  }
}

// Update category buttons based on available products
function updateCategoryButtons() {
  const categories = new Set(allProducts.map(p => (p.category || 'other').toLowerCase()));

  // You can dynamically show/hide category buttons based on what's in the database
  console.log('Available categories:', Array.from(categories));
}

// Add product to cart
function addToCart(productId) {
  const product = allProducts.find(p => p.id === productId);

  if (!product) {
    showNotification('Product not found!', 'error');
    return;
  }

  // Check if product already in cart
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: 1
    });
  }

  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Show notification
  showNotification(`${product.name} added to cart!`, 'success');

  // Update cart count if there's a cart badge
  updateCartCount();
}

// Update cart count in navigation
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = totalItems;
    if (totalItems > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  console.log('Cart items:', totalItems);
}

// Show loading state
function showLoading(isLoading) {
  const loadingEl = document.getElementById('loading');
  if (loadingEl) {
    loadingEl.style.display = isLoading ? 'block' : 'none';
  }
}

// Show error message
function showError(message) {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = `
    <div class="col-span-full text-center py-12">
      <div class="text-6xl mb-4">⚠️</div>
      <p class="text-red-500 text-lg font-semibold">${message}</p>
      <button onclick="loadProducts()" class="mt-4 bg-primary-yellow hover:bg-yellow-500 px-6 py-2 rounded-lg font-semibold transition">
        Try Again
      </button>
    </div>
  `;
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-semibold z-50 transform transition-all duration-300 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  updateCartCount();

  console.log('Menu page initialized - Connected to database!');
  console.log('API Base URL:', API_BASE);
});
