import { useRef, useState } from 'react'
import Button from '../ui/Button'

export default function TicketPrint({ booking, onClose }) {
  const ticketRef = useRef()
  const [showPreview, setShowPreview] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)

  // Browser print method
  const handlePrintPDF = () => {
    setIsPrinting(true)
    try {
      // Open preview first
      setShowPreview(true)
      
      // Wait a bit for modal to render, then trigger print
      setTimeout(() => {
        const printWindow = window.open('', '_blank')
        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>Vé máy bay - ${booking.bookingCode}</title>
              <meta charset="utf-8">
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                  font-family: Arial, sans-serif; 
                  background: white;
                  color: #000;
                  line-height: 1.5;
                }
                .ticket-container {
                  max-width: 800px;
                  margin: 20px auto;
                  padding: 20px;
                  background: white;
                  border: 2px solid #ccc;
                  border-radius: 8px;
                }
                .text-center { text-align: center; }
                .font-bold { font-weight: bold; }
                .text-primary { color: #3b82f6; }
                .text-gray-600 { color: #6b7280; }
                .text-gray-900 { color: #111827; }
                .mb-8 { margin-bottom: 32px; }
                .mb-6 { margin-bottom: 24px; }
                .mb-4 { margin-bottom: 16px; }
                .mb-2 { margin-bottom: 8px; }
                .grid { display: grid; }
                .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
                .gap-8 { gap: 32px; }
                .flex { display: flex; }
                .justify-between { justify-content: space-between; }
                .items-center { align-items: center; }
                .bg-gray-50 { background-color: #f9fafb; }
                .bg-primary-50 { background-color: #eff6ff; }
                .p-6 { padding: 24px; }
                .rounded-lg { border-radius: 8px; }
                .border-t-2 { border-top-width: 2px; }
                .border-gray-200 { border-color: #e5e7eb; }
                .pt-6 { padding-top: 24px; }
                @media print {
                  body { print-color-adjust: exact; }
                  .ticket-container { 
                    box-shadow: none; 
                    border: 1px solid #000;
                    page-break-inside: avoid;
                  }
                }
              </style>
            </head>
            <body>
              <div class="ticket-container">
                ${generateTicketHTML()}
              </div>
            </body>
            </html>
          `)
          
          printWindow.document.close()
          printWindow.focus()
          
          // Auto print
          setTimeout(() => {
            printWindow.print()
            printWindow.close()
            setShowPreview(false)
            setIsPrinting(false)
          }, 500)
        } else {
          alert('❌ Không thể mở cửa sổ in. Vui lòng kiểm tra popup blocker!')
          setIsPrinting(false)
        }
      }, 300)
      
    } catch (error) {
      console.error('Print PDF error:', error)
      alert('❌ Có lỗi xảy ra khi in PDF!')
      setIsPrinting(false)
    }
  }

  // Generate clean HTML for ticket
  const generateTicketHTML = () => {
    return `
      <div class="text-center mb-8">
        <h1 class="font-bold text-primary" style="font-size: 24px; color: #3b82f6; margin-bottom: 8px;">
          VÉ MÁY BAY ĐIỆN TỬ
        </h1>
        <p class="text-gray-600" style="margin-bottom: 16px;">E-TICKET</p>
        <div style="background: #eff6ff; padding: 8px 16px; border-radius: 8px; display: inline-block;">
          <p style="color: #1e40af; font-family: monospace; font-weight: bold; font-size: 18px;">
            ${booking.bookingCode}
          </p>
        </div>
      </div>

      <div class="mb-8">
        <div style="display: flex; justify-content: space-between; align-items: center; text-align: center;">
          <div style="flex: 1;">
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 4px;">Điểm đi</p>
            <p style="font-size: 24px; font-weight: bold; margin-bottom: 4px;">${booking.flight.from.code}</p>
            <p style="color: #6b7280; font-size: 14px;">${booking.flight.from.city}</p>
          </div>
          <div style="flex: 1; text-align: center;">
            <p style="color: #6b7280; font-size: 14px;">✈️ ${booking.flight.duration}</p>
          </div>
          <div style="flex: 1;">
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 4px;">Điểm đến</p>
            <p style="font-size: 24px; font-weight: bold; margin-bottom: 4px;">${booking.flight.to.code}</p>
            <p style="color: #6b7280; font-size: 14px;">${booking.flight.to.city}</p>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 32px;">
        <div style="background: #f9fafb; padding: 24px; border-radius: 8px;">
          <h2 style="font-weight: bold; margin-bottom: 16px; color: #3b82f6;">👤 Thông tin hành khách</h2>
          <div style="margin-bottom: 12px;">
            <span style="color: #6b7280;">Họ và tên:</span>
            <span style="font-weight: bold; float: right;">${booking.passenger.firstName} ${booking.passenger.lastName}</span>
            <div style="clear: both;"></div>
          </div>
          <div style="margin-bottom: 12px;">
            <span style="color: #6b7280;">Email:</span>
            <span style="font-weight: 500; float: right;">${booking.passenger.email}</span>
            <div style="clear: both;"></div>
          </div>
          <div>
            <span style="color: #6b7280;">Số điện thoại:</span>
            <span style="font-weight: 500; float: right;">${booking.passenger.phone}</span>
            <div style="clear: both;"></div>
          </div>
        </div>

        <div style="background: #f9fafb; padding: 24px; border-radius: 8px;">
          <h2 style="font-weight: bold; margin-bottom: 16px; color: #3b82f6;">✈️ Chi tiết chuyến bay</h2>
          <div style="margin-bottom: 12px;">
            <span style="color: #6b7280;">Hãng hàng không:</span>
            <span style="font-weight: bold; float: right;">${booking.flight.airline}</span>
            <div style="clear: both;"></div>
          </div>
          <div style="margin-bottom: 12px;">
            <span style="color: #6b7280;">Số hiệu:</span>
            <span style="font-weight: bold; float: right;">${booking.flight.flightNumber}</span>
            <div style="clear: both;"></div>
          </div>
          <div style="margin-bottom: 12px;">
            <span style="color: #6b7280;">Ngày bay:</span>
            <span style="font-weight: bold; float: right;">${new Date(booking.flight.departureTime).toLocaleDateString('vi-VN')}</span>
            <div style="clear: both;"></div>
          </div>
          <div style="margin-bottom: 12px;">
            <span style="color: #6b7280;">Giờ bay:</span>
            <span style="font-weight: bold; float: right;">${new Date(booking.flight.departureTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
            <div style="clear: both;"></div>
          </div>
          <div>
            <span style="color: #6b7280;">Số ghế:</span>
            <span style="font-weight: bold; color: #3b82f6; font-size: 18px; float: right;">${booking.seat.number}</span>
            <div style="clear: both;"></div>
          </div>
        </div>
      </div>

      <div style="background: #eff6ff; padding: 24px; border-radius: 8px; margin-bottom: 32px;">
        <h2 style="font-weight: bold; margin-bottom: 16px; color: #3b82f6;">💳 Thông tin thanh toán</h2>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <p style="color: #6b7280; font-size: 14px;">Phương thức thanh toán</p>
            <p style="font-weight: bold;">${booking.paymentMethod}</p>
          </div>
          <div style="text-align: right;">
            <p style="color: #6b7280; font-size: 14px;">Tổng tiền</p>
            <p style="font-weight: bold; font-size: 24px; color: #3b82f6;">
              ${booking.totalAmount.toLocaleString('vi-VN')}đ
            </p>
          </div>
        </div>
      </div>

      <div style="text-align: center; color: #6b7280; font-size: 14px; border-top: 2px solid #e5e7eb; padding-top: 24px;">
        <p style="margin-bottom: 8px; font-weight: 500;">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
        <p style="margin-bottom: 8px;">Vui lòng đến sân bay trước giờ khởi hành ít nhất 2 giờ</p>
        <p style="color: #3b82f6; font-weight: 500;">Hotline: 1900 1100 | Website: www.flightbooking.vn</p>
      </div>
    `
  }

  return (
    <div className="ticket-print-container">
      {/* Action Buttons - chỉ 2 buttons: Xem trước và In vé */}
      <div className="flex justify-center gap-4 mb-6">
        <Button 
          onClick={() => setShowPreview(true)}
          variant="outline"
          className="flex items-center gap-2 px-6 py-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Xem trước
        </Button>

        <Button 
          onClick={handlePrintPDF}
          disabled={isPrinting}
          className="flex items-center gap-2 px-6 py-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          {isPrinting ? 'Đang in...' : 'In vé'}
        </Button>
      </div>

      {/* Modal xem trước */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Xem trước vé máy bay</h3>
                  <p className="text-sm text-gray-600">Mã đặt vé: {booking.bookingCode}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPreview(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Ticket Content */}
            <div className="p-6">
              <div ref={ticketRef} className="bg-white p-8 max-w-2xl mx-auto border-2 border-gray-200 rounded-lg">
                {/* Header */}
                <div className="text-center mb-8 border-b-2 border-primary-600 pb-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-primary-600">VÉ MÁY BAY ĐIỆN TỬ</h1>
                      <p className="text-gray-600 font-medium">E-TICKET</p>
                    </div>
                  </div>
                  <div className="bg-primary-50 px-4 py-2 rounded-lg inline-block">
                    <p className="text-primary-800 font-mono font-bold text-lg">
                      {booking.bookingCode}
                    </p>
                  </div>
                </div>

                {/* Flight Route */}
                <div className="mb-8">
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Điểm đi</p>
                      <p className="text-2xl font-bold text-gray-900">{booking.flight.from.code}</p>
                      <p className="text-sm text-gray-600 font-medium">{booking.flight.from.city}</p>
                    </div>
                    
                    <div className="flex-1 px-6">
                      <div className="flex items-center">
                        <div className="flex-1 border-t-2 border-dashed border-primary-300"></div>
                        <div className="mx-3 p-3 bg-primary-100 rounded-full">
                          <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </div>
                        <div className="flex-1 border-t-2 border-dashed border-primary-300"></div>
                      </div>
                      <p className="text-center text-sm text-gray-600 mt-2 font-medium">
                        {booking.flight.duration}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Điểm đến</p>
                      <p className="text-2xl font-bold text-gray-900">{booking.flight.to.code}</p>
                      <p className="text-sm text-gray-600 font-medium">{booking.flight.to.city}</p>
                    </div>
                  </div>
                </div>

                {/* Flight & Passenger Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Passenger Info */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Thông tin hành khách
                    </h2>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Họ và tên</p>
                        <p className="font-semibold text-gray-900">
                          {booking.passenger.firstName} {booking.passenger.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">{booking.passenger.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Số điện thoại</p>
                        <p className="font-medium text-gray-900">{booking.passenger.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Flight Details */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Chi tiết chuyến bay
                    </h2>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Hãng hàng không</span>
                        <span className="font-semibold">{booking.flight.airline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Số hiệu</span>
                        <span className="font-semibold">{booking.flight.flightNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Ngày bay</span>
                        <span className="font-semibold">
                          {new Date(booking.flight.departureTime).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Giờ bay</span>
                        <span className="font-semibold">
                          {new Date(booking.flight.departureTime).toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Hạng vé</span>
                        <span className="font-semibold">{booking.flight.seatClass}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Số ghế</span>
                        <span className="font-semibold text-primary-600 text-lg">{booking.seat.number}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-primary-50 p-6 rounded-lg mb-8">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Thông tin thanh toán
                  </h2>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Phương thức thanh toán</p>
                      <p className="font-semibold text-gray-900">{booking.paymentMethod}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Tổng tiền</p>
                      <p className="font-bold text-2xl text-primary-600">
                        {booking.totalAmount.toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  </div>
                </div>



                {/* Footer */}
                <div className="text-center text-sm text-gray-600 border-t-2 border-gray-200 pt-6">
                  <p className="mb-2 font-medium">
                    Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
                  </p>
                  <p className="mb-2">
                    Vui lòng đến sân bay trước giờ khởi hành ít nhất 2 giờ
                  </p>
                  <p className="text-primary-600 font-medium">
                    Hotline: 1900 1100 | Website: www.flightbooking.vn
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Actions - chỉ có button Đóng */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-center rounded-b-xl">
              <Button 
                onClick={() => setShowPreview(false)}
                variant="outline"
                className="flex items-center gap-2 px-8 py-3"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 