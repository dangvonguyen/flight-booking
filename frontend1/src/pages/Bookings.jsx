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
      to: { city: 'Hồ Chí Minh', code: 'SGN' },
      airline: 'Vietnam Airlines',
      flightNumber: 'VN123',
      departureTime: '2024-03-20T08:00:00',
      duration: '2h 00m',
      seatClass: 'Economy'
    },
    passenger: {
      firstName: 'Nguyễn',
      lastName: 'Văn A',
      email: 'nguyenvana@example.com',
      phone: '0123456789'
    },
    seat: {
      number: '12A',
      price: 500000
    },
    paymentMethod: 'Credit Card',
    totalAmount: 2500000,
    status: 'confirmed',
    createdAt: '2024-03-15T10:00:00'
  },
  {
    id: 2,
    bookingCode: 'BK987654321',
    flight: {
      from: { city: 'Hồ Chí Minh', code: 'SGN' },
      to: { city: 'Đà Nẵng', code: 'DAD' },
      airline: 'Vietnam Airlines',
      flightNumber: 'VN456',
      departureTime: '2024-03-25T14:00:00',
      duration: '1h 15m',
      seatClass: 'Business'
    },
    passenger: {
      firstName: 'Trần',
      lastName: 'Thị B',
      email: 'tranthib@example.com',
      phone: '0987654321'
    },
    seat: {
      number: '5C',
      price: 1000000
    },
    paymentMethod: 'Bank Transfer',
    totalAmount: 3500000,
    status: 'confirmed',
    createdAt: '2024-03-16T15:30:00'
  }
]

export default function Bookings() {
  const navigate = useNavigate()
  const [searchCode, setSearchCode] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [bookings, setBookings] = useState(mockBookings)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [filter, setFilter] = useState('all') // all, upcoming, past

  const handleSearch = (e) => {
    e.preventDefault()
    // Trong thực tế, đây sẽ là API call
    const filteredBookings = mockBookings.filter(booking => {
      const matchCode = searchCode ? booking.bookingCode.includes(searchCode) : true
      const matchEmail = searchEmail ? booking.passenger.email.includes(searchEmail) : true
      return matchCode && matchEmail
    })
    setBookings(filteredBookings)
  }

  const handleCancelBooking = (bookingId) => {
    // Trong thực tế, đây sẽ là API call
    setBookings(bookings.filter(booking => booking.id !== bookingId))
  }

  const filteredBookings = bookings.filter(booking => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Lịch sử đặt vé
          </h1>
          
          {/* Bộ lọc */}
          <div className="flex space-x-4 mb-6">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilter('all')}
            >
              Tất cả
            </Button>
            <Button
              variant={filter === 'upcoming' ? 'primary' : 'outline'}
              onClick={() => setFilter('upcoming')}
            >
              Sắp tới
            </Button>
            <Button
              variant={filter === 'past' ? 'primary' : 'outline'}
              onClick={() => setFilter('past')}
            >
              Đã qua
            </Button>
          </div>

          {/* Danh sách đặt vé */}
          <div className="space-y-4">
            {filteredBookings.map(booking => (
              <Card key={booking.id}>
                <Card.Body>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Điểm đi</p>
                          <p className="font-semibold">{booking.flight.from.city}</p>
                          <p className="text-sm text-gray-600">{booking.flight.from.code}</p>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <svg className="w-6 h-6 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <div className="flex-1 border-t border-gray-300"></div>
                          </div>
                          <p className="text-center text-sm text-gray-600 mt-1">
                            {booking.flight.duration}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Điểm đến</p>
                          <p className="font-semibold">{booking.flight.to.city}</p>
                          <p className="text-sm text-gray-600">{booking.flight.to.code}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end space-y-2">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Mã đặt chỗ</p>
                        <p className="font-medium">{booking.bookingCode}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Ngày bay</p>
                        <p className="font-medium">
                          {new Date(booking.flight.departureTime).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        Xem chi tiết
                      </Button>
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