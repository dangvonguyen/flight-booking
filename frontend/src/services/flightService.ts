import { api } from './api';
import type { Airport, Flight, SearchFlightParams } from '../types/flight';
import type { BookingResponse } from '../types/booking';
import type { Ticket } from '../types/ticket';

export const flightService = {
  // Lấy danh sách sân bay
  getAirports: async (): Promise<Airport[]> => {
    const response = await api.get('/airports');
    return response.data;
  },

  // Tìm kiếm chuyến bay
  searchFlights: async (params: SearchFlightParams): Promise<Flight[]> => {
    const response = await api.get('/flights/search', { params });
    return response.data;
  },

  // Chi tiết chuyến bay
  getFlightDetails: async (flightId: string): Promise<Flight> => {
    const response = await api.get(`/flights/${flightId}`);
    return response.data;
  },

  // Lấy danh sách đặt vé của user
  getMyBookings: async (): Promise<BookingResponse[]> => {
    const response = await api.get('/bookings/me');
    return response.data;
  },

  // Lấy thông tin booking
  getBookingDetails: async (bookingId: string): Promise<BookingResponse> => {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data;
  },

  // Đặt vé
  createBooking: async (flightId: string, passengerInfo: any): Promise<BookingResponse> => {
    const response = await api.post('/bookings', {
      flightId,
      ...passengerInfo
    });
    return response.data;
  },

  // Hủy đặt vé
  cancelBooking: async (id: string): Promise<void> => {
    await api.post(`/bookings/${id}/cancel`, {});
  },

  // Thanh toán
  createPayment: async (bookingId: string): Promise<void> => {
    await api.post('/payments', { bookingId });
  },

  // Lấy thông tin vé
  getTicketDetails: async (ticketId: string): Promise<Ticket> => {
    const response = await api.get(`/tickets/${ticketId}`);
    return response.data;
  },

  // Tải vé PDF
  downloadTicket: async (id: string): Promise<Blob> => {
    const response = await api.get(`/tickets/${id}/download`, {
      responseType: 'blob'
    });
    return response.data;
  },

  async getAvailableSeats(flightId: string): Promise<string[]> {
    const response = await api.get(`/flights/${flightId}/seats`);
    return response.data;
  }
}; 