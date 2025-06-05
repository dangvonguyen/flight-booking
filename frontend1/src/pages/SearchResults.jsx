import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import aviationStackService from '../services/aviationStackService'

// Add custom CSS for slider
const sliderStyles = `
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.innerText = sliderStyles
  document.head.appendChild(styleSheet)
}

export default function SearchResults() {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = location.state?.searchParams
  const [flights, setFlights] = useState([])
  const [filteredFlights, setFilteredFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  // Filter states
  const [filters, setFilters] = useState({
    priceRange: [0, 10000000],
    airlines: [],
    departureTime: [],
    stops: 'all'
  })

  // Sort state
  const [sortBy, setSortBy] = useState('price')

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
        setFilteredFlights(response.data || [])
      } catch (err) {
        setError('Có lỗi xảy ra khi tìm kiếm chuyến bay')
        console.error('Error searching flights:', err)
      } finally {
        setLoading(false)
      }
    }

    searchFlights()
  }, [searchParams])

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...flights]

    // Filter by price
    filtered = filtered.filter(flight => {
      const price = getFlightPrice(flight)
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })

    // Filter by airlines
    if (filters.airlines.length > 0) {
      filtered = filtered.filter(flight => 
        filters.airlines.includes(flight.airline.iataCode)
      )
    }

    // Filter by departure time
    if (filters.departureTime.length > 0) {
      filtered = filtered.filter(flight => {
        const hour = new Date(flight.departure.scheduledTime).getHours()
        return filters.departureTime.some(timeRange => {
          switch(timeRange) {
            case 'morning': return hour >= 6 && hour < 12
            case 'afternoon': return hour >= 12 && hour < 18
            case 'evening': return hour >= 18 && hour < 24
            case 'night': return hour >= 0 && hour < 6
            default: return true
          }
        })
      })
    }

    // Sort flights
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'price':
          return getFlightPrice(a) - getFlightPrice(b)
        case 'duration':
          return getDurationInMinutes(a) - getDurationInMinutes(b)
        case 'departure':
          return new Date(a.departure.scheduledTime) - new Date(b.departure.scheduledTime)
        case 'arrival':
          return new Date(a.arrival.scheduledTime) - new Date(b.arrival.scheduledTime)
        default:
          return 0
      }
    })

    setFilteredFlights(filtered)
  }, [flights, filters, sortBy])

  const formatTime = (timeString) => {
    if (!timeString) return '--:--'
    const date = new Date(timeString)
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  const getFlightPrice = (flight) => {
    if (flight.price) {
      return searchParams.class === 'business' ? flight.price.business : flight.price.economy
    }
    return searchParams.class === 'business' ? 3600000 : 1200000
  }

  const formatPrice = (flight) => {
    return getFlightPrice(flight).toLocaleString('vi-VN')
  }

  const getDurationInMinutes = (flight) => {
    if (flight.duration) {
      const match = flight.duration.match(/(\d+)h\s*(\d+)m/)
      if (match) {
        return parseInt(match[1]) * 60 + parseInt(match[2])
      }
    }
    return 135 // 2h 15m default
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

  const getUniqueAirlines = () => {
    const airlines = flights.map(flight => ({
      code: flight.airline.iataCode,
      name: flight.airline.name
    }))
    return airlines.filter((airline, index, self) => 
      index === self.findIndex(a => a.code === airline.code)
    )
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 10000000],
      airlines: [],
      departureTime: [],
      stops: 'all'
    })
  }

  const handleSelectFlight = (flight) => {
    const convertedFlight = {
      id: flight.flight.iataNumber,
      airline: flight.airline.name,
      airlineLogo: getAirlineLogo(flight.airline.iataCode),
      flightNumber: flight.flight.iataNumber,
      from: {
        city: flight.departure.iataCode,
        code: flight.departure.iataCode,
        time: formatTime(flight.departure.scheduledTime),
        date: searchParams.departureDate,
      },
      to: {
        city: flight.arrival.iataCode,
        code: flight.arrival.iataCode,
        time: formatTime(flight.arrival.scheduledTime),
        date: searchParams.departureDate,
      },
      duration: flight.duration || '2h 15m',
      price: getFlightPrice(flight),
      availableSeats: Math.floor(Math.random() * 50) + 20,
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
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 text-lg">Đang tìm kiếm chuyến bay tốt nhất...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with search summary */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {searchParams?.from} → {searchParams?.to}
              </h1>
              <p className="text-gray-600 mt-1">
                {searchParams?.departureDate} • {searchParams?.passengers} hành khách • 
                {searchParams?.class === 'business' ? ' Hạng thương gia' : ' Hạng phổ thông'}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="hidden md:block"
            >
              Tìm kiếm mới
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile filter toggle */}
                     <div className="lg:hidden">
             <Button
               onClick={() => setShowFilters(!showFilters)}
               className="w-full mb-4"
               variant="outline"
             >
               <span className="flex items-center justify-center gap-2">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                 </svg>
                 {showFilters ? 'Ẩn bộ lọc' : 'Hiển thị bộ lọc'} ({filteredFlights.length} kết quả)
               </span>
             </Button>
           </div>

          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                             <div className="flex items-center justify-between mb-6">
                 <h2 className="text-lg font-semibold text-gray-900">Bộ lọc</h2>
                 <Button
                   onClick={resetFilters}
                   variant="ghost"
                   size="sm"
                   className="text-blue-600 hover:text-blue-700 text-sm font-medium p-1"
                 >
                   Xóa tất cả
                 </Button>
               </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Khoảng giá</h3>
                <div className="space-y-2">
                                     <input
                     type="range"
                     min="0"
                     max="10000000"
                     step="100000"
                     value={filters.priceRange[1]}
                     onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                     style={{
                       background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(filters.priceRange[1] / 10000000) * 100}%, #e5e7eb ${(filters.priceRange[1] / 10000000) * 100}%, #e5e7eb 100%)`
                     }}
                   />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0đ</span>
                    <span>{filters.priceRange[1].toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>

              {/* Airlines Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Hãng hàng không</h3>
                <div className="space-y-2">
                  {getUniqueAirlines().map(airline => (
                    <label key={airline.code} className="flex items-center">
                                             <input
                         type="checkbox"
                         checked={filters.airlines.includes(airline.code)}
                         onChange={(e) => {
                           if (e.target.checked) {
                             handleFilterChange('airlines', [...filters.airlines, airline.code])
                           } else {
                             handleFilterChange('airlines', filters.airlines.filter(a => a !== airline.code))
                           }
                         }}
                         className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                       />
                      <span className="ml-2 text-sm text-gray-700">{airline.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Departure Time Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Giờ khởi hành</h3>
                <div className="space-y-2">
                  {[
                    { value: 'morning', label: 'Sáng (06:00 - 12:00)', icon: '🌅' },
                    { value: 'afternoon', label: 'Chiều (12:00 - 18:00)', icon: '☀️' },
                    { value: 'evening', label: 'Tối (18:00 - 24:00)', icon: '🌆' },
                    { value: 'night', label: 'Đêm (00:00 - 06:00)', icon: '🌙' }
                  ].map(time => (
                    <label key={time.value} className="flex items-center">
                      <input
                                                 type="checkbox"
                         checked={filters.departureTime.includes(time.value)}
                         onChange={(e) => {
                           if (e.target.checked) {
                             handleFilterChange('departureTime', [...filters.departureTime, time.value])
                           } else {
                             handleFilterChange('departureTime', filters.departureTime.filter(t => t !== time.value))
                           }
                         }}
                         className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {time.icon} {time.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-gray-700">
                  <span className="font-medium">{filteredFlights.length}</span> chuyến bay được tìm thấy
                </div>
                                 <div className="flex items-center gap-2">
                   <span className="text-sm text-gray-600">Sắp xếp theo:</span>
                   <select
                     value={sortBy}
                     onChange={(e) => setSortBy(e.target.value)}
                     className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                   >
                     <option value="price">Giá thấp nhất</option>
                     <option value="duration">Thời gian bay</option>
                     <option value="departure">Khởi hành sớm nhất</option>
                     <option value="arrival">Đến sớm nhất</option>
                   </select>
                 </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Flight Results */}
            {filteredFlights.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <div className="text-gray-400 text-6xl mb-4">✈️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy chuyến bay phù hợp
                </h3>
                <p className="text-gray-600 mb-4">
                  Thử điều chỉnh bộ lọc hoặc tìm kiếm với thông tin khác
                </p>
                                 <Button onClick={resetFilters} variant="outline">
                   Xóa tất cả bộ lọc
                 </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFlights.map((flight, index) => (
                  <div key={flight.flight.iataNumber + index} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        {/* Airline Info */}
                        <div className="flex items-center gap-3">
                          <img
                            src={getAirlineLogo(flight.airline.iataCode)}
                            alt={flight.airline.name}
                            className="h-12 w-12 object-contain"
                            onError={(e) => {
                              e.target.src = '/images/airlines/default.png'
                            }}
                          />
                          <div>
                            <h3 className="font-medium text-gray-900">{flight.airline.name}</h3>
                            <p className="text-sm text-gray-500">{flight.flight.iataNumber}</p>
                          </div>
                        </div>

                        {/* Flight Details */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                          {/* Departure */}
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {formatTime(flight.departure.scheduledTime)}
                            </div>
                            <div className="text-sm font-medium text-gray-600">
                              {flight.departure.iataCode}
                            </div>
                          </div>

                          {/* Duration & Route */}
                          <div className="flex-1 text-center">
                            <div className="text-sm text-gray-500 mb-1">
                              {flight.duration || '2h 15m'}
                            </div>
                            <div className="flex items-center justify-center">
                              <div className="flex-1 border-t border-gray-300"></div>
                              <div className="px-3">
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              </div>
                              <div className="flex-1 border-t border-gray-300"></div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">Bay thẳng</div>
                          </div>

                          {/* Arrival */}
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {formatTime(flight.arrival.scheduledTime)}
                            </div>
                            <div className="text-sm font-medium text-gray-600">
                              {flight.arrival.iataCode}
                            </div>
                          </div>
                        </div>

                        {/* Price & Book Button */}
                        <div className="text-center lg:text-right">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {formatPrice(flight)}đ
                          </div>
                          <div className="text-sm text-gray-500 mb-3">
                            {searchParams?.class === 'business' ? 'Hạng thương gia' : 'Hạng phổ thông'}
                          </div>
                          <Button
                            onClick={() => handleSelectFlight(flight)}
                            className="w-full lg:w-auto"
                          >
                            Chọn chuyến bay
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 