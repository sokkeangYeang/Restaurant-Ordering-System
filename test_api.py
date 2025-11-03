"""
Test script for Restaurant Management System API
Run this after starting the Flask server to verify all endpoints work correctly.
"""

import requests
import json

BASE_URL = "http://localhost:5000/api"

def print_section(title):
    """Print a formatted section header."""
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60)

def test_health_check():
    """Test the health check endpoint."""
    print_section("Testing Health Check")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_get_products():
    """Test getting all products."""
    print_section("Testing GET /api/products")
    try:
        response = requests.get(f"{BASE_URL}/products")
        print(f"Status Code: {response.status_code}")
        products = response.json()
        print(f"Found {len(products)} products")
        if products:
            print(f"First product: {json.dumps(products[0], indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_get_menus():
    """Test getting all menus."""
    print_section("Testing GET /api/menus")
    try:
        response = requests.get(f"{BASE_URL}/menus")
        print(f"Status Code: {response.status_code}")
        menus = response.json()
        print(f"Found {len(menus)} menus")
        if menus:
            print(f"First menu: {json.dumps(menus[0], indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_get_orders():
    """Test getting all orders."""
    print_section("Testing GET /api/orders")
    try:
        response = requests.get(f"{BASE_URL}/orders")
        print(f"Status Code: {response.status_code}")
        orders = response.json()
        print(f"Found {len(orders)} orders")
        if orders:
            print(f"First order: {json.dumps(orders[0], indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_get_customers():
    """Test getting all customers."""
    print_section("Testing GET /api/customers")
    try:
        response = requests.get(f"{BASE_URL}/customers")
        print(f"Status Code: {response.status_code}")
        customers = response.json()
        print(f"Found {len(customers)} customers")
        if customers:
            print(f"First customer: {json.dumps(customers[0], indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_dashboard_stats():
    """Test getting dashboard statistics."""
    print_section("Testing GET /api/dashboard/stats")
    try:
        response = requests.get(f"{BASE_URL}/dashboard/stats")
        print(f"Status Code: {response.status_code}")
        stats = response.json()
        print(f"Dashboard Stats:")
        print(f"  - Total Products: {stats.get('total_products', 0)}")
        print(f"  - Total Orders: {stats.get('total_orders', 0)}")
        print(f"  - Total Customers: {stats.get('total_customers', 0)}")
        print(f"  - Total Revenue: ${stats.get('total_revenue', 0):.2f}")
        print(f"  - Pending Orders: {stats.get('pending_orders', 0)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_create_order():
    """Test creating a new order."""
    print_section("Testing POST /api/orders")
    try:
        # First get a product to order
        products_response = requests.get(f"{BASE_URL}/products")
        products = products_response.json()
        
        if not products:
            print("❌ No products available to create order")
            return False
        
        # Create order data
        order_data = {
            "customer_name": "Test Customer",
            "customer_email": "test@example.com",
            "customer_phone": "+1234567890",
            "items": [
                {
                    "product_id": products[0]['id'],
                    "quantity": 2
                }
            ]
        }
        
        response = requests.post(
            f"{BASE_URL}/orders",
            json=order_data,
            headers={'Content-Type': 'application/json'}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 201
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def run_all_tests():
    """Run all API tests."""
    print("\n" + "🧪" * 30)
    print("  RESTAURANT MANAGEMENT SYSTEM - API TESTS")
    print("🧪" * 30)
    
    tests = [
        ("Health Check", test_health_check),
        ("Get Products", test_get_products),
        ("Get Menus", test_get_menus),
        ("Get Orders", test_get_orders),
        ("Get Customers", test_get_customers),
        ("Dashboard Stats", test_dashboard_stats),
        ("Create Order", test_create_order),
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ Test '{test_name}' failed with exception: {e}")
            results.append((test_name, False))
    
    # Print summary
    print_section("TEST SUMMARY")
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\n📊 Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed!")
    else:
        print(f"⚠️  {total - passed} test(s) failed")
    
    return passed == total

if __name__ == "__main__":
    try:
        run_all_tests()
    except KeyboardInterrupt:
        print("\n\n⚠️  Tests interrupted by user")
    except Exception as e:
        print(f"\n\n❌ Test suite failed: {e}")

