import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import SeatSelector from '../components/flight/SeatSelector'
import { mockFlights, mockSeats } from '../mocks/flightData'

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
    nationality: '',
    passportNumber: '',
  })
  const [selectedSeat, setSelectedSeat] = useState(null)

  // Lấy thông tin chuyến bay từ location state hoặc sử dụng mock data
  const flightDetails = location.state?.flight || mockFlights[0]
  const searchParams = location.state?.searchParams || {}

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
                label="Số hộ chiếu"
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
            <SeatSelector
              seats={mockSeats}
              selectedSeat={selectedSeat}
              onSelect={handleSeatSelect}
            />
            <div className="mt-6">
              <Button
                onClick={() => setCurrentStep('confirm')}
                disabled={!selectedSeat}
                className="w-full"
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        )

      case 'confirm':
        return (
          <div className="space-y-6">
            <Card>
              <Card.Header>
                <h3 className="text-lg font-medium">Thông tin chuyến bay</h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Từ</span>
                    <span className="font-medium">
                      {flightDetails.from.city} ({flightDetails.from.code})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Đến</span>
                    <span className="font-medium">
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
                    <span className="font-medium">{flightDetails.airline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số hiệu chuyến bay</span>
                    <span className="font-medium">{flightDetails.flightNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian bay</span>
                    <span className="font-medium">{flightDetails.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ghế</span>
                    <span className="font-medium">{selectedSeat?.number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giá vé</span>
                    <span className="font-medium">
                      {flightDetails.price.toLocaleString('vi-VN')}đ
                    </span>
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
                    <span className="text-gray-600">Họ và tên</span>
                    <span className="font-medium">
                      {passengerInfo.lastName} {passengerInfo.firstName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium">{passengerInfo.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số điện thoại</span>
                    <span className="font-medium">{passengerInfo.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số hộ chiếu</span>
                    <span className="font-medium">{passengerInfo.passportNumber}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <div className="mt-6">
              <Button onClick={handleConfirm} className="w-full">
                Tiến hành thanh toán
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <nav aria-label="Progress">
              <ol className="flex items-center">
                {steps.map((step, index) => (
                  <li
                    key={step.id}
                    className={`${
                      index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
                    } relative`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`${
                          currentStep === step.id
                            ? 'bg-primary-600'
                            : 'bg-gray-200'
                        } h-8 w-8 rounded-full flex items-center justify-center`}
                      >
                        <span
                          className={`${
                            currentStep === step.id
                              ? 'text-white'
                              : 'text-gray-600'
                          }`}
                        >
                          {index + 1}
                        </span>
                      </div>
                      <div className="ml-3">
                        <span
                          className={`text-sm font-medium ${
                            currentStep === step.id
                              ? 'text-primary-600'
                              : 'text-gray-500'
                          }`}
                        >
                          {step.name}
                        </span>
                      </div>
                    </div>
                    {index !== steps.length - 1 && (
                      <div
                        className={`absolute top-4 left-8 -ml-px h-0.5 w-full ${
                          currentStep === step.id
                            ? 'bg-primary-600'
                            : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <Card>
            <Card.Body>{renderStep()}</Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
} 