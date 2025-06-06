import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Book from './pages/Book'
import Payment from './pages/Payment'
import PaymentProcess from './pages/PaymentProcess'
import PaymentSuccess from './pages/PaymentSuccess'
import Bookings from './pages/Bookings'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Contact from './pages/Contact'
import SearchResults from './pages/SearchResults'
import DestinationDetail from './pages/DestinationDetail'
import AllDestinations from './pages/AllDestinations'
import Profile from './pages/Profile'
import TicketLookup from './pages/TicketLookup'

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
          <Route path="/destinations" element={<AllDestinations />} />
          <Route path="/ticket-lookup" element={<TicketLookup />} />

          {/* Protected routes - User */}
          <Route path="/book" element={<ProtectedRoute><Book /></ProtectedRoute>} />
          {/* Temporary: Remove protection for payment routes for testing */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-process" element={<PaymentProcess />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* New route */}
          <Route path="/search-results" element={<SearchResults />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App
