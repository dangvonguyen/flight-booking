import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import SeatSelector from '../components/flight/SeatSelector'
import aviationStackService from '../services/aviationStackService'

// Seats data từ flightData.js
const seatMaps = {
  'economy': Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    number: `${String.fromCharCode(65 + Math.floor(i / 6))}${(i % 6) + 1}`,
    status: Math.random() > 0.7 ? 'occupied' : 'available',
    price: 0,
    class: 'economy'
  })),
  'business': Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    number: `${String.fromCharCode(65 + Math.floor(i / 4))}${(i % 4) + 1}`,
    status: Math.random() > 0.8 ? 'occupied' : 'available',
    price: 500000,
    class: 'business'
  }))
}

const steps = [
  { id: 'passenger', name: 'Thông tin hành khách' },
  { id: 'seat', name: 'Chọn ghế' },
  { id: 'confirm', name: 'Xác nhận' },
]

export default function Book() {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState('passenger')
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: 'Việt Nam',
    passportNumber: '',
  })
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [loading, setLoading] = useState(false)
  const [departureAirport, setDepartureAirport] = useState(null)
  const [arrivalAirport, setArrivalAirport] = useState(null)

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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Không tìm thấy thông tin chuyến bay
          </h2>
          <Button onClick={() => navigate('/')}>
            Quay lại trang chủ
          </Button>
        </div>
      </div>
    )
  }

  const seats = seatMaps[flightDetails.seatClass] || seatMaps['economy']

  const handlePassengerSubmit = (e) => {
    e.preventDefault()
    setCurrentStep('seat')
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
          <form onSubmit={handlePassengerSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Họ"
                  value={passengerInfo.lastName}
                  onChange={(e) =>
                    setPassengerInfo({
                      ...passengerInfo,
                      lastName: e.target.value,
                    })
                  }
                  required
                />
                <Input
                  label="Tên"
                  value={passengerInfo.firstName}
                  onChange={(e) =>
                    setPassengerInfo({
                      ...passengerInfo,
                      firstName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Email"
                  type="email"
                  value={passengerInfo.email}
                  onChange={(e) =>
                    setPassengerInfo({
                      ...passengerInfo,
                      email: e.target.value,
                    })
                  }
                  required
                />
                <Input
                  label="Số điện thoại"
                  type="tel"
                  value={passengerInfo.phone}
                  onChange={(e) =>
                    setPassengerInfo({
                      ...passengerInfo,
                      phone: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Ngày sinh"
                  type="date"
                  value={passengerInfo.dateOfBirth}
                  onChange={(e) =>
                    setPassengerInfo({
                      ...passengerInfo,
                      dateOfBirth: e.target.value,
                    })
                  }
                  required
                />
                <Input
                  label="Quốc tịch"
                  value={passengerInfo.nationality}
                  onChange={(e) =>
                    setPassengerInfo({
                      ...passengerInfo,
                      nationality: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <Input
                label="Số hộ chiếu/CMND"
                value={passengerInfo.passportNumber}
                onChange={(e) =>
                  setPassengerInfo({
                    ...passengerInfo,
                    passportNumber: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full">
                Tiếp tục
              </Button>
            </div>
          </form>
        )

      case 'seat':
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Chọn ghế {flightDetails.seatClass === 'business' ? 'hạng thương gia' : 'hạng phổ thông'}
              </h3>
              <p className="text-sm text-gray-600">
                Phí chọn ghế: {flightDetails.seatClass === 'business' ? '500.000đ' : 'Miễn phí'}
              </p>
            </div>
            <SeatSelector
              seats={seats}
              selectedSeat={selectedSeat}
              onSelect={handleSeatSelect}
            />
            <div className="mt-6 flex gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('passenger')}
                className="flex-1"
              >
                Quay lại
              </Button>
              <Button
                onClick={() => setCurrentStep('confirm')}
                disabled={!selectedSeat}
                className="flex-1"
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        )

      case 'confirm':
        const seatFee = selectedSeat?.price || 0
        const totalPrice = flightDetails.price + seatFee

        return (
          <div className="space-y-6">
            <Card>
              <Card.Header>
                <h3 className="text-lg font-medium">Thông tin chuyến bay</h3>
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
                    <span className="text-gray-600">Từ</span>
                    <span className="font-medium">
                      {departureAirport?.airport_name || flightDetails.from.city} ({flightDetails.from.code})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Đến</span>
                    <span className="font-medium">
                      {arrivalAirport?.airport_name || flightDetails.to.city} ({flightDetails.to.code})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày bay</span>
                    <span className="font-medium">{flightDetails.from.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giờ khởi hành</span>
                    <span className="font-medium">{flightDetails.from.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giờ đến</span>
                    <span className="font-medium">{flightDetails.to.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian bay</span>
                    <span className="font-medium">{flightDetails.duration}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <h3 className="text-lg font-medium">Thông tin hành khách</h3>
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
                    <span className="text-gray-600">Ghế</span>
                    <span className="font-medium">
                      {selectedSeat?.number} ({flightDetails.seatClass === 'business' ? 'Thương gia' : 'Phổ thông'})
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <h3 className="text-lg font-medium">Chi tiết giá</h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giá vé</span>
                    <span className="font-medium">{flightDetails.price.toLocaleString('vi-VN')}đ</span>
                  </div>
                  {seatFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phí chọn ghế</span>
                      <span className="font-medium">{seatFee.toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Tổng cộng</span>
                      <span className="text-lg font-semibold text-primary-600">
                        {totalPrice.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('seat')}
                className="flex-1"
              >
                Quay lại
              </Button>
              <Button onClick={handleConfirm} className="flex-1">
                Tiến hành thanh toán
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.id === currentStep ||
                      (currentStep === 'seat' && step.id === 'passenger') ||
                      (currentStep === 'confirm' && 
                        (step.id === 'passenger' || step.id === 'seat'))
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      step.id === currentStep
                        ? 'text-primary-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="w-16 h-0.5 bg-gray-300 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <Card.Header>
              <h2 className="text-2xl font-semibold text-gray-900">
                {steps.find((step) => step.id === currentStep)?.name}
              </h2>
            </Card.Header>
            <Card.Body>{renderStep()}</Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
} 