import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { mockBookingData, paymentMethods } from '../data/mockPaymentData'

export default function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Use mock data if no real data is available - ALWAYS use mock data for testing
  const { 
    flightDetails = mockBookingData.flightDetails, 
    passengerInfo = mockBookingData.passengerInfo, 
    selectedSeat = mockBookingData.selectedSeat, 
    searchParams = mockBookingData.searchParams,
    departureAirport = mockBookingData.departureAirport,
    arrivalAirport = mockBookingData.arrivalAirport 
  } = location.state || mockBookingData

  // Debug logging để kiểm tra
  console.log('Payment component loaded with data:', {
    flightDetails,
    passengerInfo,
    selectedSeat
  })

  const [selectedMethod, setSelectedMethod] = useState('vnpay')
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateCardInfo()) {
      setIsSubmitting(true)
      
      // Add loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500))
      
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
          <h1 className="text-2xl font-semibold text-gray-900 mb-8 animate-fadeIn">
            Thanh toán
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Thông tin đơn hàng */}
              <div className="lg:col-span-2 space-y-6">
                {/* Thông tin chuyến bay */}
                <Card className="animate-slideUp">
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
                <Card className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
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
                <Card className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
                  <Card.Header>
                    <h2 className="text-lg font-medium">
                      Phương thức thanh toán
                    </h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="space-y-4">
                      {paymentMethods.map((method, index) => (
                        <div
                          key={method.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${
                            selectedMethod === method.id
                              ? 'border-primary-500 bg-primary-50 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedMethod(method.id)}
                          style={{ animationDelay: `${0.3 + index * 0.05}s` }}
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
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                selectedMethod === method.id
                                  ? 'border-primary-500 bg-primary-500 scale-110'
                                  : 'border-gray-300'
                              }`}
                            >
                              {selectedMethod === method.id && (
                                <div className="w-2 h-2 rounded-full bg-white animate-scaleIn" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Thông tin thẻ tín dụng */}
                    {selectedMethod === 'credit-card' && (
                      <div className="mt-6 pt-6 border-t animate-fadeIn">
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
                <Card className="sticky top-8 animate-slideUp" style={{ animationDelay: '0.3s' }}>
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
                          <span className="text-primary-600 animate-heartbeat">
                            {totalPrice.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <Button 
                      type="submit" 
                      className={`w-full transition-all duration-300 ${
                        isSubmitting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'hover:scale-105 hover:shadow-lg'
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                          Đang xử lý...
                        </div>
                      ) : (
                        'Tiến hành thanh toán'
                      )}
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