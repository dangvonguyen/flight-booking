import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalBookings: 856,
    totalRevenue: 2450000000,
    monthlyRevenue: 245000000,
    occupancyRate: 78.5
  })

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const monthlyRevenueData = [
    { month: 'T1', vietnam_airlines: 45000000, vietjet: 38000000, bamboo_airways: 22000000, pacific_airlines: 15000000 },
    { month: 'T2', vietnam_airlines: 52000000, vietjet: 41000000, bamboo_airways: 28000000, pacific_airlines: 18000000 },
    { month: 'T3', vietnam_airlines: 48000000, vietjet: 43000000, bamboo_airways: 25000000, pacific_airlines: 20000000 },
    { month: 'T4', vietnam_airlines: 55000000, vietjet: 47000000, bamboo_airways: 32000000, pacific_airlines: 22000000 },
    { month: 'T5', vietnam_airlines: 62000000, vietjet: 52000000, bamboo_airways: 35000000, pacific_airlines: 25000000 },
    { month: 'T6', vietnam_airlines: 58000000, vietjet: 49000000, bamboo_airways: 38000000, pacific_airlines: 28000000 }
  ]

  const occupancyRates = [
    { airline: 'Vietnam Airlines', rate: 85.2, flights: 142 },
    { airline: 'VietJet Air', rate: 78.6, flights: 156 },
    { airline: 'Bamboo Airways', rate: 72.4, flights: 98 },
    { airline: 'Pacific Airlines', rate: 69.8, flights: 87 }
  ]

  const recentUsers = [
    { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@email.com', joinDate: '15/12/2024', status: 'active' },
    { id: 2, name: 'Trần Thị Bình', email: 'binh.tran@email.com', joinDate: '14/12/2024', status: 'active' },
    { id: 3, name: 'Lê Hoàng Cường', email: 'cuong.le@email.com', joinDate: '13/12/2024', status: 'pending' },
    { id: 4, name: 'Phạm Minh Đức', email: 'duc.pham@email.com', joinDate: '12/12/2024', status: 'active' },
    { id: 5, name: 'Hoàng Thị Em', email: 'em.hoang@email.com', joinDate: '11/12/2024', status: 'inactive' }
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  const StatCard = ({ title, value, icon, color, change }) => (
    <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <Card.Body className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <p className={`text-sm mt-2 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change > 0 ? '↗' : '↘'} {Math.abs(change)}% so với tháng trước
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            {icon}
          </div>
        </div>
      </Card.Body>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white/60 backdrop-blur-lg rounded-xl p-2 mb-8">
          <nav className="flex space-x-2">
            {[
              { id: 'dashboard', name: 'Tổng quan', icon: '📊' },
              { id: 'users', name: 'Quản lý người dùng', icon: '👥' },
              { id: 'revenue', name: 'Thống kê doanh thu', icon: '💰' },
              { id: 'occupancy', name: 'Tỷ lệ lắp đầy', icon: '✈️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                    : 'text-gray-500 bg-gray-100/50 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Tổng số người dùng"
                value={stats.totalUsers.toLocaleString()}
                change={12.5}
                color="bg-blue-100"
                icon={
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11.5 0v1a5 5 0 00-10 0v-1z" />
                  </svg>
                }
              />
              <StatCard
                title="Tổng số đặt vé"
                value={stats.totalBookings.toLocaleString()}
                change={8.2}
                color="bg-green-100"
                icon={
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                }
              />
              <StatCard
                title="Doanh thu tháng này"
                value={formatCurrency(stats.monthlyRevenue)}
                change={15.3}
                color="bg-yellow-100"
                icon={
                  <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                }
              />
              <StatCard
                title="Tỷ lệ lắp đầy TB"
                value={`${stats.occupancyRate}%`}
                change={-2.1}
                color="bg-purple-100"
                icon={
                  <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
              />
            </div>
          </div>
        )}

        {/* User Management */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg">
              <Card.Body className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Quản lý người dùng</h3>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    Thêm người dùng
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người dùng</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tham gia</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">{user.name.charAt(0)}</span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' :
                              user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {user.status === 'active' ? 'Hoạt động' :
                               user.status === 'pending' ? 'Chờ duyệt' : 'Không hoạt động'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3 bg-white">Sửa</button>
                            <button className="text-red-600 hover:text-red-900 bg-white">Xóa</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}

        {/* Revenue Statistics */}
        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg">
              <Card.Body className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Thống kê doanh thu theo hãng máy bay</h3>
                
                <div className="space-y-6">
                  {monthlyRevenueData.map((month) => (
                    <div key={month.month} className="border border-gray-200 rounded-xl p-6 bg-white/60 backdrop-blur-sm">
                      <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        Tháng {month.month}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div className="group relative overflow-hidden bg-white p-6 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:scale-105">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10"></div>
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-blue-600">Vietnam Airlines</p>
                                <p className="text-xs text-gray-500">Hãng hàng đầu</p>
                              </div>
                            </div>
                            <p className="text-xl font-bold text-gray-900">{formatCurrency(month.vietnam_airlines)}</p>
                          </div>
                        </div>
                        
                        <div className="group relative overflow-hidden bg-white p-6 rounded-xl border border-green-200 hover:border-green-300 transition-all duration-300 hover:scale-105">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-10 -mt-10"></div>
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-green-600">VietJet Air</p>
                                <p className="text-xs text-gray-500">Giá cạnh tranh</p>
                              </div>
                            </div>
                            <p className="text-xl font-bold text-gray-900">{formatCurrency(month.vietjet)}</p>
                          </div>
                        </div>
                        
                        <div className="group relative overflow-hidden bg-white p-6 rounded-xl border border-yellow-200 hover:border-yellow-300 transition-all duration-300 hover:scale-105">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-full -mr-10 -mt-10"></div>
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-yellow-600">Bamboo Airways</p>
                                <p className="text-xs text-gray-500">Dịch vụ cao cấp</p>
                              </div>
                            </div>
                            <p className="text-xl font-bold text-gray-900">{formatCurrency(month.bamboo_airways)}</p>
                          </div>
                        </div>
                        
                        <div className="group relative overflow-hidden bg-white p-6 rounded-xl border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:scale-105">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10"></div>
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-purple-600">Pacific Airlines</p>
                                <p className="text-xs text-gray-500">Tuyến nội địa</p>
                              </div>
                            </div>
                            <p className="text-xl font-bold text-gray-900">{formatCurrency(month.pacific_airlines)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        )}

        {/* Occupancy Rates */}
        {activeTab === 'occupancy' && (
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg">
              <Card.Body className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Tỷ lệ lắp đầy chuyến bay</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {occupancyRates.map((airline, index) => (
                    <div key={index} className="group relative overflow-hidden bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300">
                      {/* Background decoration */}
                      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 opacity-10 ${
                        airline.rate >= 80 ? 'bg-green-500' :
                        airline.rate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      
                      <div className="relative">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              airline.rate >= 80 ? 'bg-green-100' :
                              airline.rate >= 70 ? 'bg-yellow-100' : 'bg-red-100'
                            }`}>
                              <svg className={`w-6 h-6 ${
                                airline.rate >= 80 ? 'text-green-600' :
                                airline.rate >= 70 ? 'text-yellow-600' : 'text-red-600'
                              }`} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-gray-900">{airline.airline}</h4>
                              <p className="text-sm text-gray-500 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                {airline.flights} chuyến bay
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-3xl font-bold ${
                              airline.rate >= 80 ? 'text-green-600' :
                              airline.rate >= 70 ? 'text-yellow-600' : 'text-red-600'
                            }`}>{airline.rate}%</p>
                            <p className="text-sm text-gray-500">Tỷ lệ lắp đầy</p>
                          </div>
                        </div>
                        
                        {/* Progress bar with better styling */}
                        <div className="space-y-2">
                          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div 
                              className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                                airline.rate >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                                airline.rate >= 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                                'bg-gradient-to-r from-red-400 to-red-600'
                              }`}
                              style={{ width: `${airline.rate}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>0%</span>
                            <span className={`font-medium ${
                              airline.rate >= 80 ? 'text-green-600' :
                              airline.rate >= 70 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {airline.rate >= 80 ? 'Xuất sắc' :
                               airline.rate >= 70 ? 'Tốt' : 'Cần cải thiện'}
                            </span>
                            <span>100%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Analysis summary with modern design */}
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-blue-900">Phân tích tỷ lệ lắp đầy</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-sm text-blue-800">Vietnam Airlines dẫn đầu với tỷ lệ lắp đầy cao nhất (85.2%)</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-sm text-blue-800">VietJet Air đạt tỷ lệ tốt với 78.6% và số chuyến bay nhiều nhất</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <p className="text-sm text-blue-800">Bamboo Airways và Pacific Airlines cần cải thiện tỷ lệ lắp đầy</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <p className="text-sm text-blue-800">Tỷ lệ lắp đầy trung bình toàn ngành: 76.5%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
} 