import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { experienceService } from '../services/api';
import { Experience } from '../types';
import Header from '../components/Header';

const ExperienceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchExperience();
    }
  }, [id]);

  const fetchExperience = async () => {
    try {
      if (!id) return;
      setLoading(true);
      const data = await experienceService.getById(id);
      setExperience(data);
      
      // Set default date
      if (data.availableDates.length > 0) {
        setSelectedDate(data.availableDates[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }
    
    navigate('/checkout', {
      state: {
        experienceId: experience?._id,
        experienceName: experience?.title,
        date: selectedDate,
        time: selectedTime,
        quantity,
        price: experience?.price || 0
      }
    });
  };

  const subtotal = (experience?.price || 0) * quantity;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-12">
          <p className="text-gray-600">Experience not found</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-96 object-cover rounded-lg mb-6"
            />
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{experience.title}</h1>
            <p className="text-gray-600 mb-6">{experience.description}</p>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Choose date</h2>
              <div className="flex gap-2 flex-wrap">
                {experience.availableDates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedDate === date
                        ? 'bg-primary border-primary text-black'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-primary'
                    }`}
                  >
                    {formatDate(date)}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Choose time</h2>
              <p className="text-sm text-gray-500 mb-4">All times are in IST (GMT +5:30)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {experience.slots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => !slot.soldOut && setSelectedTime(slot.time)}
                    disabled={slot.soldOut}
                    className={`p-3 rounded-lg border text-center ${
                      slot.soldOut
                        ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                        : selectedTime === slot.time
                        ? 'bg-primary border-primary text-black'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-primary'
                    }`}
                  >
                    <div className="font-semibold">{slot.time}</div>
                    <div className="text-xs">
                      {slot.soldOut ? (
                        <span className="text-red-500">Sold out</span>
                      ) : (
                        <span className="text-green-600">{slot.available} left</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-700">{experience.about}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <div className="mb-4">
                <p className="text-sm text-gray-500">Starts at</p>
                <p className="text-2xl font-bold">₹{experience.price}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-2">Quantity</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-semibold">₹{taxes}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full py-3 bg-primary text-black font-semibold rounded-lg hover:bg-yellow-500 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!selectedDate || !selectedTime}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExperienceDetails;
