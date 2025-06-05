import { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus, FaSearch, FaUserShield, FaUser } from 'react-icons/fa'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function UsersManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    is_superuser: false
  })

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setTimeout(() => {
        const mockUsers = [
          {
            id: '550e8400-e29b-41d4-a716-446655440001',
            name: 'Nguyễn Văn A',
            email: 'admin@example.com',
            created_at: '2024-01-15T10:30:00Z',
            is_superuser: true
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440002',
            name: 'Trần Thị B', 
            email: 'user1@example.com',
            created_at: '2024-01-20T14:20:00Z',
            is_superuser: false
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440003',
            name: 'Lê Văn C',
            email: 'user2@example.com',
            created_at: '2024-02-01T09:15:00Z',
            is_superuser: false
          }
        ]
        setUsers(mockUsers)
        setLoading(false)
      }, 1000)
    }
    fetchUsers()
  }, [])

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      is_superuser: user.is_superuser
    })
    setShowModal(true)
  }

  const handleDelete = (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ))
    } else {
      const newUser = {
        id: crypto.randomUUID(),
        ...formData,
        created_at: new Date().toISOString()
      }
      setUsers([...users, newUser])
    }
    
    setShowModal(false)
    setEditingUser(null)
    setFormData({ name: '', email: '', is_superuser: false })
  }

  const handleAddNew = () => {
    setEditingUser(null)
    setFormData({ name: '', email: '', is_superuser: false })
    setShowModal(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 text-lg">Đang tải dữ liệu...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý người dùng</h1>
          <p className="text-gray-600">Quản lý thông tin và quyền hạn của người dùng trong hệ thống</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <FaPlus className="w-4 h-4" />
            Thêm người dùng
          </Button>
        </div>

        <Card>
          <Card.Body className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Người dùng
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quyền hạn
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày tạo
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            {user.is_superuser ? (
                              <FaUserShield className="w-5 h-5 text-white" />
                            ) : (
                              <FaUser className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {user.id.slice(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.is_superuser
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.is_superuser ? 'Quản trị viên' : 'Người dùng'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(user)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <FaEdit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FaTrash className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <FaUser className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không tìm thấy người dùng
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm ? 'Thử thay đổi từ khóa tìm kiếm' : 'Chưa có người dùng nào trong hệ thống'}
                  </p>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên đầy đủ
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.is_superuser}
                        onChange={(e) => setFormData({...formData, is_superuser: e.target.checked})}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Quyền quản trị viên
                      </span>
                    </label>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowModal(false)}
                    >
                      Hủy
                    </Button>
                    <Button type="submit">
                      {editingUser ? 'Cập nhật' : 'Thêm mới'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 