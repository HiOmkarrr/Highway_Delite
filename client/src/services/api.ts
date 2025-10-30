import axios from 'axios';
import { Experience, BookingRequest, BookingResponse, PromoCodeRequest, PromoCodeResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
