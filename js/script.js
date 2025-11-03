// Function to create placeholder image URLs
function getImageUrl(name) {
    let size = (name.includes('Fries') || name.includes('Nuggets')) ? '200x150' : '300x200';
    let text = name.replace(/\s/g, '+');
    let color = name.includes('Burger') ? 'f3f7e0/000000' : 'e0f7f3/000000';
    return `https://placehold.co/${size}/${color}?text=${text}`;
}

// Product data with high-quality food images
const products = [
    { name: "Coconut Smoothie", tag: "Beverage", price: "120.00", img: "https://images.unsplash.com/photo-1587888637140-849b25d80ef9?w=400&h=300&fit=crop&q=80" },
    { name: "Coca Cola", tag: "Beverage", price: "120.00", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop&q=80" },
    { name: "Fresh Orange Juice", tag: "Beverage", price: "120.00", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&q=80" },
    { name: "Mango Smoothie", tag: "Beverage", price: "120.00", img: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400&h=300&fit=crop&q=80" },
    { name: "Strawberry Shake", tag: "Beverage", price: "120.00", img: "https://images.unsplash.com/photo-1586195831800-24f14c992cea?w=400&h=300&fit=crop&q=80" },
    { name: "Lemon Ice Tea", tag: "Beverage", price: "120.00", img: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=400&h=300&fit=crop&q=80" },
    { name: "Passion Fruit Juice", tag: "Beverage", price: "120.00", img: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400&h=300&fit=crop&q=80" },
    { name: "Pineapple Juice", tag: "Beverage", price: "120.00", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&q=80" },
    { name: "Milk Tea", tag: "Beverage", price: "120.00", img: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400&h=300&fit=crop&q=80" },
    { name: "Watermelon Juice", tag: "Beverage", price: "120.00", img: "https://images.unsplash.com/photo-1586195831800-24f14c992cea?w=400&h=300&fit=crop&q=80" },
    { name: "Green Tea", tag: "Beverage", price: "120.00", img: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=400&h=300&fit=crop&q=80" },
    { name: "Apple Juice", tag: "Beverage", price: "120.00", img: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400&h=300&fit=crop&q=80" },
    { name: "Ham Burger", tag: "Gourmet", price: "280.00", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&q=80" },
    { name: "French Fries", tag: "Classic", price: "160.00", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&q=80" },
    { name: "Delux Shawarma", tag: "Rapid", price: "338.00", img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop&q=80" },
    { name: "Chicken Nuggets", tag: "Fried", price: "268.00", img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&q=80" },
    { name: "Cheese Pizza", tag: "Italian", price: "358.00", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&q=80" },
    { name: "Burger Buzz", tag: "Wrap", price: "218.00", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop&q=80" },
    { name: "Paneer Tikka", tag: "Tawa", price: "178.00", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&q=80" },
    { name: "Tortilla Wrap", tag: "Rapid", price: "168.00", img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop&q=80" },
    { name: "Beef Burger", tag: "Tawa", price: "238.00", img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop&q=80" },
    { name: "Crispy Chicken", tag: "Fried", price: "298.00", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop&q=80" },
    { name: "Tacos", tag: "Mexican", price: "198.00", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop&q=80" },
    { name: "Caesar Salad", tag: "Healthy", price: "188.00", img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&q=80" },
    { name: "Sushi Platter", tag: "Japanese", price: "458.00", img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&q=80" },
    { name: "Pasta Carbonara", tag: "Italian", price: "328.00", img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop&q=80" },
    { name: "Grilled Salmon", tag: "Seafood", price: "498.00", img: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop&q=80" },
    { name: "Nachos Supreme", tag: "Mexican", price: "228.00", img: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop&q=80" },
    { name: "BBQ Ribs", tag: "Grill", price: "428.00", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&q=80" },
    { name: "Smoothie Bowl", tag: "Healthy", price: "148.00", img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop&q=80" },
    { name: "Steak Platter", tag: "Premium", price: "548.00", img: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop&q=80" },
    { name: "Ramen Bowl", tag: "Japanese", price: "268.00", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&q=80" },
];

// When page loads, render all product cards
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    if (grid) {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'bg-white p-4 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:scale-[1.01] flex flex-col';

            card.innerHTML = `
                <div class="flex justify-between items-center text-xs font-semibold mb-4">
                    <span class="text-gray-500">100 G</span>
                    <span class="w-5 h-5 bg-success-green text-white rounded-full flex items-center justify-center shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 6 9 17l-5-5"/>
                        </svg>
                    </span>
                </div>

                <div class="flex justify-center items-center h-32 mb-4 overflow-hidden">
                    <img src="${product.img}" alt="${product.name}" class="max-h-full max-w-full object-contain">
                </div>

                <div class="text-center mb-4 flex-grow">
                    <p class="font-semibold text-gray-800 text-lg">${product.name}</p>
                    <p class="text-xs text-gray-400">${product.tag}</p>
                </div>

                <div class="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
                    <span class="font-bold text-gray-800 text-lg">Rs. ${product.price}</span>
                    <button class="px-4 py-2 btn-primary rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition">
                        Add to Cart
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
    }
});
