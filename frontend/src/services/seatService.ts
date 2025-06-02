import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export interface Seat {
  id: string;
  number: string;
  class: 'economy' | 'business' | 'first';
  status: 'available' | 'occupied' | 'selected';
  price: number;
}

export const seatService = {
  // Lấy danh sách ghế của một chuyến bay
  async getFlightSeats(flightId: string): Promise<Seat[]> {
    const response = await axios.get(`${API_URL}/flights/${flightId}/seats`);
    return response.data;
  },

  // Đặt ghế
  async reserveSeat(flightId: string, seatId: string): Promise<void> {
    await axios.post(`${API_URL}/flights/${flightId}/seats/${seatId}/reserve`);
  },

  // Hủy đặt ghế
  async cancelSeatReservation(flightId: string, seatId: string): Promise<void> {
    await axios.post(`${API_URL}/flights/${flightId}/seats/${seatId}/cancel`);
  },

  // Kiểm tra tình trạng ghế
  async checkSeatStatus(flightId: string, seatId: string): Promise<Seat> {
    const response = await axios.get(`${API_URL}/flights/${flightId}/seats/${seatId}`);
    return response.data;
  },

  // Lấy giá ghế
  async getSeatPrice(flightId: string, seatId: string): Promise<number> {
    const response = await axios.get(`${API_URL}/flights/${flightId}/seats/${seatId}/price`);
    return response.data.price;
  }
}; 