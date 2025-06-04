import { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { mockBookings, mockFlights } from '../../mocks/flightData'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  // Tính toán thống kê
  const totalBookings = mockBookings.length
  const totalRevenue = mockBookings.reduce((sum, booking) => sum + booking.totalAmount, 0)
  const confirmedBookings = mockBookings.filter(b => b.status === 'confirmed').length
  const cancelledBookings = mockBookings.filter(b => b.status === 'cancelled').length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => setActiveTab('overview')}>
              Tổng quan
            </Button>
            <Button variant="outline" onClick={() => setActiveTab('users')}>
              Quản lý người dùng
            </Button>
            <Button variant="outline" onClick={() => setActiveTab('flights')}>
              Quản lý chuyến bay
            </Button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium text-gray-900">Tổng đặt vé</h3>
                <p className="text-3xl font-bold text-primary-600 mt-2">{totalBookings}</p>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium text-gray-900">Doanh thu</h3>
                <p className="text-3xl font-bold text-primary-600 mt-2">
                  {totalRevenue.toLocaleString('vi-VN')}đ
                </p>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium text-gray-900">Đã xác nhận</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">{confirmedBookings}</p>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium text-gray-900">Đã hủy</h3>
                <p className="text-3xl font-bold text-red-600 mt-2">{cancelledBookings}</p>
              </Card.Body>
            </Card>
          </div>
        )}

        {activeTab === 'users' && (
          <Card>
            <Card.Body>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Danh sách người dùng</h2>
                <Button>Thêm người dùng</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vai trò
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Mock data */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Nguyễn Văn A</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">nguyenvana@example.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          User
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="outline" className="text-red-600 hover:bg-red-50">
                          Khóa
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        )}

        {activeTab === 'flights' && (
          <Card>
            <Card.Body>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Quản lý chuyến bay</h2>
                <Button>Thêm chuyến bay</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mã chuyến
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hãng hàng không
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Điểm đi
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Điểm đến
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Giá
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockFlights.map((flight) => (
                      <tr key={flight.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{flight.flightNumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{flight.airline}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{flight.from.city}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{flight.to.city}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {flight.price.toLocaleString('vi-VN')}đ
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="outline" className="mr-2">
                            Sửa
                          </Button>
                          <Button variant="outline" className="text-red-600 hover:bg-red-50">
                            Xóa
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  )
} 