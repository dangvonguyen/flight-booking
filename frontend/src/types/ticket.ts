export interface TicketDetails {
  bookingId: string;
  passengerName: string;
  flightNumber: string;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  gate: string;
  seat: string;
  barcode: string;
}

export interface Ticket {
  id: string;
  bookingId: string;
  status: 'active' | 'cancelled' | 'used';
  createdAt: string;
  updatedAt: string;
  details: TicketDetails;
} 