# 📖 Restaurant Management System - User Guide

## 🎯 Admin Panel Guide

### Accessing the Admin Panel
1. Open your browser
2. Navigate to: `http://localhost:5000/admin`
3. You'll see the dashboard with statistics

---

## 📊 Dashboard

The dashboard shows:
- **Total Products** - Number of menu items
- **Total Orders** - All orders placed
- **Total Customers** - Registered customers
- **Total Revenue** - Money earned from completed orders
- **Pending Orders** - Orders waiting to be processed
- **Recent Orders** - Last 5 orders
- **Top Products** - Best-selling items

---

## 🍕 Product Management

### Adding a New Product

1. Click on **"Products"** in the sidebar
2. Click the **"Create New Product"** button
3. Fill in the form:
   - **Product Name** * (Required) - e.g., "Margherita Pizza"
   - **Category** - e.g., "Pizza", "Burgers", "Salads"
   - **Price** * (Required) - e.g., 12.99
   - **Description** - Brief description of the product
   - **Product Image** (Optional) - Upload a photo
4. Click **"Save Product"**

### Editing a Product

1. Find the product in the list
2. Click the **Edit** button (pencil icon)
3. Modify the fields
4. Click **"Update Product"**

### Deleting a Product

1. Find the product in the list
2. Click the **Delete** button (trash icon)
3. Confirm the deletion

**⚠️ Warning**: Deleting a product will remove it from all menus!

---

## 📋 Menu Management

### Creating a New Menu

1. Click on **"Menu Management"** in the sidebar
2. Click the **"Create New Menu"** button
3. Fill in the form:
   - **Menu Name** * (Required) - e.g., "Lunch Menu"
   - **Category** - e.g., "lunch", "dinner", "dessert"
   - **Description** - What this menu is about
   - **Menu Image** (Optional) - Upload a cover image
   - **Visible to customers** - Check to make it visible
   - **Select Products** * (Required) - **CHECK AT LEAST ONE PRODUCT**
4. Click **"Save Menu"**

### ⚠️ Important: Menu Creation Requirements

**You MUST select at least one product when creating a menu!**

If you see this error:
```
Failed to load resource: the server responded with a status of 400 (BAD REQUEST)
```

**Solution**: Make sure you have:
1. ✅ Entered a menu name
2. ✅ **Selected at least one product** (check the boxes)

### How to Select Products for a Menu

When creating/editing a menu, you'll see a list of all products with checkboxes:

```
☐ Margherita Pizza - $12.99
☐ Chicken Burger - $10.99
☐ Caesar Salad - $8.99
☐ Spaghetti Carbonara - $11.99
```

**Click the checkboxes** to select products you want in this menu:

```
☑ Margherita Pizza - $12.99
☑ Chicken Burger - $10.99
☐ Caesar Salad - $8.99
☑ Spaghetti Carbonara - $11.99
```

In this example, 3 products are selected for the menu.

### Editing a Menu

1. Find the menu in the list
2. Click the **Edit** button
3. Modify the fields
4. **Make sure at least one product is selected**
5. Click **"Update Menu"**

### Deleting a Menu

1. Find the menu in the list
2. Click the **Delete** button
3. Confirm the deletion

---

## 📦 Order Management

### Viewing Orders

1. Click on **"Orders"** in the sidebar
2. You'll see all orders with:
   - Order ID
   - Customer name
   - Items ordered
   - Total amount
   - Status
   - Date

### Updating Order Status

1. Find the order in the list
2. Click the **status dropdown**
3. Select new status:
   - **Pending** - Just received
   - **Preparing** - Being prepared
   - **Completed** - Delivered/Completed
   - **Cancelled** - Cancelled
4. Status updates automatically

### Filtering Orders

- Use the **search box** to find specific orders
- Use the **status filter** to show only certain statuses

---

## 👥 Customer Management

### Viewing Customers

1. Click on **"Customers"** in the sidebar
2. You'll see all customers with:
   - Customer ID
   - Name
   - Email
   - Phone
   - Number of orders
   - Total spent

### Searching Customers

- Use the **search box** to find customers by name, email, or phone

**Note**: Customers are automatically created when they place orders.

---

## 🔧 Troubleshooting

### "Failed to load resource: 400 (BAD REQUEST)" when creating menu

**Problem**: You didn't select any products for the menu.

**Solution**:
1. Open the menu form
2. Scroll down to "Select Products"
3. **Check at least one product checkbox**
4. Try saving again

### Products not showing in menu form

**Problem**: No products exist yet.

**Solution**:
1. Go to "Products" section first
2. Create some products
3. Then go back to "Menu Management"
4. Products will now appear in the selection list

### Image upload fails

**Solutions**:
- Check file size (must be under 16MB)
- Use supported formats: JPG, PNG, GIF, WEBP
- Make sure the file name doesn't have special characters

### Can't delete a product

**Problem**: Product might be in use in menus or orders.

**Solution**:
1. Remove the product from all menus first
2. Then try deleting again

---

## 💡 Best Practices

### Product Management
- ✅ Use clear, descriptive names
- ✅ Add high-quality images
- ✅ Write detailed descriptions
- ✅ Use consistent categories
- ✅ Set realistic prices

### Menu Management
- ✅ Create themed menus (Lunch, Dinner, Desserts)
- ✅ Group related products together
- ✅ Use descriptive menu names
- ✅ Add menu cover images
- ✅ **Always select at least one product**
- ✅ Mark menus as visible when ready

### Order Management
- ✅ Update order status promptly
- ✅ Check pending orders regularly
- ✅ Mark completed orders as "Completed"
- ✅ Cancel invalid orders

---

## 📱 Customer Site Usage

### For Customers

1. Visit: `http://localhost:5000/`
2. Browse the menu
3. Add items to cart
4. Place an order
5. Fill in contact information

---

## 🆘 Getting Help

### Common Questions

**Q: How do I add products to a menu?**
A: When creating/editing a menu, check the boxes next to the products you want to include.

**Q: Why can't I create a menu?**
A: Make sure you've entered a name AND selected at least one product.

**Q: How do I make a menu visible to customers?**
A: Check the "Visible to customers" checkbox when creating/editing the menu.

**Q: Can I add the same product to multiple menus?**
A: Yes! Products can appear in multiple menus.

**Q: How do I change product prices?**
A: Edit the product and update the price field.

---

## 📞 Support

If you encounter issues:
1. Check this guide
2. Check the console for error messages (F12 in browser)
3. Review the README.md file
4. Run `python test_api.py` to check if the API is working

---

**Happy Managing! 🎉**

