// Menu items data matching menu.html
const menuItems = [
    // Burgers
    { id: 1, name: 'Classic Burger', price: 8.99, category: 'burgers', description: 'Juicy beef patty with fresh lettuce, tomato, and special sauce', image: './berger.png' },
    { id: 2, name: 'Cheese Burger', price: 10.99, category: 'burgers', description: 'Double cheese, caramelized onions, pickles, and house sauce', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop' },
    { id: 3, name: 'Veggie Burger', price: 9.49, category: 'burgers', description: 'Plant-based patty with avocado, sprouts, and tahini sauce', image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&h=400&fit=crop' },
    { id: 4, name: 'Bacon Deluxe', price: 12.99, category: 'burgers', description: 'Crispy bacon, fried egg, cheddar cheese, and BBQ sauce', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=400&fit=crop' },
    
    // Pizza
    { id: 5, name: 'Margherita Pizza', price: 11.99, category: 'pizza', description: 'Fresh mozzarella, tomato sauce, basil, and olive oil', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop' },
    { id: 6, name: 'Pepperoni Pizza', price: 13.49, category: 'pizza', description: 'Classic pepperoni, mozzarella cheese, and tomato sauce', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=400&fit=crop' },
    { id: 7, name: 'Veggie Supreme', price: 12.99, category: 'pizza', description: 'Bell peppers, mushrooms, olives, onions, and tomatoes', image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&h=400&fit=crop' },
    { id: 8, name: 'BBQ Chicken Pizza', price: 14.99, category: 'pizza', description: 'Grilled chicken, BBQ sauce, red onions, and cilantro', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop' },
    
    // Drinks
    { id: 9, name: 'Coca Cola', price: 2.99, category: 'drinks', description: 'Refreshing classic Coca Cola - Regular or Zero', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&h=400&fit=crop' },
    { id: 10, name: 'Fresh Orange Juice', price: 4.49, category: 'drinks', description: 'Freshly squeezed orange juice, no added sugar', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=400&fit=crop' },
    { id: 11, name: 'Iced Coffee', price: 4.99, category: 'drinks', description: 'Cold brew coffee with milk and vanilla syrup', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=400&fit=crop' },
    { id: 12, name: 'Berry Smoothie', price: 5.99, category: 'drinks', description: 'Fresh blended strawberries, blueberries, and banana with yogurt', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500&h=400&fit=crop' },
    
    // Desserts
    { id: 13, name: 'Chocolate Cake', price: 6.99, category: 'desserts', description: 'Rich chocolate cake with chocolate ganache frosting', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop' },
    { id: 14, name: 'Ice Cream Sundae', price: 5.49, category: 'desserts', description: 'Vanilla ice cream with chocolate sauce and sprinkles', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=400&fit=crop' },
    { id: 15, name: 'Apple Pie', price: 6.49, category: 'desserts', description: 'Homemade apple pie with cinnamon and vanilla ice cream', image: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=500&h=400&fit=crop' },
    { id: 16, name: 'Cookie Platter', price: 7.99, category: 'desserts', description: 'Assorted freshly baked cookies - chocolate chip & oatmeal', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=400&fit=crop' },
    
    // Pasta
    { id: 17, name: 'Spaghetti Carbonara', price: 13.99, category: 'pasta', description: 'Creamy pasta with bacon, eggs, parmesan cheese, and black pepper', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc9c172f0?w=500&h=400&fit=crop' },
    { id: 18, name: 'Fettuccine Alfredo', price: 12.49, category: 'pasta', description: 'Rich and creamy alfredo sauce with fettuccine and parmesan', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&h=400&fit=crop' },
    
    // Sandwiches
    { id: 19, name: 'Club Sandwich', price: 9.99, category: 'sandwiches', description: 'Triple decker with turkey, bacon, lettuce, tomato, and mayo', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=400&fit=crop' },
    { id: 20, name: 'Grilled Chicken Sandwich', price: 10.49, category: 'sandwiches', description: 'Grilled chicken breast with avocado, swiss cheese, and honey mustard', image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&h=400&fit=crop' },
    
    // Salads
    { id: 21, name: 'Caesar Salad', price: 8.49, category: 'salads', description: 'Romaine lettuce, croutons, parmesan, and classic caesar dressing', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=400&fit=crop' },
    { id: 22, name: 'Greek Salad', price: 9.49, category: 'salads', description: 'Fresh vegetables, feta cheese, olives, and olive oil dressing', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop' },
    
    // Appetizers
    { id: 23, name: 'Mozzarella Sticks', price: 7.99, category: 'appetizers', description: 'Golden fried mozzarella served with marinara sauce', image: 'https://images.unsplash.com/photo-1541592106381-391d935676f0?w=500&h=400&fit=crop' },
    { id: 24, name: 'French Fries', price: 4.99, category: 'appetizers', description: 'Crispy golden fries seasoned to perfection with sea salt', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=500&h=400&fit=crop' },
    { id: 25, name: 'Onion Rings', price: 6.49, category: 'appetizers', description: 'Crispy beer-battered onion rings with ranch dipping sauce', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&h=400&fit=crop' },
    
    // Mexican
    { id: 26, name: 'Beef Tacos', price: 10.99, category: 'mexican', description: 'Three soft shell tacos with seasoned beef, lettuce, cheese, and salsa', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=400&fit=crop' },
    { id: 27, name: 'Chicken Quesadilla', price: 11.49, category: 'mexican', description: 'Grilled chicken, melted cheese, peppers, and onions in a crispy tortilla', image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=500&h=400&fit=crop' },
    
    // Main Dishes
    { id: 28, name: 'Grilled Steak', price: 22.99, category: 'mains', description: '8oz ribeye steak with mashed potatoes and seasonal vegetables', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&h=400&fit=crop' },
    
    // Additional items to reach 30
    { id: 29, name: 'Veggie Pizza', price: 12.49, category: 'pizza', description: 'Fresh vegetables and cheese on thin crust', image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&h=400&fit=crop' },
    { id: 30, name: 'Chocolate Milkshake', price: 5.99, category: 'drinks', description: 'Creamy chocolate milkshake with whipped cream', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500&h=400&fit=crop' },
    
    // Ban items
    { id: 31, name: 'Banana Split', price: 7.99, category: 'ban', description: 'Vanilla ice cream with banana, chocolate sauce, and nuts', image: 'https://images.unsplash.com/photo-1558199141-391d935676f0?w=500&h=400&fit=crop' },
    { id: 32, name: 'Banana Bread', price: 5.49, category: 'ban', description: 'Homemade banana bread with walnuts', image: 'https://images.unsplash.com/photo-1589164668418-7e44b8b5bb8e?w=500&h=400&fit=crop' },
    { id: 33, name: 'Banana Pancakes', price: 8.99, category: 'ban', description: 'Fluffy pancakes with banana slices and maple syrup', image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=500&h=400&fit=crop' },
];

// Cart items array
let cartItems = [];

// DOM elements
const menuItemsContainer = document.getElementById('menuItems');
const cartItemsContainer = document.getElementById('cartItems');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeModalBtn = document.getElementById('closeModal');
const checkoutForm = document.getElementById('checkoutForm');
const orderSummary = document.getElementById('orderSummary');
const categoryBtns = document.querySelectorAll('.category-btn');

// Display menu items
function displayMenuItems(category = 'all') {
    console.log('Displaying items for category:', category);
    menuItemsContainer.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => {
            console.log('Checking item:', item.id, item.category);
            return item.category === category;
        });
    
    console.log('Filtered items count:', filteredItems.length);
    
    filteredItems.forEach(item => {
        console.log('Displaying item:', item.id, item.name);
        const itemElement = document.createElement('div');
        itemElement.className = 'bg-gray-50 rounded-lg p-4 hover:shadow-md transition';
        itemElement.innerHTML = `
            <div class="flex items-start gap-4">
                <img src="${item.image}" alt="${item.name}" class="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 shadow-md">
                <div class="flex-1">
                    <h3 class="font-bold text-gray-800 text-lg">${item.name}</h3>
                    <p class="text-sm text-gray-600 mb-2">${item.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-gray-800">Rs. ${item.price.toFixed(2)}</span>
                        <button class="add-to-cart bg-primary-yellow hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold transition" 
                                data-id="${item.id}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        menuItemsContainer.appendChild(itemElement);
    });
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            addToCart(itemId);
        });
    });
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const existingItem = cartItems.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCart();
    
    // Show cart notification
    const cartBtn = document.querySelector('a[href="./Order.html"] span:nth-child(3)');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartBtn.textContent = totalItems;
    
    // Show success animation
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-20 right-4 bg-success-green text-white px-4 py-2 rounded-lg shadow-lg animate-bounce';
    successMsg.textContent = 'Added to cart!';
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        successMsg.remove();
    }, 2000);
}

// Update cart display
function updateCart() {
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-400 text-center py-8">Your cart is empty</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItemsContainer.innerHTML = '';
        checkoutBtn.disabled = false;
        
        cartItems.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'flex justify-between items-center p-3 bg-gray-50 rounded-lg';
            cartItemElement.innerHTML = `
                <div class="flex items-center gap-3">
                    <img src="${item.image}" alt="${item.name}" class="w-10 h-10 object-cover rounded-lg border border-gray-200">
                    <div>
                        <h4 class="font-semibold text-gray-800">${item.name}</h4>
                        <p class="text-sm text-gray-600">Rs. ${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button class="decrease-quantity text-gray-500 hover:text-gray-700 text-xl" data-id="${item.id}">−</button>
                    <span class="quantity w-6 text-center">${item.quantity}</span>
                    <button class="increase-quantity text-gray-500 hover:text-gray-700 text-xl" data-id="${item.id}">+</button>
                    <button class="remove-item text-red-500 hover:text-red-700 ml-2" data-id="${item.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.increase-quantity').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.dataset.id);
                const item = cartItems.find(item => item.id === itemId);
                item.quantity += 1;
                updateCart();
            });
        });
        
        document.querySelectorAll('.decrease-quantity').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.dataset.id);
                const item = cartItems.find(item => item.id === itemId);
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cartItems = cartItems.filter(item => item.id !== itemId);
                }
                updateCart();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.dataset.id);
                cartItems = cartItems.filter(item => item.id !== itemId);
                updateCart();
            });
        });
    }
    
    // Update totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const delivery = 50.00;
    const total = subtotal + tax + delivery;
    
    subtotalElement.textContent = `Rs. ${subtotal.toFixed(2)}`;
    taxElement.textContent = `Rs. ${tax.toFixed(2)}`;
    totalElement.textContent = `Rs. ${total.toFixed(2)}`;
}

// Category filter
const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'burgers', name: 'Burgers' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'pasta', name: 'Pasta' },
    { id: 'sandwiches', name: 'Sandwiches' },
    { id: 'salads', name: 'Salads' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'mexican', name: 'Mexican' },
    { id: 'mains', name: 'Main Dishes' },
    { id: 'ban', name: 'Banana Items' },
];

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Category button clicked:', btn.dataset.category);
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        displayMenuItems(category);
    });
});

// Checkout modal
checkoutBtn.addEventListener('click', () => {
    // Update order summary
    orderSummary.innerHTML = '';
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between';
        itemElement.innerHTML = `
            <span>${item.name} × ${item.quantity}</span>
            <span>Rs. ${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderSummary.appendChild(itemElement);
    });
    
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const delivery = 50.00;
    const total = subtotal + tax + delivery;
    
    const summaryElement = document.createElement('div');
    summaryElement.className = 'flex justify-between font-bold mt-2 pt-2 border-t';
    summaryElement.innerHTML = `
        <span>Total</span>
        <span>Rs. ${total.toFixed(2)}</span>
    `;
    orderSummary.appendChild(summaryElement);
    
    checkoutModal.classList.remove('hidden');
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    checkoutModal.classList.add('hidden');
});

// Form submission
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // In a real app, you would send this data to a server
    alert('Order placed successfully! Thank you for your order.');
    
    // Reset cart
    cartItems = [];
    updateCart();
    checkoutModal.classList.add('hidden');
    
    // Update cart count
    const cartBtn = document.querySelector('a[href="./Order.html"] span:nth-child(3)');
    cartBtn.textContent = '0';
});

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    displayMenuItems();
    updateCart();
});
