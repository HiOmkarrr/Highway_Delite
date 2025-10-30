import axios from 'axios';
import { Experience, BookingRequest, BookingResponse, PromoCodeRequest, PromoCodeResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log('API Base URL:', API_BASE_URL); // This will help debug

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      // Server responded with error status
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
      // Request made but no response
      console.error('No response received:', error.request);
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something else happened
      console.error('Error setting up request:', error.message);
      throw new Error(error.message);
    }
  }
);

export const experienceService = {
  getAll: async (): Promise<Experience[]> => {
    const response = await api.get('/experiences');
    return response.data.data;
  },

  getById: async (id: string): Promise<Experience> => {
    const response = await api.get(`/experiences/${id}`);
    return response.data.data;
  },
};

export const bookingService = {
  create: async (booking: BookingRequest): Promise<BookingResponse> => {
    const response = await api.post('/bookings', booking);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
};

export const promoService = {
  validate: async (promo: PromoCodeRequest): Promise<PromoCodeResponse> => {
    const response = await api.post('/promo/validate', promo);
    return response.data;
  },
};

export default api;
