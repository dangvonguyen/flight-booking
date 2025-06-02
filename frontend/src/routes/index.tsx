import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AuthGuard } from '../components/AuthGuard';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import { FlightSearch } from '../pages/FlightSearch';
import { FlightDetails } from '../pages/FlightDetails';
import BookingForm from '../pages/BookingForm';
import Payment from '../pages/Payment';
import TicketView from '../pages/Ticket';
import MyBookings from '../pages/MyBookings';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<FlightSearch />} />
        <Route path="/flights/:flightId" element={<FlightDetails />} />
        
        {/* Protected routes */}
        <Route element={<AuthGuard />}>
          <Route path="/booking/:flightId" element={<BookingForm />} />
          <Route path="/payment/:bookingId" element={<Payment />} />
          <Route path="/ticket/:ticketId" element={<TicketView />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>
      </Route>
    </Routes>
  );
}; 