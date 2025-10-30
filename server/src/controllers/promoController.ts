import { Request, Response } from 'express';
import PromoCode from '../models/PromoCode';

export const validatePromoCode = async (req: Request, res: Response) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Promo code is required'
      });
    }

    const promo = await PromoCode.findOne({ 
      code: code.toUpperCase(), 
      active: true 
    });

    if (!promo) {
      return res.status(404).json({
        success: false,
        message: 'Invalid promo code'
      });
    }

    // Check minimum purchase requirement
    if (promo.minPurchase && subtotal < promo.minPurchase) {
      return res.status(400).json({
        success: false,
        message: `Minimum purchase of ₹${promo.minPurchase} required`
      });
    }

    // Calculate discount
    let discount = 0;
    if (promo.type === 'percentage') {
      discount = Math.round(subtotal * (promo.value / 100));
    } else {
      discount = promo.value;
    }

    res.json({
      success: true,
      message: 'Promo code applied successfully',
      data: {
        code: promo.code,
        type: promo.type,
        value: promo.value,
        discount
      }
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error validating promo code',
      error: error.message
    });
  }
};
