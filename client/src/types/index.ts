export interface Slot {
  time: string;
  available: number;
  soldOut: boolean;
}

export interface Experience {
  _id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  price: number;
  tags: string[];
  availableDates: string[];
  slots: Slot[];
  about: string;
  minAge?: number;
  included: string[];
}

export interface BookingRequest {
  experienceId: string;
  date: string;
  time: string;
  quantity: number;
  fullName: string;
  email: string;
  promoCode?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data: {
    bookingRef: string;
    experienceName: string;
    date: string;
    time: string;
    quantity: number;
    total: number;
  };
}

export interface PromoCodeRequest {
  code: string;
  subtotal: number;
}

export interface PromoCodeResponse {
  success: boolean;
  message: string;
  data?: {
    code: string;
    type: 'percentage' | 'flat';
    value: number;
    discount: number;
  };
}
