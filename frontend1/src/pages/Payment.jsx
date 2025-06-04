import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { mockPaymentMethods } from '../mocks/flightData'

export default function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const { flightDetails, passengerInfo, selectedSeat } = location.state || {}

  const [selectedMethod, setSelectedMethod] = useState('credit-card')
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  })
  const [errors, setErrors] = useState({})

  if (!flightDetails || !passengerInfo || !selectedSeat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Không tìm thấy thông tin đặt vé
          </h2>
          <p className="mt-2 text-gray-600">
            Vui lòng quay lại trang tìm kiếm
          </p>
          <Button
            onClick={() => navigate('/search')}
            className="mt-4"
          >
            Quay lại tìm kiếm
          </Button>
        </div>
      </div>
    )
  }

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
      // Xử lý thanh toán ở đây
      navigate('/payment/success', {
        state: {
          flightDetails,
          passengerInfo,
          selectedSeat,
          paymentMethod: selectedMethod,
          cardInfo: selectedMethod === 'credit-card' ? cardInfo : null,
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Thanh toán
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Thông tin đơn hàng */}
              <div className="md:col-span-2">
                <Card>
                  <Card.Header>
                    <h2 className="text-lg font-medium">Thông tin đơn hàng</h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Chuyến bay</span>
                        <span className="font-medium">
                          {flightDetails.from.city} ({flightDetails.from.code}) →{' '}
                          {flightDetails.to.city} ({flightDetails.to.code})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ngày</span>
                        <span className="font-medium">{flightDetails.from.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Giờ</span>
                        <span className="font-medium">{flightDetails.from.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hãng hàng không</span>
                        <span className="font-medium">
                          {flightDetails.airline}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Số hiệu chuyến bay</span>
                        <span className="font-medium">
                          {flightDetails.flightNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ghế</span>
                        <span className="font-medium">{selectedSeat.number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hành khách</span>
                        <span className="font-medium">
                          {passengerInfo.lastName} {passengerInfo.firstName}
                        </span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Tổng cộng</span>
                          <span>
                            {flightDetails.price.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                <Card className="mt-6">
                  <Card.Header>
                    <h2 className="text-lg font-medium">
                      Phương thức thanh toán
                    </h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="space-y-4">
                      {mockPaymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                            selectedMethod === method.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200'
                          }`}
                          onClick={() => setSelectedMethod(method.id)}
                        >
                          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl">
                            {method.icon}
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium">{method.name}</h3>
                            <p className="text-sm text-gray-500">
                              {method.description}
                            </p>
                          </div>
                          <div className="ml-auto">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedMethod === method.id
                                  ? 'border-primary-500'
                                  : 'border-gray-300'
                              }`}
                            >
                              {selectedMethod === method.id && (
                                <div className="w-3 h-3 rounded-full bg-primary-500" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedMethod === 'credit-card' && (
                      <div className="mt-6 space-y-4">
                        <Input
                          label="Số thẻ"
                          value={cardInfo.number}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          error={errors.number}
                        />
                        <Input
                          label="Tên trên thẻ"
                          value={cardInfo.name}
                          onChange={(e) =>
                            setCardInfo({ ...cardInfo, name: e.target.value })
                          }
                          placeholder="NGUYEN VAN A"
                          error={errors.name}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Ngày hết hạn"
                            value={cardInfo.expiry}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            error={errors.expiry}
                          />
                          <Input
                            label="Mã CVV"
                            value={cardInfo.cvv}
                            onChange={(e) =>
                              setCardInfo({
                                ...cardInfo,
                                cvv: e.target.value.replace(/\D/g, '').slice(0, 4),
                              })
                            }
                            placeholder="123"
                            error={errors.cvv}
                          />
                        </div>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>

              {/* Tổng kết */}
              <div>
                <Card>
                  <Card.Header>
                    <h2 className="text-lg font-medium">Tổng kết</h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Giá vé</span>
                        <span>
                          {flightDetails.price.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Thuế</span>
                        <span>0đ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phí dịch vụ</span>
                        <span>0đ</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Tổng cộng</span>
                          <span>
                            {flightDetails.price.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      type="submit"
                      className="w-full"
                    >
                      Thanh toán
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