import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

interface PaymentDetails {
  amount: number;
  bookingId: string;
  flightInfo: {
    from: string;
    to: string;
    date: string;
    time: string;
  };
}

interface VNPayResponse {
  paymentUrl: string;
}

interface PaymentVerificationResult {
  status: 'success' | 'failed';
  message: string;
  transactionId?: string;
}

export const paymentService = {
  async getPaymentDetails(bookingId: string): Promise<{ data: PaymentDetails }> {
    const response = await axios.get(`${API_URL}/payments/${bookingId}`);
    return response;
  },

  async createVNPayPayment(bookingId: string): Promise<{ data: VNPayResponse }> {
    const response = await axios.post(`${API_URL}/payments/vnpay/create`, {
      bookingId
    });
    return response;
  },

  async verifyVNPayPayment(params: Record<string, string>): Promise<PaymentVerificationResult> {
    const response = await axios.post(`${API_URL}/payments/vnpay/verify`, params);
    return response.data;
  }
}; 