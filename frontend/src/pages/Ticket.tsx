import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { ticketService } from '../services/ticketService';
import type { Ticket } from '../types/ticket';

const Ticket: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      if (!bookingId) {
        setError('Booking ID is required');
        setLoading(false);
        return;
      }

      try {
        const response = await ticketService.getTicketDetails(bookingId);
        // Tạo một object Ticket từ response
        const ticketData: Ticket = {
          id: bookingId,
          bookingId: bookingId,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          details: response.data
        };
        setTicket(ticketData);
      } catch (err) {
        setError('Failed to load ticket details');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [bookingId]);

  const handleDownload = async () => {
    if (!bookingId) return;
    
    setDownloading(true);
    try {
      await ticketService.downloadTicketPDF(bookingId);
    } catch (err) {
      setError('Failed to download ticket');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!ticket) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4">
          <h2 className="text-2xl font-bold">Vé Máy Bay</h2>
          <p className="text-sm opacity-80">Mã đặt chỗ: {bookingId}</p>
        </div>

        {/* Ticket Content */}
        <div className="p-6 space-y-6">
          {/* Passenger Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Thông tin hành khách</h3>
            <p className="text-xl">{ticket.details.passengerName}</p>
          </div>

          {/* Flight Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600">Chuyến bay</p>
              <p className="font-medium">{ticket.details.flightNumber}</p>
            </div>
            <div>
              <p className="text-gray-600">Cổng</p>
              <p className="font-medium">{ticket.details.gate}</p>
            </div>
            <div>
              <p className="text-gray-600">Ghế</p>
              <p className="font-medium">{ticket.details.seat}</p>
            </div>
          </div>

          {/* Route Info */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-gray-600">Từ</p>
              <p className="font-medium">{ticket.details.from}</p>
            </div>
            <div className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-gray-600">Đến</p>
              <p className="font-medium">{ticket.details.to}</p>
            </div>
          </div>

          {/* Time Info */}
          <div>
            <p className="text-gray-600">Thời gian</p>
            <p className="font-medium">
              {ticket.details.departureDate} - {ticket.details.departureTime}
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center py-4">
            <QRCode value={ticket.details.barcode} size={150} />
          </div>
        </div>

        {/* Actions */}
        <div className="border-t px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {downloading ? 'Đang tải...' : 'Tải vé'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket; 