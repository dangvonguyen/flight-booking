import { FaUser, FaTicketAlt, FaCommentDots, FaMoneyBillWave } from 'react-icons/fa'

const stats = [
  {
    label: 'Tổng người dùng',
    value: '1,234',
    icon: <FaUser className="text-blue-500 text-3xl" />, bg: 'bg-blue-50',
  },
  {
    label: 'Tổng vé bán',
    value: '2,567',
    icon: <FaTicketAlt className="text-purple-500 text-3xl" />, bg: 'bg-purple-50',
  },
  {
    label: 'Doanh thu',
    value: '1,200,000,000đ',
    icon: <FaMoneyBillWave className="text-green-500 text-3xl" />, bg: 'bg-green-50',
  },
  {
    label: 'Khiếu nại mới',
    value: '12',
    icon: <FaCommentDots className="text-red-500 text-3xl" />, bg: 'bg-red-50',
  },
]

export default function Overview() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-primary-700">Thống kê tổng quan</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-2xl shadow-lg p-6 flex items-center gap-4 ${stat.bg}`}>
            <div className="flex-shrink-0">{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-gray-500 mt-1 font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 