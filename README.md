# 🍽️ Restaurant Management System

A comprehensive full-stack restaurant management system with customer-facing website and admin panel.

## 📋 Features

### Customer Features
- 🏠 **Home Page** - Welcome page with restaurant information
- 📖 **Menu Browsing** - View available dishes and categories
- 🛒 **Order Placement** - Add items to cart and place orders
- 📞 **Contact** - Get in touch with the restaurant

### Admin Features
- 📊 **Dashboard** - Overview of sales, orders, and statistics
- 🍕 **Product Management** - CRUD operations for menu items
- 📋 **Menu Management** - Create and manage different menus
- 📦 **Order Management** - View and update order status
- 👥 **Customer Management** - View customer information and history

## 🛠️ Technology Stack

### Backend
- **Python 3.8+**
- **Flask** - Web framework
- **MariaDB** - Database
- **Flask-CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Structure
- **Tailwind CSS** - Styling
- **Vanilla JavaScript** - Interactivity
- **Material Icons** - Icons

## 📦 Installation

### Prerequisites
1. **Python 3.8 or higher**
2. **MariaDB/MySQL Server**
3. **pip** (Python package manager)

### Step 1: Install MariaDB
Download and install MariaDB from: https://mariadb.org/download/

During installation:
- Set root password (or leave empty for development)
- Note the port (default: 3306)

### Step 2: Clone/Download the Project
```bash
cd c:\Users\SOKKEANG.YEANG\Desktop\Backend
```

### Step 3: Install Python Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Configure Database
Edit `app.py` if needed to match your database configuration:
```python
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',  # Add your password if set
    'database': 'restaurant_db',
    'port': 3306
}
```

### Step 5: Run the Application
```bash
python app.py
```

The application will:
- ✅ Create the database automatically
- ✅ Create all required tables
- ✅ Insert sample data (if database is empty)
- ✅ Start the server on http://localhost:5000

## 🚀 Usage

### Access Points
- **Customer Website**: http://localhost:5000/
- **Admin Panel**: http://localhost:5000/admin
- **API Health Check**: http://localhost:5000/api/health

### Testing the API
Run the test script to verify all endpoints:
```bash
python test_api.py
```

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (with image upload)
- `PUT /api/products/<id>` - Update product
- `DELETE /api/products/<id>` - Delete product

### Menus
- `GET /api/menus` - Get all menus with products
- `POST /api/menus` - Create new menu
- `PUT /api/menus/<id>` - Update menu
- `DELETE /api/menus/<id>` - Delete menu

### Orders
- `GET /api/orders` - Get all orders with details
- `POST /api/orders` - Create new order
- `PUT /api/orders/<id>` - Update order status

### Customers
- `GET /api/customers` - Get all customers with order count

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Health
- `GET /api/health` - Check API and database health

## 📁 Project Structure

```
Backend/
├── app.py                  # Main Flask application
├── requirements.txt        # Python dependencies
├── test_api.py            # API testing script
├── README.md              # This file
│
├── static/                # Static files
│   ├── Admin.html         # Admin panel
│   └── uploads/           # Uploaded images
│
├── js/                    # JavaScript files
│   ├── admin.js           # Admin panel logic
│   ├── menu.js            # Menu page logic
│   ├── order.js           # Order page logic
│   ├── contact.js         # Contact page logic
│   └── script.js          # Common scripts
│
├── Index.html             # Customer home page
├── menu.html              # Menu browsing page
├── Order.html             # Order placement page
├── Contact Us.html        # Contact page
│
└── *.css                  # Stylesheets
```

## 🔧 Configuration

### Database Configuration
Edit `DB_CONFIG` in `app.py`:
```python
DB_CONFIG = {
    'host': 'localhost',      # Database host
    'user': 'root',           # Database user
    'password': '',           # Database password
    'database': 'restaurant_db',  # Database name
    'port': 3306              # Database port
}
```

### File Upload Configuration
```python
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max
```

## 🐛 Troubleshooting

### Database Connection Error
```
Error: Can't connect to MySQL server
```
**Solution**: 
- Ensure MariaDB service is running
- Check database credentials in `app.py`
- Verify port 3306 is not blocked

### Module Not Found Error
```
ModuleNotFoundError: No module named 'flask'
```
**Solution**: 
```bash
pip install -r requirements.txt
```

### Port Already in Use
```
OSError: [Errno 48] Address already in use
```
**Solution**: 
- Change port in `app.py`: `app.run(port=5001)`
- Or kill the process using port 5000

### Image Upload Fails
**Solution**: 
- Ensure `static/uploads/` directory exists
- Check file permissions
- Verify file size is under 16MB

## 📝 Sample Data

The system automatically creates sample data including:
- 5 sample products (Pizza, Burger, Salad, Pasta, Dessert)
- 3 sample customers
- 3 sample menus
- 3 sample orders

## 🔐 Security Notes

⚠️ **This is a development version**. For production use:
- Add authentication and authorization
- Use environment variables for sensitive data
- Enable HTTPS
- Implement rate limiting
- Add input validation and sanitization
- Use prepared statements (already implemented)

## 📄 License

This project is for educational purposes.

## 👨‍💻 Developer

Created for restaurant management and learning purposes.

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Run `python test_api.py` to diagnose issues
4. Check server logs for detailed error messages

---

**Happy Coding! 🚀**

