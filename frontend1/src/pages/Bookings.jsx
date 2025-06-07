import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import BookingDetail from '../components/booking/BookingDetail'

// Mock data cho danh sách đặt vé
const mockBookings = [
  {
    id: 1,
    bookingCode: 'BK123456789',
    flight: {
      from: { city: 'Hà Nội', code: 'HAN' },
      to: { city: 'TP. Hồ Chí Minh', code: 'SGN' },
      airline: 'Vietnam Airlines',
      flightNumber: 'VN123',
      departureTime: '2024-03-25T08:00:00',
      duration: '2h 15m',
      seatClass: 'Economy'
    },
    passenger: {
      firstName: 'Văn A',
      lastName: 'Nguyễn',
      email: 'nguyenvana@example.com',
      phone: '0123456789'
    },
    seat: {
      number: '12A',
      price: 100000
    },
    paymentMethod: 'Credit Card',
    totalAmount: 2600000,
    status: 'confirmed',
    createdAt: '2024-03-15T10:00:00'
  },
  {
    id: 2,
    bookingCode: 'BK987654321',
    flight: {
      from: { city: 'TP. Hồ Chí Minh', code: 'SGN' },
      to: { city: 'Đà Nẵng', code: 'DAD' },
      airline: 'Jetstar',
      flightNumber: 'BL456',
      departureTime: '2024-03-20T14:00:00',
      duration: '1h 15m',
      seatClass: 'Business'
    },
    passenger: {
      firstName: 'Thị B',
      lastName: 'Trần',
      email: 'tranthib@example.com',
      phone: '0987654321'
    },
    seat: {
      number: '5C',
      price: 200000
    },
    paymentMethod: 'VNPay',
    totalAmount: 3700000,
    status: 'confirmed',
    createdAt: '2024-03-16T15:30:00'
  },
  {
    id: 3,
    bookingCode: 'BK555444333',
    flight: {
      from: { city: 'Đà Nẵng', code: 'DAD' },
      to: { city: 'Hà Nội', code: 'HAN' },
      airline: 'VietJet Air',
      flightNumber: 'VJ789',
      departureTime: '2024-02-15T16:30:00',
      duration: '1h 25m',
      seatClass: 'Economy'
    },
    passenger: {
      firstName: 'Văn C',
      lastName: 'Lê',
      email: 'levanc@example.com',
      phone: '0912345678'
    },
    seat: {
      number: '8B',
      price: 50000
    },
    paymentMethod: 'MoMo',
    totalAmount: 1850000,
    status: 'confirmed',
    createdAt: '2024-02-10T09:15:00'
  }
]

export default function Bookings() {
  const navigate = useNavigate()
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [filter, setFilter] = useState('all') // all, upcoming, past

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Đã xác nhận'
      case 'cancelled': return 'Đã hủy'
      case 'pending': return 'Chờ xác nhận'
      default: return 'Không xác định'
    }
  }

  const filteredBookings = mockBookings.filter(booking => {
    const departureDate = new Date(booking.flight.departureTime)
    const now = new Date()
    
    if (filter === 'upcoming') {
      return departureDate > now
    }
    if (filter === 'past') {
      return departureDate < now
    }
    return true
  })

  const upcomingCount = mockBookings.filter(b => new Date(b.flight.departureTime) > new Date()).length
  const pastCount = mockBookings.filter(b => new Date(b.flight.departureTime) < new Date()).length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Lịch sử đặt vé
              </h1>
              <p className="text-gray-600">
                Quản lý và theo dõi các chuyến bay đã đặt
              </p>
            </div>
            <Button 
              onClick={() => navigate('/')}
              variant="primary"
            >
              Đặt vé mới
            </Button>
          </div>


          
          {/* Filter */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Lọc theo trạng thái</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                📋 Tất cả ({mockBookings.length})
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  filter === 'upcoming'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                ✈️ Sắp tới ({upcomingCount})
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  filter === 'past'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                ✅ Đã bay ({pastCount})
              </button>
            </div>
          </div>

          {/* Booking list */}
          <div className="space-y-4">
            {filteredBookings.map(booking => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                <Card.Body>
                  <div className="flex justify-between items-start">
                    {/* Flight info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Điểm đi</p>
                          <p className="text-xl font-semibold">{booking.flight.from.code}</p>
                          <p className="text-sm text-gray-600">{booking.flight.from.city}</p>
                        </div>
                        
                        <div className="flex-1 px-4">
                          <div className="flex items-center">
                            <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                            <div className="mx-2 p-2 bg-primary-100 rounded-full">
                              <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                            <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                          </div>
                          <p className="text-center text-sm text-gray-600 mt-1 font-medium">
                            {booking.flight.duration}
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Điểm đến</p>
                          <p className="text-xl font-semibold">{booking.flight.to.code}</p>
                          <p className="text-sm text-gray-600">{booking.flight.to.city}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Chuyến bay</p>
                          <p className="font-semibold">{booking.flight.flightNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Ngày bay</p>
                          <p className="font-semibold">
                            {new Date(booking.flight.departureTime).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Ghế</p>
                          <p className="font-semibold">{booking.seat.number}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Tổng tiền</p>
                          <p className="font-semibold text-primary-600">
                            {booking.totalAmount.toLocaleString('vi-VN')}đ
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="ml-6 text-right space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Mã đặt vé</p>
                        <p className="font-mono font-semibold">{booking.bookingCode}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedBooking(booking)}
                          className="w-full"
                        >
                          Xem chi tiết
                        </Button>

                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}

            {filteredBookings.length === 0 && (
              <Card>
                <Card.Body className="text-center py-8">
                  <p className="text-gray-600">
                    Không tìm thấy đặt vé nào
                  </p>
                  <Button 
                    onClick={() => navigate('/')}
                    className="mt-4"
                  >
                    Đặt vé ngay
                  </Button>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Modal chi tiết đặt vé */}
      {selectedBooking && (
        <BookingDetail
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  )
} 