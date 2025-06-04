import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../ui/Button'

export default function Navbar() {
  const { user, role, logout } = useAuth()

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xl font-semibold text-gray-900">Flight Booking</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/search" className="text-gray-600 hover:text-gray-900">
              Tìm chuyến bay
            </Link>
            {user && (
              <Link to="/bookings" className="text-gray-600 hover:text-gray-900">
                Lịch sử đặt vé
              </Link>
            )}
            {role === 'admin' && (
              <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                Quản lý
              </Link>
            )}
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              Giới thiệu
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              Liên hệ
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Xin chào, {user.firstName}
                </span>
                <Button variant="outline" onClick={logout}>
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Đăng nhập</Button>
                </Link>
                <Link to="/register">
                  <Button>Đăng ký</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 