import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookingService, promoService } from '../services/api';
import Header from '../components/Header';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);

  if (!bookingData) {
    navigate('/');
    return null;
  }

  const subtotal = bookingData.price * bookingData.quantity;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes - discount;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      alert('Please enter a promo code');
      return;
    }

    try {
      const result = await promoService.validate({ code: promoCode, subtotal });
      if (result.success && result.data) {
        setDiscount(result.data.discount);
        setPromoApplied(true);
        alert(result.message);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Invalid promo code');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email) {
      alert('Please fill all required fields');
      return;
    }

    if (!agreed) {
      alert('Please agree to terms and safety policy');
      return;
    }

    try {
      setLoading(true);
      const result = await bookingService.create({
        experienceId: bookingData.experienceId,
        date: bookingData.date,
        time: bookingData.time,
        quantity: bookingData.quantity,
        fullName,
        email,
        promoCode: promoApplied ? promoCode : undefined
      });

      if (result.success) {
        navigate('/confirmation', { state: { bookingRef: result.data.bookingRef } });
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Checkout
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={promoApplied}
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={promoApplied}
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 mr-3"
                />
                <label className="text-sm text-gray-600">
                  I agree to the terms and safety policy
                </label>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="mb-4">
                <p className="text-sm text-gray-600">Experience</p>
                <p className="font-semibold text-gray-900">{bookingData.experienceName}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold text-gray-900">{formatDate(bookingData.date)}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-semibold text-gray-900">{bookingData.time}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600">Qty</p>
                <p className="font-semibold text-gray-900">{bookingData.quantity}</p>
              </div>

              <div className="border-t border-gray-300 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-semibold">₹{taxes}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !agreed}
                className="w-full py-3 bg-primary text-black font-semibold rounded-lg hover:bg-yellow-500 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Pay and Confirm'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
