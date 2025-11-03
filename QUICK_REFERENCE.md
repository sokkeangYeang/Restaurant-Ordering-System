# 🚀 Quick Reference Card

## 📌 Essential URLs

```
Admin Panel:     http://localhost:5000/admin
Customer Home:   http://localhost:5000/
Menu Page:       http://localhost:5000/menu.html
Order Page:      http://localhost:5000/Order.html
Health Check:    http://localhost:5000/api/health
```

## ⚡ Quick Commands

```bash
# Start the server
python app.py

# Run tests
python test_api.py

# Install dependencies
pip install -r requirements.txt
```

## 🎯 Common Tasks

### Add a Product
1. Open admin panel
2. Click "Products"
3. Click "Create New Product"
4. Fill form + upload image
5. Click "Save Product"

### Create a Menu
1. Open admin panel
2. Click "Menu Management"
3. Click "Create New Menu"
4. Fill form
5. **✅ CHECK AT LEAST ONE PRODUCT**
6. Click "Save Menu"

### View Orders
1. Open admin panel
2. Click "Orders"
3. Update status as needed

## ⚠️ Important Notes

### Menu Creation
**MUST select at least ONE product or you'll get 400 error!**

### Database Fields
- `name` (not `title`)
- `image_url` (not `img`)
- `price`
- `description`
- `category`

### Categories
Use these for best results:
- Burgers
- Pizza
- Drinks / Beverages
- Desserts
- Pasta
- Salads
- Appetizers

## 🐛 Troubleshooting

### Menu page not loading?
1. Check server is running
2. Open http://localhost:5000/api/health
3. Check browser console (F12)

### 400 error creating menu?
**→ You forgot to select products!**

### Images not showing?
1. Check image URL in database
2. Verify file in static/uploads/
3. Fallback image will show

## 📚 Documentation

| File | Purpose |
|------|---------|
| `QUICK_START.md` | 5-minute setup |
| `README.md` | Complete guide |
| `USER_GUIDE.md` | Admin panel usage |
| `MENU_CREATION_GUIDE.md` | Menu creation help |
| `MENU_PAGE_GUIDE.md` | Menu page details |
| `FINAL_SUMMARY.md` | Complete summary |

## ✅ System Status

```
✅ Backend: Running
✅ Database: Connected
✅ Admin Panel: Functional
✅ Menu Page: Connected to DB
✅ Cart: Working
✅ Tests: 7/7 Passing
✅ Documentation: Complete
```

## 🎉 You're All Set!

Everything is working perfectly!

**Need help?** Check the documentation files above.

**Happy managing! 🍽️**

