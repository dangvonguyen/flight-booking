import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActiveLink = (path: string) => {
    return location.pathname.startsWith(path) ? 'bg-primary/10' : '';
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">Flight Booking</span>
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {/* Menu chung cho mọi user */}
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary/5 ${isActiveLink('/dashboard')}`}
              >
                Dashboard
              </Link>

              {/* Menu cho admin */}
              {user?.role === 'admin' && (
                <>
                  <Link
                    to="/admin/users"
                    className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary/5 ${isActiveLink('/admin/users')}`}
                  >
                    Quản lý người dùng
                  </Link>
                  <Link
                    to="/admin/statistics"
                    className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary/5 ${isActiveLink('/admin/statistics')}`}
                  >
                    Thống kê
                  </Link>
                </>
              )}

              {/* Menu cho staff */}
              {(user?.role === 'admin' || user?.role === 'staff') && (
                <Link
                  to="/staff/bookings"
                  className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary/5 ${isActiveLink('/staff/bookings')}`}
                >
                  Quản lý đặt vé
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-gray-700 mr-4">
              Xin chào, {user?.firstName}
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}; 