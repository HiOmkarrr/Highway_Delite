import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Confirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingRef } = location.state || {};

  if (!bookingRef) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Confirmed
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Ref ID: <span className="font-semibold text-gray-900">{bookingRef}</span>
          </p>

          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default Confirmation;
