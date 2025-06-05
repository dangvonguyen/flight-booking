import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
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
import Dashboard from './pages/admin/Dashboard'
import AdminLayout from './pages/admin/AdminLayout'
import Overview from './pages/admin/Overview'
import UserManagement from './pages/admin/UserManagement'
import FeedbackManagement from './pages/admin/FeedbackManagement'
import TicketLookup from './pages/admin/TicketLookup'
import SearchResults from './pages/SearchResults'
import DestinationDetail from './pages/DestinationDetail'
import AllDestinations from './pages/AllDestinations'
import UsersManagement from './pages/UsersManagement'
import Profile from './pages/Profile'
import { useAuth } from './hooks/useAuth'

function AppContent() {
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Chỉ render Navbar nếu không phải admin hoặc không ở route admin */}
      {!(isAdmin && isAdminRoute) && <Navbar />}
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

          {/* Protected routes - User */}
          <Route path="/book" element={<ProtectedRoute><Book /></ProtectedRoute>} />
          {/* Temporary: Remove protection for payment routes for testing */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-process" element={<PaymentProcess />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute requiredRole="admin"><UsersManagement /></ProtectedRoute>} />

          {/* Protected routes - Admin */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
            <Route path="overview" element={<Overview />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="feedbacks" element={<FeedbackManagement />} />
            <Route path="tickets" element={<TicketLookup />} />
            <Route index element={<Overview />} />
          </Route>

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
