"""
Restaurant Management System - Backend API
A Flask-based REST API for managing restaurant operations including products, menus, orders, and customers.
"""

from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
try:
    import mariadb
    from mariadb import Error
    DB_DRIVER = 'mariadb'
except ImportError:
    import mysql.connector as mariadb
    from mysql.connector import Error
    DB_DRIVER = 'mysql'
import json
import os
from werkzeug.utils import secure_filename
from contextlib import contextmanager
from datetime import datetime
import traceback
from decimal import Decimal

# Flask App Configuration
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# File Upload Configuration
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max

# Database Configuration
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'restaurant_db',
    'port': 3306
}

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Utility Functions
def allowed_file(filename):
    """Check if file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@contextmanager
def get_db_connection():
    """Database connection context manager."""
    connection = None
    try:
        if DB_DRIVER == 'mysql':
            # MySQL connector uses different parameter names
            config = DB_CONFIG.copy()
            connection = mariadb.connect(**config)
        else:
            connection = mariadb.connect(**DB_CONFIG)
        yield connection
    except Error as e:
        print(f"Database connection error: {e}")
        raise
    finally:
        if connection:
            connection.close()

def safe_float(value, default=0.0):
    """Safely convert value to float."""
    try:
        return float(value) if value is not None else default
    except (ValueError, TypeError):
        return default

def safe_int(value, default=0):
    """Safely convert value to int."""
    try:
        return int(value) if value is not None else default
    except (ValueError, TypeError):
        return default

def serialize_decimal(obj):
    """Convert Decimal objects to float for JSON serialization."""
    if isinstance(obj, Decimal):
        return float(obj)
    elif isinstance(obj, datetime):
        return obj.isoformat()
    return obj

def serialize_row(row):
    """Serialize a database row dictionary."""
    if isinstance(row, dict):
        return {k: serialize_decimal(v) for k, v in row.items()}
    return row

# Database Initialization
def initialize_database():
    """Initialize database with tables and sample data."""
    try:
        # First, connect without specifying database to create it
        temp_config = DB_CONFIG.copy()
        temp_config.pop('database', None)

        conn = mariadb.connect(**temp_config)
        cursor = conn.cursor()

        # Create database if not exists
        cursor.execute("CREATE DATABASE IF NOT EXISTS restaurant_db")
        cursor.execute("USE restaurant_db")

        # Create tables
        create_tables(cursor)

        # Check if we need to insert sample data
        cursor.execute("SELECT COUNT(*) FROM products")
        product_count = cursor.fetchone()[0]

        if product_count == 0:
            print("📦 Inserting sample data...")
            insert_sample_data(cursor)
        else:
            print(f"✓ Database already contains {product_count} products")

        conn.commit()
        cursor.close()
        conn.close()

        print("✓ Database initialized successfully!")
        return True

    except Exception as e:
        print(f"❌ Database initialization error: {e}")
        traceback.print_exc()
        return False

def create_tables(cursor):
    """Create all required database tables."""
    tables = [
        """
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            category VARCHAR(100),
            description TEXT,
            price DECIMAL(10,2) NOT NULL,
            image_url VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS menus (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            is_visible BOOLEAN DEFAULT TRUE,
            category VARCHAR(100),
            image_url VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS menu_products (
            menu_id INT,
            product_id INT,
            PRIMARY KEY (menu_id, product_id),
            FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS customers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255),
            phone VARCHAR(20),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            customer_id INT,
            total_amount DECIMAL(10,2) NOT NULL,
            status ENUM('pending', 'preparing', 'completed', 'cancelled') DEFAULT 'pending',
            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (customer_id) REFERENCES customers(id)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS order_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_id INT,
            product_id INT,
            quantity INT NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
        """
    ]

    for table_sql in tables:
        cursor.execute(table_sql)

def insert_sample_data(cursor):
    """Insert sample data for testing."""
    # Sample products
    products_data = [
        ('Margherita Pizza', 'Pizza', 'Classic pizza with tomato sauce, mozzarella, and fresh basil', 12.99, '/static/uploads/pizza1.jpg'),
        ('Chicken Burger', 'Burgers', 'Juicy chicken patty with lettuce, tomato, and special sauce', 9.99, '/static/uploads/burger1.jpg'),
        ('Caesar Salad', 'Salads', 'Crisp romaine lettuce with Caesar dressing and croutons', 7.99, '/static/uploads/salad1.jpg'),
        ('Spaghetti Carbonara', 'Pasta', 'Creamy pasta with bacon, eggs, and Parmesan cheese', 11.99, '/static/uploads/pasta1.jpg'),
        ('Chocolate Brownie', 'Desserts', 'Rich chocolate brownie with vanilla ice cream', 5.99, '/static/uploads/dessert1.jpg'),
    ]
    cursor.executemany(
        "INSERT IGNORE INTO products (name, category, description, price, image_url) VALUES (%s, %s, %s, %s, %s)",
        products_data
    )

    # Sample customers
    customers_data = [
        ('John Doe', 'john@example.com', '+1234567890'),
        ('Jane Smith', 'jane@example.com', '+1234567891'),
        ('Bob Johnson', 'bob@example.com', '+1234567892'),
    ]
    cursor.executemany(
        "INSERT IGNORE INTO customers (name, email, phone) VALUES (%s, %s, %s)",
        customers_data
    )

    # Sample menus
    menus_data = [
        ('Main Menu', 'Our complete restaurant menu', True, 'main'),
        ('Lunch Specials', 'Special lunch offerings', True, 'lunch'),
        ('Dessert Menu', 'Sweet treats to end your meal', True, 'dessert'),
    ]
    cursor.executemany(
        "INSERT IGNORE INTO menus (name, description, is_visible, category) VALUES (%s, %s, %s, %s)",
        menus_data
    )

    # Sample orders
    orders_data = [
        (1, 29.97, 'completed'),
        (2, 18.98, 'preparing'),
        (3, 22.98, 'pending'),
    ]
    cursor.executemany(
        "INSERT IGNORE INTO orders (customer_id, total_amount, status) VALUES (%s, %s, %s)",
        orders_data
    )

# API Routes

# Products Routes
@app.route('/api/products', methods=['GET'])
def get_products():
    """Get all products."""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM products ORDER BY created_at DESC")
            products = [serialize_row(row) for row in cursor.fetchall()]
            return jsonify(products)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products', methods=['POST'])
def create_product():
    """Create a new product with optional image upload."""
    try:
        # Handle image upload if provided
        image_url = ''
        if 'image' in request.files:
            image = request.files['image']
            if image.filename != '' and allowed_file(image.filename):
                filename = secure_filename(image.filename)
                # Add timestamp to avoid filename conflicts
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S_')
                filename = timestamp + filename
                image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                image.save(image_path)
                image_url = f'/static/uploads/{filename}'

        # Get product data
        name = request.form.get('name', '').strip()
        category = request.form.get('category', '').strip()
        description = request.form.get('description', '').strip()
        price = safe_float(request.form.get('price', 0))

        # Validation
        if not name:
            return jsonify({'error': 'Product name is required'}), 400
        if price <= 0:
            return jsonify({'error': 'Price must be greater than 0'}), 400

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO products (name, category, description, price, image_url)
                VALUES (%s, %s, %s, %s, %s)
            """, (name, category, description, price, image_url))

            product_id = cursor.lastrowid
            conn.commit()

            return jsonify({
                'message': 'Product created successfully',
                'id': product_id,
                'product': {
                    'id': product_id,
                    'name': name,
                    'category': category,
                    'description': description,
                    'price': price,
                    'image_url': image_url
                }
            }), 201

    except Exception as e:
        print(f"Error in create_product: {e}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    """Update an existing product."""
    try:
        # Handle image upload if provided
        image_url = None
        if 'image' in request.files:
            image = request.files['image']
            if image.filename != '' and allowed_file(image.filename):
                filename = secure_filename(image.filename)
                image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                image.save(image_path)
                image_url = f'/static/uploads/{filename}'

        # Get form data or JSON data
        if request.content_type and 'multipart/form-data' in request.content_type:
            data = {
                'name': request.form.get('name'),
                'category': request.form.get('category'),
                'description': request.form.get('description'),
                'price': safe_float(request.form.get('price'))
            }
        else:
            data = request.get_json()

        with get_db_connection() as conn:
            cursor = conn.cursor()

            # If no new image, keep existing image_url
            if image_url is None:
                cursor.execute("SELECT image_url FROM products WHERE id = %s", (product_id,))
                result = cursor.fetchone()
                image_url = result[0] if result else ''

            cursor.execute("""
                UPDATE products
                SET name=%s, category=%s, price=%s, description=%s, image_url=%s
                WHERE id=%s
            """, (data['name'], data['category'], safe_float(data['price']),
                  data['description'], image_url, product_id))

            conn.commit()
            return jsonify({'message': 'Product updated successfully'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Delete a product and its references."""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()

            # Remove references in related tables
            cursor.execute("DELETE FROM menu_products WHERE product_id = %s", (product_id,))
            cursor.execute("DELETE FROM order_items WHERE product_id = %s", (product_id,))
            cursor.execute("DELETE FROM products WHERE id = %s", (product_id,))

            conn.commit()
            return jsonify({'message': 'Product deleted successfully'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Menus Routes
@app.route('/api/menus', methods=['GET'])
def get_menus():
    """Get all menus with their products."""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM menus ORDER BY created_at DESC")
            menus = cursor.fetchall()

            # Get products for each menu
            for menu in menus:
                cursor.execute("""
                    SELECT p.* FROM products p
                    JOIN menu_products mp ON p.id = mp.product_id
                    WHERE mp.menu_id = %s
                    ORDER BY p.name
                """, (menu['id'],))
                menu['products'] = [serialize_row(p) for p in cursor.fetchall()]

            # Serialize menus
            serialized_menus = [serialize_row(menu) for menu in menus]
            return jsonify(serialized_menus)

    except Exception as e:
        print(f"Error in get_menus: {e}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/menus', methods=['POST'])
def create_menu():
    """Create a new menu with products and optional image."""
    try:
        # Handle form data or JSON data
        if request.content_type and 'multipart/form-data' in request.content_type:
            name = request.form.get('name', '').strip()
            description = request.form.get('description')
            category = request.form.get('category', 'main')
            is_visible = request.form.get('is_visible', 'true').lower() == 'true'
            product_ids_str = request.form.get('product_ids', '[]')

            # Handle image upload
            image_url = None
            if 'image' in request.files:
                image = request.files['image']
                if image.filename != '' and allowed_file(image.filename):
                    filename = secure_filename(image.filename)
                    image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    image.save(image_path)
                    image_url = f'/static/uploads/{filename}'
        else:
            data = request.get_json()
            name = data.get('name', '').strip()
            description = data.get('description')
            category = data.get('category', 'main')
            is_visible = data.get('is_visible', True)
            product_ids_str = data.get('product_ids', [])
            image_url = None

        # Validation
        if not name:
            return jsonify({'error': 'Menu name is required'}), 400

        # Parse product IDs
        try:
            if isinstance(product_ids_str, str):
                product_ids = json.loads(product_ids_str)
            else:
                product_ids = product_ids_str or []

            if not isinstance(product_ids, list) or len(product_ids) == 0:
                return jsonify({'error': 'At least one product must be selected'}), 400

        except json.JSONDecodeError:
            return jsonify({'error': 'Invalid product_ids format'}), 400

        with get_db_connection() as conn:
            cursor = conn.cursor()

            # Create menu
            cursor.execute("""
                INSERT INTO menus (name, description, is_visible, category, image_url)
                VALUES (%s, %s, %s, %s, %s)
            """, (name, description, is_visible, category, image_url))

            menu_id = cursor.lastrowid

            # Add products to menu
            for product_id in product_ids:
                product_id_int = safe_int(product_id)
                if product_id_int > 0:
                    cursor.execute("""
                        INSERT INTO menu_products (menu_id, product_id)
                        VALUES (%s, %s)
                    """, (menu_id, product_id_int))

            conn.commit()
            return jsonify({
                'message': 'Menu created successfully',
                'id': menu_id
            }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/menus/<int:menu_id>', methods=['PUT'])
def update_menu(menu_id):
    """Update an existing menu."""
    try:
        # Handle form data or JSON data
        if request.content_type and 'multipart/form-data' in request.content_type:
            name = request.form.get('name', '').strip()
            description = request.form.get('description')
            category = request.form.get('category', 'main')
            is_visible = request.form.get('is_visible', 'true').lower() == 'true'
            product_ids_str = request.form.get('product_ids', '[]')

            # Handle image upload
            image_url = None
            if 'image' in request.files:
                image = request.files['image']
                if image.filename != '' and allowed_file(image.filename):
                    filename = secure_filename(image.filename)
                    image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    image.save(image_path)
                    image_url = f'/static/uploads/{filename}'
        else:
            data = request.get_json()
            name = data.get('name', '').strip()
            description = data.get('description')
            category = data.get('category', 'main')
            is_visible = data.get('is_visible', True)
            product_ids_str = data.get('product_ids', [])
            image_url = None

        # Validation
        if not name:
            return jsonify({'error': 'Menu name is required'}), 400

        # Parse product IDs
        try:
            if isinstance(product_ids_str, str):
                product_ids = json.loads(product_ids_str)
            else:
                product_ids = product_ids_str or []
        except json.JSONDecodeError:
            return jsonify({'error': 'Invalid product_ids format'}), 400

        with get_db_connection() as conn:
            cursor = conn.cursor()

            # Keep existing image if no new one provided
            if image_url is None:
                cursor.execute("SELECT image_url FROM menus WHERE id = %s", (menu_id,))
                result = cursor.fetchone()
                image_url = result[0] if result else ''

            # Update menu
            cursor.execute("""
                UPDATE menus
                SET name=%s, description=%s, is_visible=%s, category=%s, image_url=%s
                WHERE id=%s
            """, (name, description, is_visible, category, image_url, menu_id))

            # Update menu products
            cursor.execute("DELETE FROM menu_products WHERE menu_id = %s", (menu_id,))
            for product_id in product_ids:
                product_id_int = safe_int(product_id)
                if product_id_int > 0:
                    cursor.execute("""
                        INSERT INTO menu_products (menu_id, product_id)
                        VALUES (%s, %s)
                    """, (menu_id, product_id_int))

            conn.commit()
            return jsonify({'message': 'Menu updated successfully'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/menus/<int:menu_id>', methods=['DELETE'])
def delete_menu(menu_id):
    """Delete a menu."""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM menus WHERE id = %s", (menu_id,))
            conn.commit()
            return jsonify({'message': 'Menu deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Orders Routes
@app.route('/api/orders', methods=['GET'])
def get_orders():
    """Get all orders with customer and item details."""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("""
                SELECT o.*, c.name as customer_name, c.email as customer_email, c.phone as customer_phone
                FROM orders o
                LEFT JOIN customers c ON o.customer_id = c.id
                ORDER BY o.order_date DESC
            """)
            orders = cursor.fetchall()

            # Get order items for each order
            for order in orders:
                cursor.execute("""
                    SELECT oi.*, p.name as product_name, p.image_url as product_image
                    FROM order_items oi
                    JOIN products p ON oi.product_id = p.id
                    WHERE oi.order_id = %s
                """, (order['id'],))
                order['items'] = [serialize_row(item) for item in cursor.fetchall()]

            # Serialize orders
            serialized_orders = [serialize_row(order) for order in orders]
            return jsonify(serialized_orders)

    except Exception as e:
        print(f"Error in get_orders: {e}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders', methods=['POST'])
def create_order():
    """Create a new order with items."""
    try:
        data = request.get_json()

        # Validation
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        customer_name = data.get('customer_name', '').strip()
        customer_email = data.get('customer_email', '').strip()
        customer_phone = data.get('customer_phone', '').strip()
        items = data.get('items', [])

        if not customer_name:
            return jsonify({'error': 'Customer name is required'}), 400
        if not items or len(items) == 0:
            return jsonify({'error': 'Order must contain at least one item'}), 400

        with get_db_connection() as conn:
            cursor = conn.cursor()

            # Create or get customer
            cursor.execute(
                "SELECT id FROM customers WHERE email = %s OR phone = %s",
                (customer_email, customer_phone)
            )
            customer = cursor.fetchone()

            if customer:
                customer_id = customer[0]
            else:
                cursor.execute(
                    "INSERT INTO customers (name, email, phone) VALUES (%s, %s, %s)",
                    (customer_name, customer_email, customer_phone)
                )
                customer_id = cursor.lastrowid

            # Calculate total amount
            total_amount = 0
            for item in items:
                product_id = safe_int(item.get('product_id'))
                quantity = safe_int(item.get('quantity', 1))

                cursor.execute("SELECT price FROM products WHERE id = %s", (product_id,))
                product = cursor.fetchone()
                if product:
                    price = float(product[0])
                    total_amount += price * quantity

            # Create order
            cursor.execute(
                "INSERT INTO orders (customer_id, total_amount, status) VALUES (%s, %s, %s)",
                (customer_id, total_amount, 'pending')
            )
            order_id = cursor.lastrowid

            # Add order items
            for item in items:
                product_id = safe_int(item.get('product_id'))
                quantity = safe_int(item.get('quantity', 1))

                cursor.execute("SELECT price FROM products WHERE id = %s", (product_id,))
                product = cursor.fetchone()
                if product:
                    price = float(product[0])
                    cursor.execute(
                        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (%s, %s, %s, %s)",
                        (order_id, product_id, quantity, price)
                    )

            conn.commit()

            return jsonify({
                'message': 'Order created successfully',
                'order_id': order_id,
                'total_amount': total_amount
            }), 201

    except Exception as e:
        print(f"Error in create_order: {e}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders/<int:order_id>', methods=['PUT'])
def update_order_status(order_id):
    """Update order status."""
    try:
        data = request.get_json()
        if not data or 'status' not in data:
            return jsonify({'error': 'Status is required'}), 400

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "UPDATE orders SET status = %s WHERE id = %s",
                (data['status'], order_id)
            )
            conn.commit()
            return jsonify({'message': 'Order status updated successfully'})

    except Exception as e:
        print(f"Error in update_order_status: {e}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

# Customers Routes
@app.route('/api/customers', methods=['GET'])
def get_customers():
    """Get all customers with order count."""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("""
                SELECT c.*, COUNT(o.id) as order_count
                FROM customers c
                LEFT JOIN orders o ON c.id = o.customer_id
                GROUP BY c.id
                ORDER BY c.created_at DESC
            """)
            customers = cursor.fetchall()
            serialized_customers = [serialize_row(c) for c in customers]
            return jsonify(serialized_customers)
    except Exception as e:
        print(f"Error in get_customers: {e}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

# Dashboard Routes
@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    """Get dashboard statistics."""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor(dictionary=True)

            # Get statistics
            stats = {}

            cursor.execute("SELECT COUNT(*) as count FROM products")
            stats['total_products'] = cursor.fetchone()['count']

            cursor.execute("SELECT COUNT(*) as count FROM orders")
            stats['total_orders'] = cursor.fetchone()['count']

            cursor.execute("SELECT COUNT(*) as count FROM customers")
            stats['total_customers'] = cursor.fetchone()['count']

            cursor.execute("SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status = 'completed'")
            stats['total_revenue'] = safe_float(cursor.fetchone()['total'])

            # Pending orders count
            cursor.execute("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'")
            stats['pending_orders'] = cursor.fetchone()['count']

            # Recent orders
            cursor.execute("""
                SELECT o.*, c.name as customer_name
                FROM orders o
                LEFT JOIN customers c ON o.customer_id = c.id
                ORDER BY o.order_date DESC
                LIMIT 5
            """)
            stats['recent_orders'] = [serialize_row(order) for order in cursor.fetchall()]

            # Top selling products
            cursor.execute("""
                SELECT p.name, p.image_url, SUM(oi.quantity) as total_sold, SUM(oi.quantity * oi.price) as revenue
                FROM order_items oi
                JOIN products p ON oi.product_id = p.id
                GROUP BY p.id
                ORDER BY total_sold DESC
                LIMIT 5
            """)
            stats['top_products'] = [serialize_row(product) for product in cursor.fetchall()]

            return jsonify(stats)

    except Exception as e:
        print(f"Error in get_dashboard_stats: {e}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

# Frontend Routes
@app.route('/admin')
def serve_admin():
    """Serve the admin panel."""
    template_path = os.path.join(app.root_path, 'templates', 'admin.html')
    static_path = os.path.join(app.static_folder, 'Admin.html')

    if os.path.exists(template_path):
        return render_template('admin.html')
    elif os.path.exists(static_path):
        with open(static_path, 'r', encoding='utf-8') as f:
            return f.read()
    else:
        return """
        <h1>Admin panel not found</h1>
        <p>Please ensure admin.html exists in the templates or static folder.</p>
        """, 404

@app.route('/')
def serve_home():
    """Serve the customer home page."""
    index_path = os.path.join(app.root_path, 'Index.html')
    if os.path.exists(index_path):
        with open(index_path, 'r', encoding='utf-8') as f:
            return f.read()
    else:
        return """
        <h1>Welcome to Restaurant Management System</h1>
        <p><a href="/admin">Go to Admin Panel</a></p>
        """, 404

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT 1")
            return jsonify({
                'status': 'healthy',
                'database': 'connected',
                'timestamp': datetime.now().isoformat()
            })
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'database': 'disconnected',
            'error': str(e),
            'timestamp': datetime.now().isoformat()
        }), 500

# Application Entry Point
if __name__ == '__main__':
    try:
        initialize_database()
        print("=" * 60)
        print("🚀 Starting Restaurant Management System")
        print("=" * 60)
        print("📊 Admin Panel:    http://localhost:5000/admin")
        print("🏠 Customer Site:  http://localhost:5000/")
        print("💚 Health Check:   http://localhost:5000/api/health")
        print("=" * 60)
        app.run(debug=True, port=5000, host='0.0.0.0')
    except Exception as e:
        print(f"❌ Failed to start application: {e}")
        traceback.print_exc()