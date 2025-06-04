import React from 'react'
const feedbacks = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@gmail.com', message: 'Dịch vụ rất tốt!', date: '2024-06-01' },
  { id: 2, name: 'Trần Thị B', email: 'b@gmail.com', message: 'Tôi muốn góp ý về giao diện.', date: '2024-06-02' },
  { id: 3, name: 'Lê Văn C', email: 'c@gmail.com', message: 'Hỗ trợ khách hàng nhanh.', date: '2024-06-03' },
]
export default function FeedbackManagement() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quản lý khiếu nại, góp ý</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Tên</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Nội dung</th>
              <th className="px-4 py-2 text-left">Ngày gửi</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(fb => (
              <tr key={fb.id} className="border-t">
                <td className="px-4 py-2 font-medium">{fb.name}</td>
                <td className="px-4 py-2">{fb.email}</td>
                <td className="px-4 py-2">{fb.message}</td>
                <td className="px-4 py-2 text-sm text-gray-500">{fb.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 