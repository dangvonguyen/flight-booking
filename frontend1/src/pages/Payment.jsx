import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

// Mock data for testing
const mockData = {
  flightDetails: {
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
    seatClass: 'economy',
    aircraft: 'Airbus A321'
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
  selectedSeat: {
    number: '12A',
    type: 'window',
    price: 100000
  },
  searchParams: {
    from: 'SGN',
    to: 'HAN',
    departDate: '2024-01-15',
    passengers: 1,
    seatClass: 'economy'
  },
  departureAirport: {
    airport_name: 'Sân bay Tân Sơn Nhất',
    city: 'TP. Hồ Chí Minh'
  },
  arrivalAirport: {
    airport_name: 'Sân bay Nội Bài',
    city: 'Hà Nội'
  }
}

// Payment methods data
const paymentMethods = [
  {
    id: 'vnpay',
    name: 'VNPay',
    icon: '💳',
    description: 'Thanh toán qua VNPay QR Code',
    fee: 0
  },
  {
    id: 'credit-card',
    name: 'Thẻ tín dụng/ghi nợ',
    icon: '💳',
    description: 'Thanh toán bằng thẻ Visa, Mastercard, JCB',
    fee: 25000
  },
  {
    id: 'momo',
    name: 'Ví MoMo',
    icon: '📱',
    description: 'Thanh toán qua ứng dụng MoMo',
    fee: 0
  },
  {
    id: 'zalopay',
    name: 'ZaloPay',
    icon: '💸',
    description: 'Thanh toán qua ứng dụng ZaloPay',
    fee: 0
  },
  {
    id: 'bank-transfer',
    name: 'Chuyển khoản ngân hàng',
    icon: '🏦',
    description: 'Chuyển khoản trực tiếp đến tài khoản ngân hàng',
    fee: 0
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '🌐',
    description: 'Thanh toán qua tài khoản PayPal',
    fee: 50000
  }
]

export default function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Use mock data if no real data is available
  const { 
    flightDetails = mockData.flightDetails, 
    passengerInfo = mockData.passengerInfo, 
    selectedSeat = mockData.selectedSeat, 
    searchParams = mockData.searchParams,
    departureAirport = mockData.departureAirport,
    arrivalAirport = mockData.arrivalAirport 
  } = location.state || {}

  const [selectedMethod, setSelectedMethod] = useState('vnpay')
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  })
  const [errors, setErrors] = useState({})

  // Removed validation since we're using mock data for testing

  // Tính toán giá
  const ticketPrice = flightDetails.price
  const seatFee = selectedSeat?.price || 0
  const paymentFee = paymentMethods.find(m => m.id === selectedMethod)?.fee || 0
  const totalPrice = ticketPrice + seatFee + paymentFee

  const validateCardInfo = () => {
    const newErrors = {}
    if (selectedMethod === 'credit-card') {
      if (!cardInfo.number) {
        newErrors.number = 'Vui lòng nhập số thẻ'
      } else if (!/^\d{16}$/.test(cardInfo.number.replace(/\s/g, ''))) {
        newErrors.number = 'Số thẻ không hợp lệ'
      }
      if (!cardInfo.name) {
        newErrors.name = 'Vui lòng nhập tên trên thẻ'
      }
      if (!cardInfo.expiry) {
        newErrors.expiry = 'Vui lòng nhập ngày hết hạn'
      } else if (!/^\d{2}\/\d{2}$/.test(cardInfo.expiry)) {
        newErrors.expiry = 'Định dạng ngày hết hạn không hợp lệ (MM/YY)'
      }
      if (!cardInfo.cvv) {
        newErrors.cvv = 'Vui lòng nhập mã CVV'
      } else if (!/^\d{3,4}$/.test(cardInfo.cvv)) {
        newErrors.cvv = 'Mã CVV không hợp lệ'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateCardInfo()) {
      // Tạo booking ID
      const bookingId = `BK${Date.now().toString().slice(-8)}`
      
      navigate('/payment-process', {
        state: {
          bookingId,
          flight: flightDetails,
          seatClass: flightDetails.seatClass,
          passengerInfo,
          paymentMethod: selectedMethod,
          cardInfo: selectedMethod === 'credit-card' ? cardInfo : null,
          selectedSeat,
          searchParams,
          departureAirport,
          arrivalAirport,
          totalAmount: totalPrice
        },
      })
    }
  }

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 16) value = value.slice(0, 16)
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim()
    setCardInfo({ ...cardInfo, number: formattedValue })
  }

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 4) value = value.slice(0, 4)
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2)
    }
    setCardInfo({ ...cardInfo, expiry: value })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Thanh toán
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Thông tin đơn hàng */}
              <div className="lg:col-span-2 space-y-6">
                {/* Thông tin chuyến bay */}
                <Card>
                  <Card.Header>
                    <h2 className="text-lg font-medium">Thông tin chuyến bay</h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hãng hàng không</span>
                        <span className="font-medium">{flightDetails.airline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Số hiệu chuyến bay</span>
                        <span className="font-medium">{flightDetails.flightNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tuyến bay</span>
                        <div className="text-right">
                          <div className="font-medium">
                            {departureAirport?.airport_name || flightDetails.from.city} → {arrivalAirport?.airport_name || flightDetails.to.city}
                          </div>
                          <div className="text-sm text-gray-500">
                            {flightDetails.from.code} → {flightDetails.to.code}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ngày bay</span>
                        <span className="font-medium">{flightDetails.from.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Thời gian</span>
                        <span className="font-medium">
                          {flightDetails.from.time} → {flightDetails.to.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Thời gian bay</span>
                        <span className="font-medium">{flightDetails.duration}</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Thông tin hành khách */}
                <Card>
                  <Card.Header>
                    <h2 className="text-lg font-medium">Thông tin hành khách</h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Họ tên</span>
                        <span className="font-medium">
                          {passengerInfo.lastName} {passengerInfo.firstName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email</span>
                        <span className="font-medium">{passengerInfo.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Điện thoại</span>
                        <span className="font-medium">{passengerInfo.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ghế ngồi</span>
                        <span className="font-medium">
                          {selectedSeat.number} ({flightDetails.seatClass === 'business' ? 'Thương gia' : 'Phổ thông'})
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Phương thức thanh toán */}
                <Card>
                  <Card.Header>
                    <h2 className="text-lg font-medium">
                      Phương thức thanh toán
                    </h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedMethod === method.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedMethod(method.id)}
                        >
                          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl">
                            {method.icon}
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{method.name}</h3>
                              {method.fee > 0 && (
                                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                                  +{method.fee.toLocaleString('vi-VN')}đ
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {method.description}
                            </p>
                          </div>
                          <div className="ml-auto">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedMethod === method.id
                                  ? 'border-primary-500 bg-primary-500'
                                  : 'border-gray-300'
                              }`}
                            >
                              {selectedMethod === method.id && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Thông tin thẻ tín dụng */}
                    {selectedMethod === 'credit-card' && (
                      <div className="mt-6 pt-6 border-t">
                        <h3 className="text-md font-medium mb-4">
                          Thông tin thẻ tín dụng
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <Input
                              label="Số thẻ"
                              value={cardInfo.number}
                              onChange={handleCardNumberChange}
                              placeholder="1234 5678 9012 3456"
                              error={errors.number}
                              maxLength={19}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Input
                              label="Tên trên thẻ"
                              value={cardInfo.name}
                              onChange={(e) =>
                                setCardInfo({ ...cardInfo, name: e.target.value.toUpperCase() })
                              }
                              placeholder="NGUYEN VAN A"
                              error={errors.name}
                            />
                          </div>
                          <div>
                            <Input
                              label="Ngày hết hạn"
                              value={cardInfo.expiry}
                              onChange={handleExpiryChange}
                              placeholder="MM/YY"
                              error={errors.expiry}
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <Input
                              label="Mã CVV"
                              value={cardInfo.cvv}
                              onChange={(e) =>
                                setCardInfo({ 
                                  ...cardInfo, 
                                  cvv: e.target.value.replace(/\D/g, '').slice(0, 4) 
                                })
                              }
                              placeholder="123"
                              error={errors.cvv}
                              maxLength={4}
                              type="password"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>

              {/* Tóm tắt giá */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <Card.Header>
                    <h2 className="text-lg font-medium">Tóm tắt đơn hàng</h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Giá vé</span>
                        <span className="font-medium">
                          {ticketPrice.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                      {seatFee > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phí chọn ghế</span>
                          <span className="font-medium">
                            {seatFee.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      )}
                      {paymentFee > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phí thanh toán</span>
                          <span className="font-medium">
                            {paymentFee.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      )}
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Tổng cộng</span>
                          <span className="text-primary-600">
                            {totalPrice.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <Button type="submit" className="w-full">
                      Tiến hành thanh toán
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 