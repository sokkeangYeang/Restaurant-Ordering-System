# 🚀 Quick Start Guide

## ⚡ Fast Setup (5 Minutes)

### Step 1: Install MariaDB
1. Download from: https://mariadb.org/download/
2. Run installer
3. Keep default settings (port 3306)
4. Set root password or leave empty

### Step 2: Start the Application
Double-click `start.bat` or run:
```bash
python app.py
```

### Step 3: Access the System
- **Admin Panel**: http://localhost:5000/admin
- **Customer Site**: http://localhost:5000/
- **API Docs**: See README.md

## ✅ Verify Installation

Run the test script:
```bash
python test_api.py
```

You should see:
```
🎉 All tests passed!
📊 Results: 7/7 tests passed
```

## 🎯 What's Included

### ✨ Pre-loaded Sample Data
- 14 Products (Pizza, Burgers, Salads, Pasta, Desserts, Beverages, Appetizers)
- 4 Menus (Lunch, Dinner, Dessert, Beverages)
- 8 Sample Customers
- 8 Sample Orders

### 📊 Admin Panel Features
1. **Dashboard** - View statistics and recent orders
2. **Products** - Add, edit, delete menu items with images
3. **Menus** - Create custom menus from products
4. **Orders** - View and manage customer orders
5. **Customers** - View customer information

### 🛒 Customer Features
1. **Browse Menu** - View all available dishes
2. **Place Orders** - Add items to cart and checkout
3. **Contact** - Get in touch with restaurant

## 🔧 Common Issues

### "Can't connect to database"
**Solution**: Make sure MariaDB service is running
- Windows: Services → MariaDB → Start
- Or restart your computer

### "Port 5000 already in use"
**Solution**: Edit `app.py` line 839:
```python
app.run(debug=True, port=5001)  # Change to 5001
```

### "Module not found"
**Solution**: Install dependencies:
```bash
pip install -r requirements.txt
```

## 📱 Screenshots

### Admin Dashboard
- Total Products, Orders, Customers
- Revenue Statistics
- Recent Orders
- Top Selling Products

### Product Management
- Add new products with images
- Edit existing products
- Delete products
- Filter by category

### Order Management
- View all orders
- Update order status (Pending → Preparing → Completed)
- View order details and items

## 🎓 Next Steps

1. **Customize Products**: Add your own menu items
2. **Create Menus**: Organize products into menus
3. **Test Orders**: Place test orders from customer site
4. **Explore API**: Use test_api.py to understand endpoints

## 📞 Need Help?

1. Check README.md for detailed documentation
2. Run `python test_api.py` to diagnose issues
3. Check console output for error messages
4. Ensure MariaDB is running

## 🎉 You're Ready!

Your restaurant management system is now running!

**Admin Panel**: http://localhost:5000/admin
**Customer Site**: http://localhost:5000/

Happy managing! 🍽️

