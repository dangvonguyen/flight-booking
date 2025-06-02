import React, { useState } from 'react';
import { FlightList } from '../components/FlightList';
import { FilterPanel } from '../components/FilterPanel';
import { LoadingSpinner } from '../components/LoadingSpinner';

const FlightSearch: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Kết Quả Tìm Kiếm</h2>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <FilterPanel />
        </div>
        <div className="col-span-9">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <FlightList flights={flights} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightSearch; 