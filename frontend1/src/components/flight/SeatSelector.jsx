import { useState } from 'react'
import Card from '../ui/Card'
import Button from '../ui/Button'

const SeatSelector = ({ seats, selectedSeat, onSelect }) => {
  const [hoveredSeat, setHoveredSeat] = useState(null)

  const getSeatStatus = (seat) => {
    if (seat.isOccupied) return 'occupied'
    if (seat.number === selectedSeat) return 'selected'
    if (seat.number === hoveredSeat) return 'hovered'
    return 'available'
  }

  const getSeatClass = (status) => {
    switch (status) {
      case 'occupied':
        return 'bg-gray-300 cursor-not-allowed'
      case 'selected':
        return 'bg-primary-600 text-white cursor-pointer'
      case 'hovered':
        return 'bg-primary-100 cursor-pointer'
      default:
        return 'bg-white border border-gray-300 hover:border-primary-500 cursor-pointer'
    }
  }

  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-medium text-gray-900">Chọn ghế ngồi</h3>
      </Card.Header>
      <Card.Body>
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-8 bg-gray-200 rounded-t-lg" />
          </div>
          <div className="grid grid-cols-6 gap-2">
            {seats.map((seat) => {
              const status = getSeatStatus(seat)
              return (
                <button
                  key={seat.number}
                  className={`
                    w-12 h-12 rounded-lg
                    flex items-center justify-center
                    font-medium text-sm
                    transition-colors duration-200
                    ${getSeatClass(status)}
                  `}
                  disabled={seat.isOccupied}
                  onClick={() => !seat.isOccupied && onSelect(seat.number)}
                  onMouseEnter={() => setHoveredSeat(seat.number)}
                  onMouseLeave={() => setHoveredSeat(null)}
                >
                  {seat.number}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-2" />
            <span className="text-sm text-gray-600">Có sẵn</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-primary-600 rounded mr-2" />
            <span className="text-sm text-gray-600">Đã chọn</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded mr-2" />
            <span className="text-sm text-gray-600">Đã đặt</span>
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Ghế đã chọn</p>
            <p className="text-lg font-medium text-gray-900">
              {selectedSeat || 'Chưa chọn'}
            </p>
          </div>
          <Button
            disabled={!selectedSeat}
            onClick={() => onSelect(selectedSeat)}
          >
            Xác nhận
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default SeatSelector 