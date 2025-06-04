import { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import Button from '../ui/Button'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function TicketPrint({ booking }) {
  const ticketRef = useRef()
  const [showPreview, setShowPreview] = useState(false)

  const handlePrint = useReactToPrint({
    content: () => ticketRef.current,
    documentTitle: `Ve_${booking.bookingCode}`,
    onBeforeGetContent: () => {
      document.body.classList.add('printing')
    },
    onAfterPrint: () => {
      document.body.classList.remove('printing')
    }
  })

  const handleExportPDF = async () => {
    const element = ticketRef.current
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false
    })
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const imgWidth = 210 // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    pdf.save(`Ve_${booking.bookingCode}.pdf`)
  }

  return (
    <div className="ticket-print">
      <div className="flex space-x-4 mb-4">
        <Button onClick={() => setShowPreview(true)}>
          Xem trước
        </Button>
        <Button onClick={handlePrint}>
          In vé
        </Button>
        <Button onClick={handleExportPDF}>
          Tải PDF
        </Button>
      </div>

      {/* Modal xem trước */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Xem trước vé</h3>
              <button 
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div ref={ticketRef} className="bg-white p-8 max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900">VÉ MÁY BAY</h1>
                  <p className="text-gray-600">Mã đặt chỗ: {booking.bookingCode}</p>
                </div>

                {/* Thông tin chuyến bay */}
                <div className="border-t border-b border-gray-200 py-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Điểm đi</p>
                      <p className="text-xl font-semibold">{booking.flight.from.city}</p>
                      <p className="text-sm text-gray-600">{booking.flight.from.code}</p>
                    </div>
                    <div className="flex-1 px-4">
                      <div className="flex items-center">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <svg className="w-6 h-6 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <div className="flex-1 border-t border-gray-300"></div>
                      </div>
                      <p className="text-center text-sm text-gray-600 mt-1">
                        {booking.flight.duration}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Điểm đến</p>
                      <p className="text-xl font-semibold">{booking.flight.to.city}</p>
                      <p className="text-sm text-gray-600">{booking.flight.to.code}</p>
                    </div>
                  </div>
                </div>

                {/* Thông tin hành khách */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">Thông tin hành khách</h2>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium">
                      {booking.passenger.firstName} {booking.passenger.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Email: {booking.passenger.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      Số điện thoại: {booking.passenger.phone}
                    </p>
                  </div>
                </div>

                {/* Thông tin chuyến bay chi tiết */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">Chi tiết chuyến bay</h2>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Hãng hàng không</p>
                        <p className="font-medium">{booking.flight.airline}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Số hiệu chuyến bay</p>
                        <p className="font-medium">{booking.flight.flightNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Ngày bay</p>
                        <p className="font-medium">{new Date(booking.flight.departureTime).toLocaleDateString('vi-VN')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Giờ bay</p>
                        <p className="font-medium">{new Date(booking.flight.departureTime).toLocaleTimeString('vi-VN')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Hạng vé</p>
                        <p className="font-medium">{booking.flight.seatClass}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Số ghế</p>
                        <p className="font-medium">{booking.seat.number}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thông tin thanh toán */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">Thông tin thanh toán</h2>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Phương thức thanh toán</p>
                        <p className="font-medium">{booking.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tổng tiền</p>
                        <p className="font-medium text-lg text-primary-600">
                          {booking.totalAmount.toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-600 mt-8">
                  <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
                  <p>Vui lòng đến sân bay trước giờ khởi hành ít nhất 2 giờ</p>
                </div>

                {/* QR Code */}
                <div className="text-center mt-4">
                  <div className="inline-block p-2 bg-white border border-gray-200">
                    {/* Thay thế bằng QR code thực tế */}
                    <div className="w-32 h-32 bg-gray-100 flex items-center justify-center">
                      QR Code
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end space-x-4">
              <Button onClick={() => setShowPreview(false)}>
                Đóng
              </Button>
              <Button onClick={handlePrint}>
                In vé
              </Button>
              <Button onClick={handleExportPDF}>
                Tải PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 