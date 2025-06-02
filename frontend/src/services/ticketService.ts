import axios from 'axios';
import type { TicketDetails, Ticket } from '../types/ticket';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const ticketService = {
  async getTicketDetails(bookingId: string): Promise<{ data: TicketDetails }> {
    const response = await axios.get(`${API_URL}/tickets/${bookingId}`);
    return response;
  },

  async getAllTickets(): Promise<{ data: Ticket[] }> {
    const response = await axios.get(`${API_URL}/tickets`);
    return response;
  },

  async downloadTicketPDF(bookingId: string): Promise<Blob> {
    const response = await axios.get(`${API_URL}/tickets/${bookingId}/pdf`, {
      responseType: 'blob'
    });
    return response.data;
  },

  async cancelTicket(bookingId: string): Promise<void> {
    await axios.post(`${API_URL}/tickets/${bookingId}/cancel`);
  }
}; 