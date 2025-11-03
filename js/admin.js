// js/admin.js
class AdminPanel {
    constructor() {
        this.products = [];
        this.categories = [];
        this.currentEditId = null;
        this.init();
    }

    async init() {
        await this.loadCategories();
        await this.loadProducts();
        this.setupEventListeners();
    }

    async loadCategories() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/categories');
            if (response.ok) {
                this.categories = await response.json();
                this.populateCategorySelects();
            }
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    }

    async loadProducts() {
        try {
            this.showLoading(true);
            const response = await fetch('http://127.0.0.1:5000/api/products');
            if (response.ok) {
                this.products = await response.json();
                this.renderProducts();
            }
        } catch (error) {
            console.error('Error loading products:', error);
            this.showNotification('Failed to load products', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    populateCategorySelects() {
        const categorySelect = document.getElementById('productCategory');
        const categoryFilter = document.getElementById('categoryFilter');
        
        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = this.formatCategoryName(category);
            categorySelect.appendChild(option);

            const filterOption = option.cloneNode(true);
            categoryFilter.appendChild(filterOption);
        });
    }

    formatCategoryName(category) {
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    setupEventListeners() {
        document.getElementById('productForm').addEventListener('submit', (e) => this.handleFormSubmit(e));
        document.getElementById('cancelBtn').addEventListener('click', () => this.cancelEdit());
        document.getElementById('searchInput').addEventListener('input', () => this.filterProducts());
        document.getElementById('categoryFilter').addEventListener('change', () => this.filterProducts());
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData();
        const productData = {
            title: document.getElementById('productTitle').value,
            description: document.getElementById('productDescription').value,
            price: parseFloat(document.getElementById('productPrice').value),
            category: document.getElementById('productCategory').value,
            img: document.getElementById('productImageUrl').value || ''
        };

        // Add text data to formData
        Object.keys(productData).forEach(key => {
            formData.append(key, productData[key]);
        });

        // Add image file if selected
        const imageFile = document.getElementById('productImage').files[0];
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            let response;
            if (this.currentEditId) {
                // Update existing product
                response = await fetch(`http://127.0.0.1:5000/api/products/${this.currentEditId}`, {
                    method: 'PUT',
                    body: formData
                });
            } else {
                // Add new product
                response = await fetch('http://127.0.0.1:5000/api/products', {
                    method: 'POST',
                    body: formData
                });
            }

            if (response.ok) {
                const product = await response.json();
                this.showNotification(`Product ${this.currentEditId ? 'updated' : 'added'} successfully!`, 'success');
                this.resetForm();
                await this.loadProducts(); // Reload products to get updated list
            } else {
                const error = await response.json();
                throw new Error(error.error || 'Failed to save product');
            }
        } catch (error) {
            console.error('Error saving product:', error);
            this.showNotification(error.message || 'Failed to save product', 'error');
        }
    }

    editProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        this.currentEditId = productId;
        
        document.getElementById('productId').value = product.id;
        document.getElementById('productTitle').value = product.title;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productImageUrl').value = product.img;
        
        document.getElementById('formTitle').textContent = 'Edit Product';
        document.getElementById('submitBtn').textContent = 'Update Product';
        document.getElementById('cancelBtn').classList.remove('hidden');
        
        // Scroll to form
        document.getElementById('productForm').scrollIntoView({ behavior: 'smooth' });
    }

    async deleteProduct(productId) {
        if (!confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/products/${productId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.showNotification('Product deleted successfully!', 'success');
                await this.loadProducts(); // Reload products
            } else {
                const error = await response.json();
                throw new Error(error.error || 'Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            this.showNotification(error.message || 'Failed to delete product', 'error');
        }
    }

    cancelEdit() {
        this.currentEditId = null;
        this.resetForm();
    }

    resetForm() {
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
        document.getElementById('formTitle').textContent = 'Add New Product';
        document.getElementById('submitBtn').textContent = 'Add Product';
        document.getElementById('cancelBtn').classList.add('hidden');
        this.currentEditId = null;
    }

    renderProducts(productsToRender = null) {
        const products = productsToRender || this.products;
        const tableBody = document.getElementById('productsTable');
        const noProductsMessage = document.getElementById('noProductsMessage');

        if (products.length === 0) {
            tableBody.innerHTML = '';
            noProductsMessage.classList.remove('hidden');
            return;
        }

        noProductsMessage.classList.add('hidden');
        
        tableBody.innerHTML = products.map(product => `
            <tr class="border-b border-gray-100 hover:bg-gray-50">
                <td class="px-4 py-3">
                    <img src="${product.img}" alt="${product.title}" 
                         class="w-16 h-16 object-cover rounded-lg border border-gray-200">
                </td>
                <td class="px-4 py-3">
                    <div>
                        <h3 class="font-semibold text-gray-800">${product.title}</h3>
                        <p class="text-sm text-gray-600 truncate max-w-xs">${product.description}</p>
                    </div>
                </td>
                <td class="px-4 py-3">
                    <span class="inline-block bg-primary-yellow bg-opacity-20 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        ${this.formatCategoryName(product.category)}
                    </span>
                </td>
                <td class="px-4 py-3 font-semibold text-gray-800">
                    $${parseFloat(product.price).toFixed(2)}
                </td>
                <td class="px-4 py-3">
                    <div class="flex gap-2">
                        <button onclick="admin.editProduct(${product.id})" 
                                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition">
                            Edit
                        </button>
                        <button onclick="admin.deleteProduct(${product.id})" 
                                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition">
                            Delete
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    filterProducts() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;

        let filteredProducts = this.products;

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product =>
                product.title.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
        }

        if (categoryFilter) {
            filteredProducts = filteredProducts.filter(product =>
                product.category === categoryFilter
            );
        }

        this.renderProducts(filteredProducts);
    }

    showLoading(show) {
        const loadingMessage = document.getElementById('loadingMessage');
        if (show) {
            loadingMessage.classList.remove('hidden');
        } else {
            loadingMessage.classList.add('hidden');
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-success-green' : 'bg-red-500';
        
        notification.className = `fixed top-24 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md animate-fadeIn`;
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-xl">${type === 'success' ? '✅' : '❌'}</span>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .animate-fadeIn {
        animation: slideInRight 0.3s ease;
    }
`;
document.head.appendChild(style);

// Initialize admin panel when DOM is loaded
let admin;
document.addEventListener('DOMContentLoaded', () => {
    admin = new AdminPanel();
});