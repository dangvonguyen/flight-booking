import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import SeatSelector from '../components/flight/SeatSelector'
import aviationStackService from '../services/aviationStackService'

// Seats data từ flightData.js với format mới - 30 hàng ghế
const seatMaps = {
  'economy': Array.from({ length: 180 }, (_, i) => {
    // 30 hàng x 6 ghế = 180 ghế tổng cộng
    const row = Math.floor(i / 6) + 1
    const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F']
    const letter = seatLetters[i % 6]
    return {
      id: i + 1,
      number: `${row}${letter}`,
      status: Math.random() > 0.75 ? 'occupied' : 'available', // 25% ghế đã đặt
      price: 0,
      class: 'economy'
    }
  }),
  'business': Array.from({ length: 48 }, (_, i) => {
    // 12 hàng x 4 ghế = 48 ghế tổng cộng
    const row = Math.floor(i / 4) + 1
    const seatLetters = ['A', 'B', 'C', 'D']
    const letter = seatLetters[i % 4]
    return {
      id: i + 1,
      number: `${row}${letter}`,
      status: Math.random() > 0.85 ? 'occupied' : 'available', // 15% ghế đã đặt
      price: 500000,
      class: 'business'
    }
  })
}

const steps = [
  { id: 'passenger', name: 'Thông tin hành khách', icon: '👤' },
  { id: 'seat', name: 'Chọn ghế', icon: '✈️' },
  { id: 'confirm', name: 'Xác nhận', icon: '✅' },
]

export default function Book() {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState('passenger')
  
  // Chỉ giữ các field theo database schema
  const [passengerInfo, setPassengerInfo] = useState({
    first_name: '',
    last_name: '',
    nationality: 'Việt Nam',
    date_of_birth: '',
    passport_number: '',
  })
  
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [loading, setLoading] = useState(false)
  const [departureAirport, setDepartureAirport] = useState(null)
  const [arrivalAirport, setArrivalAirport] = useState(null)
  const [errors, setErrors] = useState({})

  // Lấy thông tin chuyến bay từ location state
  const flightDetails = location.state?.flight
  const searchParams = location.state?.searchParams || {}

  useEffect(() => {
    // Tải thông tin chi tiết sân bay
    const loadAirportInfo = async () => {
      if (flightDetails) {
        try {
          setLoading(true)
          const [depResponse, arrResponse] = await Promise.all([
            aviationStackService.getAirportByIata(flightDetails.from.code),
            aviationStackService.getAirportByIata(flightDetails.to.code)
          ])
          
          setDepartureAirport(depResponse.data?.[0])
          setArrivalAirport(arrResponse.data?.[0])
        } catch (error) {
          console.error('Error loading airport info:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    loadAirportInfo()
  }, [flightDetails])

  // Redirect nếu không có thông tin chuyến bay
  useEffect(() => {
    if (!flightDetails) {
      navigate('/')
    }
  }, [flightDetails, navigate])

  if (!flightDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Không tìm thấy thông tin chuyến bay
            </h2>
            <p className="text-gray-600 mb-6">
              Vui lòng quay lại trang chủ để tìm kiếm chuyến bay mới
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              Quay lại trang chủ
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const seats = seatMaps[flightDetails.seatClass] || seatMaps['economy']

  const validateForm = () => {
    const newErrors = {}
    
    if (!passengerInfo.first_name.trim()) {
      newErrors.first_name = 'Vui lòng nhập tên'
    }
    
    if (!passengerInfo.last_name.trim()) {
      newErrors.last_name = 'Vui lòng nhập họ'
    }
    
    if (!passengerInfo.nationality.trim()) {
      newErrors.nationality = 'Vui lòng nhập quốc tịch'
    }
    
    if (!passengerInfo.date_of_birth) {
      newErrors.date_of_birth = 'Vui lòng nhập ngày sinh'
    }
    
    if (!passengerInfo.passport_number.trim()) {
      newErrors.passport_number = 'Vui lòng nhập số hộ chiếu/CMND'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePassengerSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setCurrentStep('seat')
    }
  }

  const handleSeatSelect = (seat) => {
    setSelectedSeat(seat)
  }

  const handleConfirm = () => {
    navigate('/payment', {
      state: {
        flightDetails,
        passengerInfo,
        selectedSeat,
        searchParams,
        departureAirport,
        arrivalAirport
      },
    })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'passenger':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thông tin hành khách</h3>
              <p className="text-gray-600">Vui lòng điền đầy đủ thông tin để tiếp tục</p>
            </div>
            
            <form onSubmit={handlePassengerSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="Họ"
                    value={passengerInfo.last_name}
                    onChange={(e) =>
                      setPassengerInfo({
                        ...passengerInfo,
                        last_name: e.target.value,
                      })
                    }
                    placeholder="Ví dụ: Nguyễn, Trần, Lê..."
                    className={errors.last_name ? 'border-red-500' : ''}
                    required
                  />
                  {errors.last_name && (
                    <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
                  )}
                </div>
                
                <div>
                  <Input
                    label="Tên"
                    value={passengerInfo.first_name}
                    onChange={(e) =>
                      setPassengerInfo({
                        ...passengerInfo,
                        first_name: e.target.value,
                      })
                    }
                    placeholder="Ví dụ: Văn Nam, Thị Lan, Minh Anh..."
                    className={errors.first_name ? 'border-red-500' : ''}
                    required
                  />
                  {errors.first_name && (
                    <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="Ngày sinh"
                    type="date"
                    value={passengerInfo.date_of_birth}
                    onChange={(e) =>
                      setPassengerInfo({
                        ...passengerInfo,
                        date_of_birth: e.target.value,
                      })
                    }
                    max={new Date().toISOString().split('T')[0]}
                    className={errors.date_of_birth ? 'border-red-500' : ''}
                    required
                  />
                  {errors.date_of_birth && (
                    <p className="mt-1 text-sm text-red-600">{errors.date_of_birth}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quốc tịch
                  </label>
                  <select
                    value={passengerInfo.nationality}
                    onChange={(e) =>
                      setPassengerInfo({
                        ...passengerInfo,
                        nationality: e.target.value,
                      })
                    }
                    className={`w-full bg-white px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.nationality ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  >
                    <option value="Việt Nam">Việt Nam</option>
                    <option value="Hoa Kỳ">Hoa Kỳ</option>
                    <option value="Anh">Anh</option>
                    <option value="Pháp">Pháp</option>
                    <option value="Đức">Đức</option>
                    <option value="Nhật Bản">Nhật Bản</option>
                    <option value="Hàn Quốc">Hàn Quốc</option>
                    <option value="Trung Quốc">Trung Quốc</option>
                    <option value="Thái Lan">Thái Lan</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Khác">Khác</option>
                  </select>
                  {errors.nationality && (
                    <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>
                  )}
                </div>
              </div>
              
              <div>
                <Input
                  label="Số hộ chiếu/CMND"
                  value={passengerInfo.passport_number}
                  onChange={(e) =>
                    setPassengerInfo({
                      ...passengerInfo,
                      passport_number: e.target.value,
                    })
                  }
                  placeholder="Nhập số hộ chiếu hoặc CMND"
                  className={errors.passport_number ? 'border-red-500' : ''}
                  required
                />
                {errors.passport_number && (
                  <p className="mt-1 text-sm text-red-600">{errors.passport_number}</p>
                )}
              </div>
              
              <div className="pt-6">
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105">
                  Tiếp tục chọn ghế
                </Button>
              </div>
            </form>
          </div>
        )

      case 'seat':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl mb-4">✈️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Chọn ghế ngồi</h3>
              <p className="text-gray-600">
                Chọn ghế yêu thích cho chuyến bay của bạn
              </p>
            </div>
            
            <SeatSelector
              seats={seats}
              selectedSeat={selectedSeat}
              onSelect={handleSeatSelect}
              seatClass={flightDetails.seatClass}
            />
            
            <div className="flex gap-4 pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('passenger')}
                className="flex-1 py-3"
              >
                ← Quay lại
              </Button>
              <Button
                onClick={() => setCurrentStep('confirm')}
                disabled={!selectedSeat}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Xác nhận →
              </Button>
            </div>
          </div>
        )

      case 'confirm':
        const seatFee = selectedSeat?.price || 0
        const totalPrice = flightDetails.price + seatFee

        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Xác nhận thông tin</h3>
              <p className="text-gray-600">Kiểm tra lại thông tin trước khi thanh toán</p>
            </div>

            {/* Flight Information */}
            <Card className="overflow-hidden shadow-lg">
              <Card.Header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  ✈️ Thông tin chuyến bay
                </h3>
              </Card.Header>
              <Card.Body className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hãng hàng không:</span>
                    <span className="font-semibold">{flightDetails.airline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số hiệu:</span>
                    <span className="font-semibold">{flightDetails.flightNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Từ:</span>
                    <span className="font-semibold">
                      {departureAirport?.airport_name || flightDetails.from.city} ({flightDetails.from.code})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Đến:</span>
                    <span className="font-semibold">
                      {arrivalAirport?.airport_name || flightDetails.to.city} ({flightDetails.to.code})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày bay:</span>
                    <span className="font-semibold">{flightDetails.from.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian bay:</span>
                    <span className="font-semibold">{flightDetails.duration}</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-center items-center gap-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{flightDetails.from.time}</div>
                      <div className="text-sm text-gray-600">{flightDetails.from.code}</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="h-0.5 w-full bg-blue-300 relative">
                        <div className="absolute left-0 top-1/2 w-2 h-2 -mt-1 bg-blue-600 rounded-full"></div>
                        <div className="absolute right-0 top-1/2 w-2 h-2 -mt-1 bg-blue-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{flightDetails.to.time}</div>
                      <div className="text-sm text-gray-600">{flightDetails.to.code}</div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Passenger Information */}
            <Card className="overflow-hidden shadow-lg">
              <Card.Header className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  👤 Thông tin hành khách
                </h3>
              </Card.Header>
              <Card.Body className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Họ tên:</span>
                    <span className="font-semibold">
                      {passengerInfo.last_name} {passengerInfo.first_name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quốc tịch:</span>
                    <span className="font-semibold">{passengerInfo.nationality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày sinh:</span>
                    <span className="font-semibold">{passengerInfo.date_of_birth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số giấy tờ:</span>
                    <span className="font-semibold">{passengerInfo.passport_number}</span>
                  </div>
                </div>
                {selectedSeat && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-600">Ghế đã chọn:</span>
                        <span className="font-bold text-green-600 ml-2 text-lg">{selectedSeat.number}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          {flightDetails.seatClass === 'business' ? 'Hạng Thương Gia' : 'Hạng Phổ Thông'}
                        </div>
                        {seatFee > 0 && (
                          <div className="text-sm font-semibold text-green-600">
                            +{seatFee.toLocaleString('vi-VN')}đ
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Price Summary */}
            <Card className="overflow-hidden shadow-lg">
              <Card.Header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  💰 Chi tiết giá
                </h3>
              </Card.Header>
              <Card.Body className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Giá vé:</span>
                  <span className="font-semibold">{flightDetails.price.toLocaleString('vi-VN')}đ</span>
                </div>
                {seatFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí chọn ghế:</span>
                    <span className="font-semibold">{seatFee.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold">Tổng cộng:</span>
                    <span className="text-xl font-bold text-purple-600">
                      {totalPrice.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <div className="flex gap-4 pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('seat')}
                className="flex-1 py-3"
              >
                ← Quay lại
              </Button>
              <Button 
                onClick={handleConfirm} 
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
              >
                Tiến hành thanh toán →
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 text-lg font-medium">Đang tải thông tin...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 ${
                        step.id === currentStep ||
                        (currentStep === 'seat' && step.id === 'passenger') ||
                        (currentStep === 'confirm' && 
                          (step.id === 'passenger' || step.id === 'seat'))
                          ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg scale-110'
                          : 'bg-white text-gray-400 shadow-md border-2 border-gray-200'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <span
                      className={`mt-3 text-sm font-semibold transition-colors duration-300 ${
                        step.id === currentStep
                          ? 'text-blue-600'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-24 h-1 mx-4 rounded-full transition-colors duration-300 ${
                      (currentStep === 'seat' && step.id === 'passenger') ||
                      (currentStep === 'confirm' && (step.id === 'passenger' || step.id === 'seat'))
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                        : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card className="shadow-2xl border-0 overflow-hidden">
            <Card.Body className="p-8 lg:p-12">
              {renderStep()}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
} 