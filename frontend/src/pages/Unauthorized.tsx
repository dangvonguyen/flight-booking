import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button/Button';

export const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-red-600">403</h1>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900">
            Không có quyền truy cập
          </h2>
          <p className="mt-2 text-gray-600">
            Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên để được hỗ trợ.
          </p>
        </div>
        <div>
          <Button
            variant="primary"
            onClick={() => navigate(-1)}
            className="mx-2"
          >
            Quay lại
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mx-2"
          >
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}; 