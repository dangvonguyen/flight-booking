import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import aviationStackService from '../services/aviationStackService'

export default function SearchResults() {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = location.state?.searchParams
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const searchFlights = async () => {
      if (!searchParams) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await aviationStackService.getFlightSchedules({
          dep_iata: searchParams.from,
          arr_iata: searchParams.to,
          flight_date: searchParams.departureDate,
          limit: 50
        })
        
        setFlights(response.data || [])
      } catch (err) {
        setError('Có lỗi xảy ra khi tìm kiếm chuyến bay')
        console.error('Error searching flights:', err)
      } finally {
        setLoading(false)
      }
    }

    searchFlights()
  }, [searchParams])

  const formatTime = (timeString) => {
    if (!timeString) return '--:--'
    const date = new Date(timeString)
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  const formatPrice = (flight) => {
    if (flight.price) {
      const price = searchParams.class === 'business' ? flight.price.business : flight.price.economy
      return price?.toLocaleString('vi-VN')
    }
    // Giá mặc định nếu không có thông tin
    const basePrice = searchParams.class === 'business' ? 3600000 : 1200000
    return basePrice.toLocaleString('vi-VN')
  }

  const getAirlineLogo = (iataCode) => {
    const logos = {
      'VN': '/images/airlines/vietnam-airlines.png',
      'VJ': '/images/airlines/vietjet.png',
      'QH': '/images/airlines/bamboo-airways.png',
      'BL': '/images/airlines/jetstar.png'
    }
    return logos[iataCode] || '/images/airlines/default.png'
  }

  const handleSelectFlight = (flight) => {
    // Chuyển đổi dữ liệu API thành format cũ để tương thích với Book component
    const convertedFlight = {
      id: flight.flight.iataNumber,
      airline: flight.airline.name,
      airlineLogo: getAirlineLogo(flight.airline.iataCode),
      flightNumber: flight.flight.iataNumber,
      from: {
        city: flight.departure.iataCode, // Tạm thời sử dụng IATA code
        code: flight.departure.iataCode,
        time: formatTime(flight.departure.scheduledTime),
        date: searchParams.departureDate,
      },
      to: {
        city: flight.arrival.iataCode, // Tạm thời sử dụng IATA code  
        code: flight.arrival.iataCode,
        time: formatTime(flight.arrival.scheduledTime),
        date: searchParams.departureDate,
      },
      duration: flight.duration || '2h 15m',
      price: searchParams.class === 'business' ? (flight.price?.business || 3600000) : (flight.price?.economy || 1200000),
      availableSeats: Math.floor(Math.random() * 50) + 20, // Mock data
      seatClass: searchParams.class || 'economy',
    }

    navigate('/book', {
      state: {
        flight: convertedFlight,
        searchParams,
      },
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Đang tìm kiếm chuyến bay...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Kết quả tìm kiếm
            </h1>
            {searchParams && (
              <p className="mt-2 text-gray-600">
                {searchParams.from} → {searchParams.to} | {searchParams.departureDate}
              </p>
            )}
            {error && (
              <p className="mt-2 text-red-500 font-medium">
                {error}
              </p>
            )}
          </div>

          {flights.length === 0 ? (
            <Card>
              <Card.Body>
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-gray-900">
                    Không tìm thấy chuyến bay phù hợp
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Vui lòng thử lại với thông tin tìm kiếm khác
                  </p>
                  <Button
                    onClick={() => navigate('/')}
                    className="mt-4"
                  >
                    Quay lại trang chủ
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <div className="space-y-4">
              {flights.map((flight, index) => (
                <Card key={flight.flight.iataNumber + index}>
                  <Card.Body>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              src={getAirlineLogo(flight.airline.iataCode)}
                              alt={flight.airline.name}
                              className="h-12 w-12 object-contain"
                              onError={(e) => {
                                e.target.src = '/images/airlines/default.png'
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {flight.airline.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {flight.flight.iataNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-2xl font-semibold text-gray-900">
                          {formatTime(flight.departure.scheduledTime)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {flight.departure.iataCode}
                        </div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-sm text-gray-500">
                          {flight.duration || '2h 15m'}
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
                          {formatTime(flight.arrival.scheduledTime)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {flight.arrival.iataCode}
                        </div>
                      </div>
                      <div className="flex-1 text-right">
                        <div className="text-2xl font-semibold text-primary-600">
                          {formatPrice(flight)}đ
                        </div>
                        <div className="text-sm text-gray-500">
                          {searchParams.class === 'business' ? 'Hạng thương gia' : 'Hạng phổ thông'}
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