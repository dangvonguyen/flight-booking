import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { flightService } from '../services/flightService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import type { Flight } from '../types/flight';

export const FlightDetails: React.FC = () => {
  const { flightId } = useParams<{ flightId: string }>();
  const navigate = useNavigate();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFlight = async () => {
      if (!flightId) {
        setError('Không tìm thấy ID chuyến bay');
        setLoading(false);
        return;
      }

      try {
        const response = await flightService.getFlightDetails(flightId);
        setFlight(response);
      } catch (err) {
        setError('Không thể tải thông tin chuyến bay');
      } finally {
        setLoading(false);
      }
    };
    fetchFlight();
  }, [flightId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return <LoadingSpinner className="mt-8" />;
  }

  if (!flight) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage
          message={error || 'Không tìm thấy chuyến bay'}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{flight.airline}</h2>
              <p className="text-gray-600">{flight.flightNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">
                {formatPrice(flight.price)}
              </p>
              <p className="text-sm text-gray-500">
                {flight.availableSeats} ghế trống
              </p>
            </div>
          </div>
        </div>

        {/* Flight Info */}
        <div className="p-6">
          <div className="flex items-start space-x-8">
            {/* Departure */}
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Khởi hành từ</div>
              <div className="font-semibold text-lg mb-1">
                {flight.departureAirport.city}
              </div>
              <div className="text-gray-600 mb-2">
                {flight.departureAirport.name} ({flight.departureAirport.code})
              </div>
              <div className="text-primary font-medium">
                {new Date(flight.departureTime).toLocaleString('vi-VN')}
              </div>
            </div>

            {/* Flight Duration */}
            <div className="flex flex-col items-center pt-6">
              <div className="w-px h-16 bg-gray-300"></div>
              <div className="text-sm text-gray-500 mt-2">
                {Math.round((new Date(flight.arrivalTime).getTime() - 
                  new Date(flight.departureTime).getTime()) / (1000 * 60))} phút
              </div>
            </div>

            {/* Arrival */}
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Hạ cánh tại</div>
              <div className="font-semibold text-lg mb-1">
                {flight.arrivalAirport.city}
              </div>
              <div className="text-gray-600 mb-2">
                {flight.arrivalAirport.name} ({flight.arrivalAirport.code})
              </div>
              <div className="text-primary font-medium">
                {new Date(flight.arrivalTime).toLocaleString('vi-VN')}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Quay lại
            </button>
            <button
              onClick={() => navigate(`/booking/${flight.id}`)}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Đặt vé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 