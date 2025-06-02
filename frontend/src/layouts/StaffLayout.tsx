import React from 'react';
import { Outlet } from 'react-router-dom';

export const StaffLayout: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Khu vực nhân viên
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý đặt vé và hỗ trợ khách hàng
          </p>
        </div>
      </div>

      <Outlet />
    </div>
  );
}; 