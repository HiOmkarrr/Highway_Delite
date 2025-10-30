# Highway Delite - Travel Experiences Booking Platform

A fullstack web application for browsing and booking curated travel experiences with real-time slot availability.

## 🚀 Features

- Browse curated travel experiences
- View detailed information with available dates and time slots
- Real-time slot availability checking
- Quantity selection with automatic price calculation
- Promo code validation (SAVE10, FLAT100)
- Complete booking flow with confirmation
- Responsive design (mobile & desktop)
- MongoDB database for persistent storage

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (Build tool)
- TailwindCSS (Styling)
- Axios (API calls)
- React Router (Navigation)

### Backend
- Node.js with Express
- MongoDB (Database)
- Mongoose (ODM)
- CORS enabled
- Express Validator

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## ⚙️ Environment Variables

Create `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/highway-delite
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/highway-delite
NODE_ENV=development
```

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd Highway_Delite
```

### 2. Install all dependencies
```bash
npm run install-all
```

Or install manually:
```bash
# Root dependencies
npm install

# Client dependencies
cd client
npm install

# Server dependencies
cd ../server
npm install
```

### 3. Setup MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- Use connection string: `mongodb://localhost:27017/highway-delite`

**Option B: MongoDB Atlas (Recommended)**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a new cluster
- Get connection string
- Update `.env` file with your connection string

### 4. Seed Database (Optional)
```bash
cd server
npm run seed
```

### 5. Run the application

**Development mode (both frontend and backend):**
```bash
npm run dev
```

**Or run separately:**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### 6. Access the application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
Highway_Delite/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   └── package.json
├── server/                # Backend Express app
│   ├── src/
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Custom middleware
│   │   └── server.ts
│   ├── .env
│   └── package.json
└── package.json          # Root package.json

```

## 🌐 API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience by ID

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking details

### Promo Codes
- `POST /api/promo/validate` - Validate promo code

## 💳 Available Promo Codes

- `SAVE10` - 10% discount
- `FLAT100` - ₹100 flat discount

## 🎨 Design

The UI design is based on the Figma specifications with:
- Clean, modern interface
- Responsive layout (mobile-first)
- Yellow accent color (#FFD700)
- Consistent spacing and typography

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy dist folder to Vercel
```

### Backend (Render/Railway)
- Set environment variables in platform
- Deploy from GitHub repository
- Update MONGODB_URI for production

### Full Stack (Railway)
- Can deploy both frontend and backend together
- Configure build and start commands

## 🧪 Testing

Test the complete flow:
1. Browse experiences on home page
2. Click "View Details" on any experience
3. Select date and time slot
4. Adjust quantity
5. Click "Confirm"
6. Fill checkout form
7. Apply promo code (optional)
8. Complete booking
9. View confirmation

## 📝 Notes

- All times are in IST (GMT +5:30)
- Taxes are calculated at 6% of subtotal
- Slot availability is checked in real-time
- Double-booking prevention is implemented

## 🤝 Contributing

This is an assignment project for Highway Delite internship.

## 📄 License

MIT


> **Developed by:** Omkar ([@HiOmkarrr](https://github.com/HiOmkarrr))  
> **Purpose:** Internship Application Project  
> **Date:** October 2025  
> **Copyright:** © 2025 Omkar. All rights reserved.