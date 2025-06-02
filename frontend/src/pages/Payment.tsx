import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { paymentService } from '../services/paymentService';

interface PaymentDetails {
  amount: number;
  bookingId: string;
  flightInfo: {
    from: string;
    to: string;
    date: string;
    time: string;
  };
}

const Payment: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!bookingId) {
        setError('Booking ID is required');
        setLoading(false);
        return;
      }

      try {
        const response = await paymentService.getPaymentDetails(bookingId);
        setPaymentDetails(response.data);
      } catch (err) {
        setError('Failed to load payment details');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [bookingId]);

  const handlePayment = async () => {
    if (!bookingId) {
      setError('Booking ID is required');
      return;
    }

    try {
      const response = await paymentService.createVNPayPayment(bookingId);
      if (response?.data?.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      }
    } catch (err) {
      setError('Failed to initiate payment');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!paymentDetails) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold mb-6">Thanh Toán</h2>
        
        <div className="space-y-4 mb-8">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-4">Thông tin chuyến bay</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Điểm đi</p>
                <p className="font-medium">{paymentDetails.flightInfo.from}</p>
              </div>
              <div>
                <p className="text-gray-600">Điểm đến</p>
                <p className="font-medium">{paymentDetails.flightInfo.to}</p>
              </div>
              <div>
                <p className="text-gray-600">Ngày bay</p>
                <p className="font-medium">{paymentDetails.flightInfo.date}</p>
              </div>
              <div>
                <p className="text-gray-600">Giờ bay</p>
                <p className="font-medium">{paymentDetails.flightInfo.time}</p>
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-4">Chi tiết thanh toán</h3>
            <div className="flex justify-between items-center">
              <span className="text-lg">Tổng tiền:</span>
              <span className="text-2xl font-bold text-blue-600">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(paymentDetails.amount)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handlePayment}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
            disabled={loading}
          >
            <img
              src="/vnpay-logo.png"
              alt="VNPay"
              className="h-6 mr-2"
            />
            {loading ? 'Đang xử lý...' : 'Thanh toán qua VNPay'}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment; 