import React from 'react';
import { useParams } from 'react-router-dom';
import { FlightInfo } from '../components/FlightInfo';
import { PriceTable } from '../components/PriceTable';
import { BookingButton } from '../components/BookingButton';

const FlightDetails: React.FC = () => {
  const { flightId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Chi Tiết Chuyến Bay</h2>
      <FlightInfo flightId={flightId} />
      <PriceTable flightId={flightId} />
      <div className="mt-8 text-center">
        <BookingButton flightId={flightId} />
      </div>
    </div>
  );
};

export default FlightDetails; 