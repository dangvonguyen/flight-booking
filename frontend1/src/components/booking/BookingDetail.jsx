import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../ui/Card'
import Button from '../ui/Button'
import TicketPrint from './TicketPrint'

export default function BookingDetail({ booking, onClose }) {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <Card.Body>
          <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Chi tiết đặt vé
                </h2>
                <p className="text-gray-600">Mã đặt vé: {booking.bookingCode}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-primary-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Thông tin chuyến bay
              </h3>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Điểm đi</p>
                  <p className="text-2xl font-bold text-gray-900">{booking.flight.from.code}</p>
                  <p className="text-sm text-gray-600 font-medium">{booking.flight.from.city}</p>
                  <p className="text-sm text-primary-600 font-semibold mt-1">
                    {new Date(booking.flight.departureTime).toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="flex-1 px-6">
                  <div className="flex items-center">
                    <div className="flex-1 border-t-2 border-dashed border-primary-300"></div>
                    <div className="mx-3 p-3 bg-primary-200 rounded-full">
                      <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                    <div className="flex-1 border-t-2 border-dashed border-primary-300"></div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-sm text-gray-600 font-medium">{booking.flight.duration}</p>
                    <p className="text-xs text-gray-500">{booking.flight.airline} - {booking.flight.flightNumber}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Điểm đến</p>
                  <p className="text-2xl font-bold text-gray-900">{booking.flight.to.code}</p>
                  <p className="text-sm text-gray-600 font-medium">{booking.flight.to.city}</p>
                  <p className="text-sm text-primary-600 font-semibold mt-1">
                    {new Date(new Date(booking.flight.departureTime).getTime() + 2 * 60 * 60 * 1000).toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Thông tin hành khách
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Họ và tên:</span>
                    <span className="font-semibold text-gray-900">
                      {booking.passenger.firstName} {booking.passenger.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-gray-900">{booking.passenger.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Điện thoại:</span>
                    <span className="font-medium text-gray-900">{booking.passenger.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số ghế:</span>
                    <span className="font-bold text-primary-600 text-lg">{booking.seat.number}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Thông tin thanh toán
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mã đặt chỗ:</span>
                    <span className="font-mono font-semibold text-gray-900">{booking.bookingCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phương thức:</span>
                    <span className="font-medium text-gray-900">{booking.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày đặt:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(booking.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-green-200">
                    <span className="text-gray-600 font-medium">Tổng tiền:</span>
                    <span className="font-bold text-2xl text-green-600">
                      {booking.totalAmount.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                      ✓ Đã thanh toán
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <TicketPrint 
              booking={booking} 
              onClose={onClose}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  )
} 