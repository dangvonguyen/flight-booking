export interface Airport {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
}

export interface Booking {
  id: string;
  flight: Flight;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  seatNumber?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  booking: Booking;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  booking: Booking;
  ticketNumber: string;
  qrCode: string;
  status: 'active' | 'used' | 'cancelled';
  createdAt: string;
}

export interface SearchFlightParams {
  from: string;
  to: string;
  date: string;
}

export interface CreateBookingParams {
  flightId: string;
  passengerName: string;
  email: string;
  phone: string;
  seatNumber: string;
}

export interface FlightSearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: 'economy' | 'business' | 'first';
}

export interface FlightSearchResult {
  outboundFlights: Flight[];
  returnFlights?: Flight[];
  filters: {
    airlines: string[];
    priceRange: {
      min: number;
      max: number;
    };
    departureTimeRange: {
      earliest: string;
      latest: string;
    };
  };
} 