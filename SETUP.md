# Highway Delite - Quick Start Guide

## 📦 Installation Steps

### 1. Install Dependencies

```powershell
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Setup MongoDB

**Option A: Local MongoDB**
1. Download and install MongoDB Community Edition
2. Start MongoDB service:
   ```powershell
   mongod
   ```

**Option B: MongoDB Atlas (Recommended)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier available)
3. Create database user
4. Whitelist your IP address (or use 0.0.0.0/0 for testing)
5. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### 3. Configure Environment Variables

**Server (.env)**
```powershell
cd server
Copy-Item .env.example .env
```

Edit `server\.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/highway-delite
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/highway-delite?retryWrites=true&w=majority
NODE_ENV=development
```

**Client (.env)**
```powershell
cd ../client
Copy-Item .env.example .env
```

Edit `client\.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed Database

```powershell
cd server
npm run seed
```

Expected output:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Inserted experiences
✅ Inserted promo codes
🎉 Database seeded successfully!
```

### 5. Run the Application

**Option A: Run both together (from root)**
```powershell
npm run dev
```

**Option B: Run separately**

Terminal 1 - Backend:
```powershell
cd server
npm run dev
```

Terminal 2 - Frontend:
```powershell
cd client
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🧪 Test the Application

1. Open http://localhost:5173
2. Browse experiences
3. Click "View Details" on any experience
4. Select date and time
5. Adjust quantity
6. Click "Confirm"
7. Fill in name and email
8. Try promo codes: `SAVE10` or `FLAT100`
9. Click "Pay and Confirm"
10. See booking confirmation

## 🔑 Promo Codes

- `SAVE10` - 10% discount
- `FLAT100` - ₹100 flat discount (minimum ₹500 purchase)

## 📝 API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience by ID

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking by reference

### Promo
- `POST /api/promo/validate` - Validate promo code

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: Could not connect to MongoDB
```
**Solution**: 
- Check if MongoDB is running
- Verify MONGODB_URI in .env file
- For Atlas: Check IP whitelist and credentials

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
```powershell
# Find process using port
netstat -ano | findstr :5000
# Kill the process
taskkill /PID <PID> /F
```

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution**:
```powershell
cd server
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### CORS Error
**Solution**: Backend CORS is already configured. If you still see errors, check that:
- Backend is running on port 5000
- Frontend is accessing http://localhost:5000/api

## 🚀 Deployment

### Backend (Render/Railway)

1. **Push to GitHub**
   ```powershell
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Render**
   - Connect GitHub repository
   - Root Directory: `server`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add environment variables (MONGODB_URI, PORT, NODE_ENV)

3. **Deploy on Railway**
   - Connect GitHub repository
   - Select `server` directory
   - Add MongoDB plugin or use Atlas
   - Add environment variables

### Frontend (Vercel/Netlify)

1. **Build**
   ```powershell
   cd client
   npm run build
   ```

2. **Deploy on Vercel**
   - Connect GitHub repository
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add environment variable: `VITE_API_URL=https://your-api-url.com/api`

3. **Deploy on Netlify**
   - Drag and drop `client/dist` folder
   - Or connect GitHub and set build settings

## 💡 Tips

1. **Clear Browser Cache**: If changes don't appear, clear cache or use incognito
2. **Check Logs**: Use browser console and terminal for debugging
3. **Test API**: Use Postman or Thunder Client to test API endpoints
4. **Database**: Use MongoDB Compass to view database

## 📞 Need Help?

If you're stuck, provide the following information:
1. Error message (full stack trace)
2. What you were trying to do
3. Your environment (Windows version, Node version)

Check versions:
```powershell
node --version
npm --version
mongod --version
```

Happy Coding! 🎉
