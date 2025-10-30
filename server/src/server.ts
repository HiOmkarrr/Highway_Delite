/**
 * Highway Delite - Travel Experiences Booking Platform
 * Copyright (c) 2025 Omkar (HiOmkarrr)
 * 
 * This software was developed as part of an internship application.
 * All rights reserved. Unauthorized use, reproduction, or distribution 
 * of this code without express written permission is strictly prohibited.
 * 
 * Author: Omkar
 * GitHub: @HiOmkarrr
 * Created: October 2025
 */

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import experienceRoutes from './routes/experiences';
import bookingRoutes from './routes/bookings';
import promoRoutes from './routes/promo';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://daring-peace-production.up.railway.app',
      'https://highway-delite-pi.vercel.app'
    ];
    
    // Check if origin is in allowed list or matches pattern
    const isAllowed = allowedOrigins.includes(origin) || 
                      origin.endsWith('.railway.app') || 
                      origin.endsWith('.vercel.app');
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/experiences', experienceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/promo', promoRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/highway-delite';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 API: http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

export default app;
