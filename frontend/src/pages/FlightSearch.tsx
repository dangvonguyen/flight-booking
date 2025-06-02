import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { flightService } from '../services/flightService';
import type { Airport, Flight, SearchFlightParams } from '../types/flight';

export const FlightSearch: React.FC = () => {
  const navigate = useNavigate();
  const [airports, setAirports] = useState<Airport[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<SearchFlightParams>({
    from: '',
    to: '',
    date: ''
  });

  useEffect(() => {
    const loadAirports = async () => {
      try {
        const response = await flightService.getAirports();
        setAirports(response);
      } catch (err) {
        setError('Không thể tải danh sách sân bay');
      }
    };
    loadAirports();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await flightService.searchFlights(formData);
      setFlights(response);
    } catch (err) {
      setError('Không thể tìm kiếm chuyến bay');
    } finally {
      setLoading(false);
    }
  };

  const handleBookFlight = (flightId: string) => {
    navigate(`/booking/${flightId}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Form tìm kiếm */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Tìm chuyến bay</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sân bay đi
              </label>
              <select
                value={formData.from}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  from: e.target.value
                }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              >
                <option value="">Chọn sân bay</option>
                {airports.map(airport => (
                  <option key={airport.id} value={airport.id}>
                    {airport.city} ({airport.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sân bay đến
              </label>
              <select
                value={formData.to}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  to: e.target.value
                }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              >
                <option value="">Chọn sân bay</option>
                {airports.map(airport => (
                  <option key={airport.id} value={airport.id}>
                    {airport.city} ({airport.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày bay
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  date: e.target.value
                }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {loading ? 'Đang tìm...' : 'Tìm chuyến bay'}
            </button>
          </div>
        </form>
      </div>

      {/* Hiển thị lỗi */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-8">
          {error}
        </div>
      )}

      {/* Danh sách chuyến bay */}
      {flights.length > 0 && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {flights.map(flight => (
              <div key={flight.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-lg font-semibold">{flight.airline}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">{flight.flightNumber}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Khởi hành</p>
                        <p className="font-medium">{flight.departureAirport.city}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(flight.departureTime).toLocaleString('vi-VN')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Hạ cánh</p>
                        <p className="font-medium">{flight.arrivalAirport.city}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(flight.arrivalTime).toLocaleString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary mb-2">
                      {formatPrice(flight.price)}
                    </p>
                    <button
                      onClick={() => handleBookFlight(flight.id)}
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Đặt vé
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 