import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { SeatMap } from '../components/SeatMap';
import { seatService } from '../services/seatService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import type { Seat } from '../services/seatService';
import { flightService } from '../services/flightService';

const schema = yup.object().shape({
  firstName: yup.string().required('Họ là bắt buộc'),
  lastName: yup.string().required('Tên là bắt buộc'),
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ').required('Số điện thoại là bắt buộc'),
  idNumber: yup.string().required('Số CMND/CCCD là bắt buộc'),
});

const BookingForm: React.FC = () => {
  const navigate = useNavigate();
  const { flightId } = useParams<{ flightId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<string>();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    loadSeats();
  }, [flightId]);

  const loadSeats = async () => {
    try {
      if (!flightId) return;
      const flightSeats = await seatService.getFlightSeats(flightId);
      setSeats(flightSeats);
    } catch (err) {
      setError('Không thể tải thông tin ghế ngồi');
    } finally {
      setLoading(false);
    }
  };

  const handleSeatSelect = async (seatId: string) => {
    try {
      if (!flightId) return;
      
      // Nếu đã chọn ghế khác trước đó, hủy đặt ghế cũ
      if (selectedSeat) {
        await seatService.cancelSeatReservation(flightId, selectedSeat);
      }

      // Đặt ghế mới
      await seatService.reserveSeat(flightId, seatId);
      setSelectedSeat(seatId);
    } catch (err) {
      setError('Không thể đặt ghế. Vui lòng thử lại.');
    }
  };

  const onSubmit = async (formData: any) => {
    if (!flightId) {
      setError('Không tìm thấy ID chuyến bay');
      return;
    }

    try {
      setLoading(true);
      const response = await flightService.createBooking(flightId, formData);
      navigate(`/payment/${response.bookingId}`);
    } catch (err) {
      setError('Không thể đặt vé');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Thông Tin Đặt Vé</h2>
      
      {/* Seat Selection */}
      <div className="mb-8">
        <SeatMap
          seats={seats}
          selectedSeat={selectedSeat}
          onSelectSeat={handleSeatSelect}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ</label>
            <input
              type="text"
              {...register('firstName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tên</label>
            <input
              type="text"
              {...register('lastName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              type="tel"
              {...register('phone')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Số CMND/CCCD</label>
            <input
              type="text"
              {...register('idNumber')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.idNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.idNumber.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Tiếp tục thanh toán
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm; 