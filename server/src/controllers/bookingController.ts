import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Experience from '../models/Experience';
import PromoCode from '../models/PromoCode';

// Generate unique booking reference
const generateBookingRef = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ref = '';
  for (let i = 0; i < 8; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      experienceId,
      date,
      time,
      quantity,
      fullName,
      email,
      promoCode
    } = req.body;

    // Validate required fields
    if (!experienceId || !date || !time || !quantity || !fullName || !email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Get experience details
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    // Check slot availability
    const slot = experience.slots.find(s => s.time === time);
    if (!slot) {
      return res.status(400).json({
        success: false,
        message: 'Invalid time slot'
      });
    }

    if (slot.soldOut || slot.available < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough slots available'
      });
    }

    // Calculate pricing
    const subtotal = experience.price * quantity;
    const taxRate = 0.06; // 6%
    const taxes = Math.round(subtotal * taxRate);
    let discount = 0;

    // Apply promo code if provided
    if (promoCode) {
      const promo = await PromoCode.findOne({ 
        code: promoCode.toUpperCase(), 
        active: true 
      });
      
      if (promo) {
        if (promo.type === 'percentage') {
          discount = Math.round(subtotal * (promo.value / 100));
        } else {
          discount = promo.value;
        }
      }
    }

    const total = subtotal + taxes - discount;

    // Generate booking reference
    const bookingRef = generateBookingRef();

    // Create booking
    const booking = new Booking({
      experienceId,
      experienceName: experience.title,
      date: new Date(date),
      time,
      quantity,
      fullName,
      email,
      promoCode: promoCode?.toUpperCase(),
      subtotal,
      taxes,
      discount,
      total,
      bookingRef,
      status: 'confirmed'
    });

    await booking.save();

    // Update slot availability
    slot.available -= quantity;
    if (slot.available === 0) {
      slot.soldOut = true;
    }
    await experience.save();

    res.status(201).json({
      success: true,
      message: 'Booking confirmed',
      data: {
        bookingRef,
        experienceName: experience.title,
        date,
        time,
        quantity,
        total
      }
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({ bookingRef: id })
      .populate('experienceId')
      .select('-__v');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
};
