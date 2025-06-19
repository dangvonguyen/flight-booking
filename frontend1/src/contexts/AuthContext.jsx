import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

// Tài khoản test
const testUsers = [
  {
    id: 1,
    email: 'user@example.com',
    password: '123456',
    firstName: 'Normal',
    lastName: 'User',
    role: 'user'
  }
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const isAdmin = localStorage.getItem('isAdmin')
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setRole(parsedUser.role)
    }
    
    // Kiểm tra nếu là admin
    if (isAdmin === 'true') {
      const adminUser = {
        email: 'admin@flightbooking.com',
        firstName: 'Admin',
        lastName: 'System',
        role: 'admin'
      }
      setUser(adminUser)
      setRole('admin')
    }
    
    setIsLoading(false)
  }, [])

  const login = (email, password) => {
    // Kiểm tra admin credentials
    if (email === 'admin@flightbooking.com' && password === 'admin123456') {
      const adminUser = {
        email: email,
        firstName: 'Admin',
        lastName: 'System',
        role: 'admin'
      }
      
      localStorage.setItem('isAdmin', 'true')
      localStorage.setItem('user', JSON.stringify(adminUser))
      setUser(adminUser)
      setRole('admin')
      return adminUser
    }
    
    // Tìm user trong danh sách test
    const foundUser = testUsers.find(
      u => u.email === email && u.password === password
    )

    if (foundUser) {
      // Lưu thông tin user vào localStorage
      localStorage.setItem('user', JSON.stringify(foundUser))
      setUser(foundUser)
      setRole(foundUser.role)
      return foundUser // Trả về object user thay vì true
    }
    return false
  }

  const register = (userData) => {
    // Kiểm tra email đã tồn tại
    if (testUsers.some(u => u.email === userData.email)) {
      return false
    }

    // Thêm user mới vào danh sách test
    const newUser = {
      id: testUsers.length + 1,
      ...userData,
      role: 'user' // Mặc định là user
    }
    testUsers.push(newUser)
    
    // Lưu thông tin user vào localStorage
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)
    setRole('user')
    return true
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('isAdmin') // Xóa flag admin
    setUser(null)
    setRole(null)
  }

  const isAdmin = () => {
    return role === 'admin'
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, role, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 