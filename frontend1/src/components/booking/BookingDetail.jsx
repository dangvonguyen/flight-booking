import { useState } from 'react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import TicketPrint from './TicketPrint'

export default function BookingDetail({ booking, onClose }) {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      setIsPrinting(false)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <Card.Body>
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Chi tiết đặt vé
            </h2>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          <div className="space-y-6">
            {/* Thông tin chuyến bay */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Thông tin chuyến bay</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Điểm đi</p>
                    <p className="text-xl font-semibold">{booking.flight.from.city}</p>
                    <p className="text-sm text-gray-600">{booking.flight.from.code}</p>
                  </div>
                  <div className="flex-1 px-4">
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
                    <p className="text-xl font-semibold">{booking.flight.to.city}</p>
                    <p className="text-sm text-gray-600">{booking.flight.to.code}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin hành khách */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Thông tin hành khách</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Họ và tên</p>
                    <p className="font-medium">
                      {booking.passenger.firstName} {booking.passenger.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{booking.passenger.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Số điện thoại</p>
                    <p className="font-medium">{booking.passenger.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Số ghế</p>
                    <p className="font-medium">{booking.seat.number}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin thanh toán */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Thông tin thanh toán</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Mã đặt chỗ</p>
                    <p className="font-medium">{booking.bookingCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phương thức thanh toán</p>
                    <p className="font-medium">{booking.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tổng tiền</p>
                    <p className="font-medium text-lg text-primary-600">
                      {booking.totalAmount.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Trạng thái</p>
                    <p className="font-medium text-green-600">Đã thanh toán</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nút in vé */}
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={onClose}>
                Đóng
              </Button>
              <Button onClick={handlePrint}>
                In vé
              </Button>
            </div>

            {/* Component in vé */}
            {isPrinting && (
              <div className="hidden">
                <div className="ticket-print">
                  <TicketPrint booking={booking} />
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  )
} 