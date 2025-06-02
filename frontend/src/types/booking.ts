import type { Flight } from './flight';

export interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
  dateOfBirth?: string;
}

export interface BookingDetails {
  id: string;
  flight: Flight;
  passenger: PassengerInfo;
  seatNumber?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookingFormData {
  flightId: string;
  passenger: PassengerInfo;
  seatPreference?: 'window' | 'aisle' | 'middle';
  specialRequests?: string[];
}

export interface BookingResponse {
  bookingId: string;
  status: 'success' | 'error';
  message?: string;
  paymentUrl?: string;
} 