# Highway Delite - Deployment Guide

## 🌐 Production Deployment

This guide will help you deploy the Highway Delite application to production using free hosting platforms.

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas account created
- [ ] GitHub repository created and code pushed
- [ ] All environment variables documented
- [ ] Application tested locally
- [ ] Build process verified

## 🗄️ Step 1: Setup MongoDB Atlas (Database)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to your users
   - Name it "highway-delite"

3. **Create Database User**
   - Go to Database Access
   - Add New Database User
   - Choose Password authentication
   - Username: `highway_admin`
   - Password: Generate secure password (save it!)
   - Database User Privileges: Atlas admin

4. **Configure Network Access**
   - Go to Network Access
   - Add IP Address
   - For testing: `0.0.0.0/0` (Allow from anywhere)
   - For production: Add specific IPs

5. **Get Connection String**
   - Go to Database → Connect
   - Choose "Connect your application"
   - Copy connection string:
   ```
   mongodb+srv://highway_admin:<password>@cluster.mongodb.net/highway-delite?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password

6. **Seed Production Database**
   - Update `server/.env` with Atlas URI
   - Run: `npm run seed`
   - Verify data in Atlas dashboard

## 🖥️ Step 2: Deploy Backend (Render)

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Dashboard → New → Web Service
   - Connect your GitHub repository
   - Configure:
     ```
     Name: highway-delite-api
     Region: Choose closest
     Branch: main
     Root Directory: server
     Runtime: Node
     Build Command: npm install && npm run build
     Start Command: npm start
     Instance Type: Free
     ```

3. **Add Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://highway_admin:YOUR_PASSWORD@cluster.mongodb.net/highway-delite?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build to complete (~3-5 min)
   - Your API URL: `https://highway-delite-api.onrender.com`

5. **Test API**
   - Visit: `https://highway-delite-api.onrender.com/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`
   - Test experiences: `https://highway-delite-api.onrender.com/api/experiences`

## 🌐 Step 3: Deploy Frontend (Vercel)

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Dashboard → Add New → Project
   - Import your GitHub repository
   - Configure:
     ```
     Framework Preset: Vite
     Root Directory: client
     Build Command: npm run build
     Output Directory: dist
     Install Command: npm install
     ```

3. **Add Environment Variable**
   - Go to Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://highway-delite-api.onrender.com/api
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build (~2-3 min)
   - Your site URL: `https://highway-delite.vercel.app`

5. **Test Application**
   - Visit your Vercel URL
   - Test complete booking flow
   - Check browser console for errors

## 🔄 Alternative: Deploy to Railway

Railway allows deploying both frontend and backend together.

### Backend on Railway

1. **Create Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **New Project**
   - New Project → Deploy from GitHub repo
   - Select your repository

3. **Configure Service**
   ```
   Root Directory: server
   Start Command: npm start
   ```

4. **Add Variables**
   - Add MONGODB_URI
   - Railway will auto-assign PORT

5. **Generate Domain**
   - Settings → Generate Domain
   - Note the URL

### Frontend on Railway

1. **Add Another Service**
   - Add service → Deploy from GitHub repo
   - Same repository

2. **Configure**
   ```
   Root Directory: client
   Build Command: npm run build
   Start Command: npx vite preview --port $PORT --host
   ```

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

## 🔐 Environment Variables Reference

### Backend (.env)
```env
# Required
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
PORT=5000
NODE_ENV=production

# Optional
MAX_CONNECTIONS=100
SESSION_SECRET=your-secret-key
```

### Frontend (.env)
```env
# Required
VITE_API_URL=https://your-api-url.com/api

# Optional
VITE_APP_NAME=Highway Delite
VITE_ENABLE_ANALYTICS=true
```

## 🧪 Post-Deployment Testing

### Checklist
- [ ] Homepage loads correctly
- [ ] All images display
- [ ] Experience cards clickable
- [ ] Details page shows correct data
- [ ] Date selection works
- [ ] Time slot selection works
- [ ] Quantity increment/decrement works
- [ ] Price calculation correct
- [ ] Checkout form validation works
- [ ] Promo codes validate correctly
- [ ] Booking creates successfully
- [ ] Confirmation page displays

### Test Booking Flow
1. Select experience
2. Choose date: Oct 22
3. Choose time: 09:00 am
4. Set quantity: 2
5. Click Confirm
6. Enter name and email
7. Apply promo: SAVE10
8. Complete booking
9. Verify confirmation

## 📊 Monitoring

### Render Dashboard
- View logs: Logs tab
- Check uptime: Metrics tab
- View deployments: Events tab

### Vercel Dashboard
- Analytics: Analytics tab
- Deployments: Deployments tab
- Functions logs: Functions tab

### MongoDB Atlas
- Cluster metrics: Metrics tab
- Query performance: Performance Advisor
- Database size: Collections

## 🐛 Common Deployment Issues

### Issue: API calls fail with CORS error
**Solution**: 
- Check VITE_API_URL has correct protocol (https://)
- Verify backend CORS is enabled
- Check if backend is running

### Issue: MongoDB connection timeout
**Solution**:
- Verify connection string format
- Check Network Access in Atlas
- Ensure password doesn't have special characters (URL encode if needed)

### Issue: Build fails on Vercel
**Solution**:
```powershell
# Test build locally first
cd client
npm run build
# Fix any TypeScript or lint errors
```

### Issue: Render service shows "Deploying..."
**Solution**:
- Check build logs for errors
- Verify package.json has correct scripts
- Ensure Node version compatibility

### Issue: Images don't load
**Solution**:
- Use HTTPS URLs for external images
- Check Content Security Policy
- Verify image URLs are accessible

## 🔄 Continuous Deployment

Both Render and Vercel support automatic deployments:

1. **Enable Auto-Deploy**
   - Render: Auto-deploy enabled by default
   - Vercel: Enabled by default

2. **Deploy Process**
   ```powershell
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

3. **Deployment Status**
   - Render: Check dashboard
   - Vercel: Check deployments tab
   - GitHub: Check commit status

## 📈 Performance Optimization

### Backend
- Use connection pooling for MongoDB
- Enable compression middleware
- Cache frequently accessed data
- Add rate limiting

### Frontend
- Optimize images (use WebP format)
- Lazy load images
- Enable Vercel Analytics
- Use code splitting

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit .env files
   - Use different secrets for production
   - Rotate credentials regularly

2. **MongoDB**
   - Use strong passwords
   - Limit IP access
   - Enable authentication
   - Regular backups

3. **API**
   - Implement rate limiting
   - Validate all inputs
   - Use HTTPS only
   - Add request size limits

## 📱 Custom Domain (Optional)

### Vercel Custom Domain
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records with your registrar

### Render Custom Domain
1. Go to Service → Settings
2. Add Custom Domain
3. Configure DNS (A or CNAME record)

## 🎉 Success!

Your application is now live! Share your links:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.onrender.com`

## 📞 Support

If deployment fails:
1. Check platform status pages
2. Review build/deployment logs
3. Verify all environment variables
4. Test locally with production build

Happy Deploying! 🚀
