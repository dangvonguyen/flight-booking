import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { ticketService } from '../services/ticketService';
import type { Ticket } from '../types/ticket';

const MyBookings: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await ticketService.getAllTickets();
      setTickets(response.data);
    } catch (err) {
      setError('Không thể tải danh sách vé');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelTicket = async (bookingId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy vé này?')) {
      return;
    }

    try {
      await ticketService.cancelTicket(bookingId);
      // Reload tickets after cancellation
      loadTickets();
    } catch (err) {
      setError('Không thể hủy vé. Vui lòng thử lại.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Vé Của Tôi</h2>

      {tickets.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Bạn chưa có vé nào</p>
          <Link
            to="/search"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Tìm chuyến bay
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {ticket.details.from} → {ticket.details.to}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Chuyến bay: {ticket.details.flightNumber}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      ticket.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : ticket.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {ticket.status === 'active'
                      ? 'Đang hoạt động'
                      : ticket.status === 'cancelled'
                      ? 'Đã hủy'
                      : 'Đã sử dụng'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm">
                    <span className="text-gray-600">Hành khách:</span>{' '}
                    {ticket.details.passengerName}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Ngày bay:</span>{' '}
                    {ticket.details.departureDate}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Giờ bay:</span>{' '}
                    {ticket.details.departureTime}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <Link
                    to={`/ticket/${ticket.bookingId}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Xem chi tiết
                  </Link>
                  {ticket.status === 'active' && (
                    <button
                      onClick={() => handleCancelTicket(ticket.bookingId)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Hủy vé
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings; 