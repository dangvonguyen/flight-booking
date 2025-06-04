import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import TicketPrint from '../components/booking/TicketPrint'

export default function PaymentSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const { flightDetails, passengerInfo, selectedSeat, paymentMethod } = location.state || {}

  if (!flightDetails || !passengerInfo || !selectedSeat) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Card>
          <Card.Body className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Không tìm thấy thông tin đặt vé
            </h2>
            <p className="text-gray-600 mb-6">
              Vui lòng quay lại trang chủ và thử lại
            </p>
            <Button onClick={() => navigate('/')}>
              Về trang chủ
            </Button>
          </Card.Body>
        </Card>
      </div>
    )
  }

  // Tạo mã đặt chỗ ngẫu nhiên
  const bookingCode = `BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  // Tạo đối tượng booking để truyền vào TicketPrint
  const booking = {
    bookingCode,
    flight: flightDetails,
    passenger: passengerInfo,
    seat: selectedSeat,
    paymentMethod: paymentMethod.name,
    totalAmount: flightDetails.price + selectedSeat.price
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card>
          <Card.Body>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Đặt vé thành công!
              </h2>
              <p className="text-gray-600">
                Mã đặt chỗ của bạn là: <span className="font-semibold">{bookingCode}</span>
              </p>
            </div>

            <div className="mb-8">
              <TicketPrint booking={booking} />
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="mr-4"
              >
                Về trang chủ
              </Button>
              <Button onClick={() => navigate('/bookings')}>
                Xem lịch sử đặt vé
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
} 