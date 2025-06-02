import React from 'react';

interface Seat {
  id: string;
  number: string;
  class: 'economy' | 'business' | 'first';
  status: 'available' | 'occupied' | 'selected';
}

interface SeatMapProps {
  seats: Seat[];
  selectedSeat?: string;
  onSelectSeat: (seatId: string) => void;
}

export const SeatMap: React.FC<SeatMapProps> = ({
  seats,
  selectedSeat,
  onSelectSeat,
}) => {
  const getStatusColor = (status: Seat['status'], seatClass: Seat['class']) => {
    if (status === 'occupied') return 'bg-gray-400 cursor-not-allowed';
    if (status === 'selected') return 'bg-blue-600 text-white';
    
    switch (seatClass) {
      case 'first':
        return 'bg-purple-100 hover:bg-purple-200';
      case 'business':
        return 'bg-indigo-100 hover:bg-indigo-200';
      default:
        return 'bg-green-100 hover:bg-green-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Chọn ghế ngồi</h3>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-100 border border-gray-300 rounded mr-2"></div>
            <span>Ghế thường</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-indigo-100 border border-gray-300 rounded mr-2"></div>
            <span>Ghế thương gia</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-purple-100 border border-gray-300 rounded mr-2"></div>
            <span>Ghế hạng nhất</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-400 border border-gray-300 rounded mr-2"></div>
            <span>Đã đặt</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => seat.status !== 'occupied' && onSelectSeat(seat.id)}
            disabled={seat.status === 'occupied'}
            className={`
              w-12 h-12 rounded-lg border border-gray-300 
              flex items-center justify-center
              font-medium transition-colors
              ${getStatusColor(seat.status, seat.class)}
              ${selectedSeat === seat.id ? 'ring-2 ring-blue-500' : ''}
            `}
          >
            {seat.number}
          </button>
        ))}
      </div>
    </div>
  );
}; 