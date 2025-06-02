import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { FlightSearch } from './pages/FlightSearch';
import { FlightDetails } from './pages/FlightDetails';
import BookingForm from './pages/BookingForm';
import Payment from './pages/Payment';
import Ticket from './pages/Ticket';
import MyBookings from './pages/MyBookings';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<FlightSearch />} />
            <Route path="/flights/:flightId" element={<FlightDetails />} />
            <Route path="/booking/:flightId" element={<BookingForm />} />
            <Route path="/payment/:bookingId" element={<Payment />} />
            <Route path="/ticket/:bookingId" element={<Ticket />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App; 