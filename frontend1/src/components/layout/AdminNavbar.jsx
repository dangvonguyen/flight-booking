import { NavLink, useNavigate } from 'react-router-dom'
import { FaUser, FaTicketAlt, FaCommentDots, FaChartBar, FaUserCircle } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'

const navs = [
  { to: '/admin/overview', label: 'Thống kê', icon: <FaChartBar size={20} /> },
  { to: '/admin/users', label: 'Quản lý người dùng', icon: <FaUser size={20} /> },
  { to: '/admin/tickets', label: 'Quản lý vé', icon: <FaTicketAlt size={20} /> },
  { to: '/admin/feedbacks', label: 'Quản lý khiếu nại, góp ý', icon: <FaCommentDots size={20} /> },
]

export default function AdminNavbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary-50 to-blue-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white/90 shadow-2xl rounded-r-3xl flex flex-col py-8 px-4 border-r border-gray-100 min-h-screen">
        {/* Logo */}
        <div className="mb-12 flex items-center space-x-3 px-2">
          <span className="text-3xl font-extrabold text-primary-700 tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">✈️</span>
          <span className="text-2xl font-extrabold text-primary-700 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">FlightBooking</span>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navs.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-primary-700 border-l-4 border-primary-600 shadow-lg'
                    : 'text-gray-600 hover:text-primary-700 hover:bg-primary-50'
                }`
              }
            >
              <span className="mr-4 text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      {/* Topbar + Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white/90 shadow flex items-center justify-end px-10 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 flex items-center justify-center">
              <FaUserCircle className="text-white text-2xl" />
            </div>
            <span className="font-semibold text-gray-700 text-base">{user?.firstName || 'Admin'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="ml-4 px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold shadow-lg transition"
          >
            Đăng xuất
          </button>
        </header>
        {/* Nội dung trang sẽ nằm ở Outlet của layout */}
      </div>
    </div>
  )
} 