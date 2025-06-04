import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function PaymentProcess() {
  const location = useLocation()
  const navigate = useNavigate()
  const { flight, seatClass, passengerInfo, paymentMethod, cardInfo, selectedSeat, searchParams } = location.state || {}

  const [status, setStatus] = useState('processing')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!flight || !passengerInfo) {
      navigate('/')
      return
    }
    // Simulate payment processing
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setStatus('success')
          return 100
        }
        return prev + 10
      })
    }, 500)
    return () => clearInterval(timer)
  }, [flight, passengerInfo, navigate])

  if (!flight || !passengerInfo) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {status === 'processing' ? 'Đang xử lý thanh toán' : 'Thanh toán thành công'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {status === 'processing' 
              ? 'Vui lòng đợi trong giây lát...'
              : 'Cảm ơn bạn đã đặt vé với chúng tôi'}
          </p>
        </div>

        {status === 'processing' && (
          <div className="mt-8">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-500"
                ></div>
              </div>
              <div className="text-center text-sm text-gray-600">
                {progress}%
              </div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="mt-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Thông tin đặt vé
                </h3>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Hành khách</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {passengerInfo.firstName} {passengerInfo.lastName}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Chuyến bay</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {flight.airline} - {flight.flightNumber}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Hành trình</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {flight.from.city} → {flight.to.city}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Thời gian</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {flight.from.time} - {flight.to.time} ({flight.from.date})
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Hạng vé</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {seatClass === 'economy' ? 'Phổ thông' : seatClass === 'business' ? 'Thương gia' : 'Hạng nhất'}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Ghế</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {selectedSeat?.number}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Phương thức thanh toán</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {paymentMethod === 'credit-card' ? 'Thẻ tín dụng/ghi nợ' : paymentMethod === 'momo' ? 'Ví MoMo' : paymentMethod === 'zalopay' ? 'ZaloPay' : 'Chuyển khoản ngân hàng'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Về trang chủ
              </button>
              <button
                onClick={() => navigate('/bookings')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Xem đặt vé của tôi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 