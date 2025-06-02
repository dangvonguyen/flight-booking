import React from 'react';
import { SearchForm } from '../components/SearchForm';
import { PromotionList } from '../components/PromotionList';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Đặt Vé Máy Bay</h1>
      <SearchForm />
      <PromotionList />
    </div>
  );
};

export default Home; 