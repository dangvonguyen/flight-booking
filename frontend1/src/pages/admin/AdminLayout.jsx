import AdminNavbar from '../../components/layout/AdminNavbar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNavbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  )
} 