import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

// Mock data for testing
const mockPaymentData = {
  bookingId: 'BK12345678',
  flight: {
    id: 'FL001',
    flightNumber: 'VN123',
    airline: 'Vietnam Airlines',
    from: {
      code: 'SGN',
      city: 'TP. Hồ Chí Minh',
      time: '08:30',
      date: '2024-01-15'
    },
    to: {
      code: 'HAN',
      city: 'Hà Nội',
      time: '10:45',
      date: '2024-01-15'
    },
    duration: '2h 15m',
    price: 2500000,
    seatClass: 'economy'
  },
  passengerInfo: {
    firstName: 'Văn A',
    lastName: 'Nguyễn',
    email: 'nguyenvana@email.com',
    phone: '0901234567',
    dateOfBirth: '1990-01-01',
    nationality: 'Việt Nam',
    passportNumber: 'AB1234567'
  },
  paymentMethod: 'vnpay',
  selectedSeat: {
    number: '12A',
    type: 'window',
    price: 100000
  },
  departureAirport: {
    airport_name: 'Sân bay Tân Sơn Nhất',
    city: 'TP. Hồ Chí Minh'
  },
  arrivalAirport: {
    airport_name: 'Sân bay Nội Bài',
    city: 'Hà Nội'
  },
  totalAmount: 2600000
}

export default function PaymentProcess() {
  const location = useLocation()
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(true)
  const [countdown, setCountdown] = useState(3)

  // Use mock data if no real data is available
  const {
    bookingId = mockPaymentData.bookingId,
    flight = mockPaymentData.flight,
    passengerInfo = mockPaymentData.passengerInfo,
    paymentMethod = mockPaymentData.paymentMethod,
    selectedSeat = mockPaymentData.selectedSeat,
    departureAirport = mockPaymentData.departureAirport,
    arrivalAirport = mockPaymentData.arrivalAirport,
    totalAmount = mockPaymentData.totalAmount
  } = location.state || {}

  useEffect(() => {
    // Remove validation since we're using mock data
    // if (!flight || !passengerInfo) {
    //   navigate('/')
    //   return
    // }

    // Giả lập quá trình thanh toán
    const timer = setTimeout(() => {
      setProcessing(false)
      
      // Đếm ngược 3 giây rồi chuyển sang trang thành công
      const countdownTimer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownTimer)
            navigate('/payment-success', {
              state: {
                bookingId,
                flight,
                passengerInfo,
                selectedSeat,
                paymentMethod,
                departureAirport,
                arrivalAirport,
                totalAmount,
                bookingDate: new Date().toISOString()
              }
            })
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [flight, passengerInfo, navigate, bookingId, selectedSeat, paymentMethod, departureAirport, arrivalAirport, totalAmount])

  const getPaymentMethodName = (method) => {
    const methods = {
      'vnpay': 'VNPay',
      'credit-card': 'Thẻ tín dụng',
      'momo': 'MoMo',
      'zalopay': 'ZaloPay',
      'bank-transfer': 'Chuyển khoản ngân hàng',
      'paypal': 'PayPal'
    }
    return methods[method] || method
  }

  // Removed validation since we're using mock data for testing

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <Card.Body className="text-center py-12">
              {processing ? (
                <>
                  <div className="mb-6">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent mx-auto"></div>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Đang xử lý thanh toán...
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Vui lòng đợi trong giây lát. Chúng tôi đang xử lý thanh toán của bạn.
                  </p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
                    <h3 className="font-semibold text-blue-900 mb-4">Thông tin thanh toán:</h3>
                    <div className="space-y-2 text-sm text-blue-800">
                      <div className="flex justify-between">
                        <span>Mã đặt vé:</span>
                        <span className="font-mono">{bookingId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chuyến bay:</span>
                        <span>{flight.flightNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tuyến:</span>
                        <span>{flight.from.code} → {flight.to.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hành khách:</span>
                        <span>{passengerInfo.lastName} {passengerInfo.firstName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phương thức:</span>
                        <span>{getPaymentMethodName(paymentMethod)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Tổng tiền:</span>
                        <span>{totalAmount?.toLocaleString('vi-VN')}đ</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Thanh toán thành công!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Vé máy bay đã được đặt thành công.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-800 text-sm">
                      Bạn sẽ được chuyển đến trang thành công trong {countdown} giây...
                    </p>
                  </div>
                  <Button 
                    onClick={() => navigate('/payment-success', {
                      state: {
                        bookingId,
                        flight,
                        passengerInfo,
                        selectedSeat,
                        paymentMethod,
                        departureAirport,
                        arrivalAirport,
                        totalAmount,
                        bookingDate: new Date().toISOString()
                      }
                    })}
                    className="w-full"
                  >
                    Xem vé máy bay
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
} 