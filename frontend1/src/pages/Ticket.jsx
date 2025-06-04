import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Mock data for tickets
const mockTickets = {
  'BK001': {
    id: 'BK001',
    flight: {
      airline: 'Vietnam Airlines',
      flightNumber: 'VN123',
      departure: {
        city: 'Hà Nội',
        time: '08:00',
        date: '2024-03-15'
      },
      arrival: {
        city: 'TP. Hồ Chí Minh',
        time: '10:00',
        date: '2024-03-15'
      }
    },
    passenger: {
      firstName: 'Nguyễn',
      lastName: 'Văn A',
      email: 'nguyenvana@example.com',
      phone: '0123456789'
    },
    seatClass: 'economy',
    seatNumber: '15A',
    status: 'confirmed',
    bookingDate: '2024-03-15',
    price: 1500000,
    baggage: {
      checkIn: '30 kg',
      cabin: '7 kg'
    }
  },
  'BK002': {
    id: 'BK002',
    flight: {
      airline: 'Bamboo Airways',
      flightNumber: 'QH456',
      departure: {
        city: 'TP. Hồ Chí Minh',
        time: '14:30',
        date: '2024-03-20'
      },
      arrival: {
        city: 'Đà Nẵng',
        time: '15:45',
        date: '2024-03-20'
      }
    },
    passenger: {
      firstName: 'Nguyễn',
      lastName: 'Văn A',
      email: 'nguyenvana@example.com',
      phone: '0123456789'
    },
    seatClass: 'business',
    seatNumber: '5B',
    status: 'pending',
    bookingDate: '2024-03-20',
    price: 2500000,
    baggage: {
      checkIn: '40 kg',
      cabin: '10 kg'
    }
  }
}

export default function Ticket() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTicket(mockTickets[id])
      setLoading(false)
    }, 1000)
  }, [id])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận'
      case 'pending':
        return 'Đang chờ xác nhận'
      case 'cancelled':
        return 'Đã hủy'
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Không tìm thấy thông tin vé</h2>
          <p className="mt-2 text-gray-600">Vui lòng kiểm tra lại mã đặt vé</p>
          <button
            onClick={() => navigate('/bookings')}
            className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          >
            Quay lại danh sách đặt vé
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Ticket Header */}
          <div className="bg-primary-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {ticket.flight.airline}
                </h2>
                <p className="text-primary-100">{ticket.flight.flightNumber}</p>
              </div>
              <div className="text-right">
                <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold leading-5 ${getStatusColor(ticket.status)}`}>
                  {getStatusText(ticket.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">{ticket.flight.departure.time}</p>
                <p className="text-gray-600">{ticket.flight.departure.city}</p>
                <p className="text-sm text-gray-500">{formatDate(ticket.flight.departure.date)}</p>
              </div>
              <div className="flex-1 px-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-gray-500">→</span>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">
                  {ticket.flight.arrival.time - ticket.flight.departure.time}
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">{ticket.flight.arrival.time}</p>
                <p className="text-gray-600">{ticket.flight.arrival.city}</p>
                <p className="text-sm text-gray-500">{formatDate(ticket.flight.arrival.date)}</p>
              </div>
            </div>
          </div>

          {/* Passenger Information */}
          <div className="border-t border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin hành khách</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Họ và tên</p>
                <p className="text-gray-900">{ticket.passenger.firstName} {ticket.passenger.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{ticket.passenger.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Số điện thoại</p>
                <p className="text-gray-900">{ticket.passenger.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ghế</p>
                <p className="text-gray-900">{ticket.seatNumber}</p>
              </div>
            </div>
          </div>

          {/* Baggage Information */}
          <div className="border-t border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin hành lý</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Hành lý ký gửi</p>
                <p className="text-gray-900">{ticket.baggage.checkIn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hành lý xách tay</p>
                <p className="text-gray-900">{ticket.baggage.cabin}</p>
              </div>
            </div>
          </div>

          {/* Booking Information */}
          <div className="border-t border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin đặt vé</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Mã đặt vé</p>
                <p className="text-gray-900">{ticket.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ngày đặt</p>
                <p className="text-gray-900">{formatDate(ticket.bookingDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hạng vé</p>
                <p className="text-gray-900">
                  {ticket.seatClass === 'economy' ? 'Phổ thông' :
                   ticket.seatClass === 'business' ? 'Thương gia' : 'Hạng nhất'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Giá vé</p>
                <p className="text-gray-900">{formatPrice(ticket.price)}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                In vé
              </button>
              <button
                onClick={() => navigate('/bookings')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Quay lại danh sách đặt vé
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 