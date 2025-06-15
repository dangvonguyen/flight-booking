class FlightService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'
  }

  /**
   * Tìm kiếm chuyến bay từ backend API
   */
  async searchFlights(searchParams) {
    try {
      const queryParams = new URLSearchParams()
      
      if (searchParams.from) {
        queryParams.append('departure_code', searchParams.from)
      }
      if (searchParams.to) {
        queryParams.append('arrival_code', searchParams.to)
      }
      if (searchParams.departureDate) {
        queryParams.append('flight_date', searchParams.departureDate)
      }
      if (searchParams.airline) {
        queryParams.append('airline_code', searchParams.airline)
      }
      if (searchParams.minPrice) {
        queryParams.append('start_price', searchParams.minPrice.toString())
      }
      if (searchParams.maxPrice) {
        queryParams.append('end_price', searchParams.maxPrice.toString())
      }
      
      // Mặc định lấy 50 kết quả
      queryParams.append('limit', '50')
      queryParams.append('skip', '0')

      const response = await fetch(`${this.baseURL}/flights?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // Chuyển đổi dữ liệu từ backend sang format frontend mong đợi
      return {
        data: data.data.map(this.transformFlightData),
        count: data.count,
        pagination: {
          limit: 50,
          offset: 0,
          count: data.count,
          total: data.count
        }
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm chuyến bay:', error)
      throw error
    }
  }

  /**
   * Chuyển đổi dữ liệu flight từ backend sang format frontend
   */
  transformFlightData(backendFlight) {
    return {
      flight: {
        iataNumber: backendFlight.flight_number,
        number: backendFlight.flight_number
      },
      airline: {
        name: backendFlight.airline_name,
        iataCode: backendFlight.airline_code
      },
      departure: {
        iataCode: backendFlight.departure_code,
        airport: backendFlight.departure_airport,
        scheduledTime: backendFlight.departure_time,
        terminal: backendFlight.departure_terminal,
        gate: backendFlight.departure_gate
      },
      arrival: {
        iataCode: backendFlight.arrival_code,
        airport: backendFlight.arrival_airport,
        scheduledTime: backendFlight.arrival_time,
        terminal: backendFlight.arrival_terminal,
        gate: backendFlight.arrival_gate
      },
      price: {
        economy: backendFlight.price,
        business: backendFlight.price * 3 // Giả định giá business gấp 3 lần economy
      },
      duration: this.calculateDuration(backendFlight.departure_time, backendFlight.arrival_time),
      availableSeats: backendFlight.available_seats
    }
  }

  /**
   * Tính toán thời gian bay
   */
  calculateDuration(departureTime, arrivalTime) {
    const departure = new Date(departureTime)
    const arrival = new Date(arrivalTime)
    const durationMs = arrival.getTime() - departure.getTime()
    
    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${hours}h ${minutes}m`
  }

  /**
   * Lấy thông tin chi tiết một chuyến bay
   */
  async getFlightById(flightId) {
    try {
      const response = await fetch(`${this.baseURL}/flights/${flightId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return this.transformFlightData(data)
    } catch (error) {
      console.error('Lỗi khi lấy thông tin chuyến bay:', error)
      throw error
    }
  }

  /**
   * Tìm kiếm sân bay (có thể dùng service khác hoặc endpoint riêng)
   */
  async searchAirports(query) {
    // Tạm thời sử dụng aviationStackService cho airports
    // Sau này có thể tạo endpoint riêng cho airports trong backend
    const aviationStackService = (await import('./aviationStackService')).default
    return aviationStackService.searchAirports(query)
  }
}

const flightService = new FlightService()
export default flightService 