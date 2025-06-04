import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { mockFlights } from '../mocks/flightData'

export default function SearchResults() {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = location.state?.searchParams

  if (!searchParams) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Không tìm thấy thông tin tìm kiếm
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

  // Lọc chuyến bay theo thông tin tìm kiếm
  const filteredFlights = mockFlights.filter((flight) => {
    return (
      flight.from.code === searchParams.from &&
      flight.to.code === searchParams.to &&
      flight.from.date === searchParams.date
    )
  })

  const handleSelectFlight = (flight) => {
    navigate('/book', {
      state: {
        flight,
        searchParams,
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Kết quả tìm kiếm
            </h1>
            <p className="mt-2 text-gray-600">
              {searchParams.from} → {searchParams.to} | {searchParams.date}
            </p>
          </div>

          {filteredFlights.length === 0 ? (
            <Card>
              <Card.Body>
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-gray-900">
                    Không tìm thấy chuyến bay phù hợp
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Vui lòng thử lại với thông tin khác
                  </p>
                  <Button
                    onClick={() => navigate('/search')}
                    className="mt-4"
                  >
                    Tìm kiếm lại
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredFlights.map((flight) => (
                <Card key={flight.id}>
                  <Card.Body>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              src={flight.airlineLogo}
                              alt={flight.airline}
                              className="h-12 w-12 object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {flight.airline}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {flight.flightNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-2xl font-semibold text-gray-900">
                          {flight.from.time}
                        </div>
                        <div className="text-sm text-gray-500">
                          {flight.from.city} ({flight.from.code})
                        </div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-sm text-gray-500">
                          {flight.duration}
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                          </div>
                          <div className="relative flex justify-center">
                            <span className="bg-white px-2 text-sm text-gray-500">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-2xl font-semibold text-gray-900">
                          {flight.to.time}
                        </div>
                        <div className="text-sm text-gray-500">
                          {flight.to.city} ({flight.to.code})
                        </div>
                      </div>
                      <div className="flex-1 text-right">
                        <div className="text-2xl font-semibold text-primary-600">
                          {flight.price.toLocaleString('vi-VN')}đ
                        </div>
                        <div className="text-sm text-gray-500">
                          Còn {flight.availableSeats} ghế
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      onClick={() => handleSelectFlight(flight)}
                      className="w-full"
                    >
                      Chọn chuyến bay
                    </Button>
                  </Card.Footer>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 