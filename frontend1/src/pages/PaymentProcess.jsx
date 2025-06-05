import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { mockBookingData } from '../data/mockPaymentData'

export default function PaymentProcess() {
  const location = useLocation()
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(true)
  const [countdown, setCountdown] = useState(3)
  const [animationStep, setAnimationStep] = useState(0) // 0: processing, 1: validating, 2: confirming, 3: success

  // Use mock data if no real data is available - ALWAYS use mock data for testing
  const {
    bookingId = mockBookingData.bookingId,
    flight = mockBookingData.flightDetails,
    passengerInfo = mockBookingData.passengerInfo,
    paymentMethod = mockBookingData.paymentMethod,
    selectedSeat = mockBookingData.selectedSeat,
    departureAirport = mockBookingData.departureAirport,
    arrivalAirport = mockBookingData.arrivalAirport,
    totalAmount = mockBookingData.totalAmount
  } = location.state || mockBookingData

  useEffect(() => {
    // Animation sequence for processing steps
    const processSteps = [
      { step: 0, duration: 2000, text: 'Đang xử lý thanh toán...' },
      { step: 1, duration: 1500, text: 'Đang xác thực giao dịch...' },
      { step: 2, duration: 1000, text: 'Đang xác nhận đặt vé...' },
      { step: 3, duration: 500, text: 'Hoàn thành!' }
    ]

    let currentStepIndex = 0

    const runNextStep = () => {
      if (currentStepIndex < processSteps.length) {
        const currentStep = processSteps[currentStepIndex]
        setAnimationStep(currentStep.step)
        
        setTimeout(() => {
          currentStepIndex++
          if (currentStepIndex < processSteps.length) {
            runNextStep()
          } else {
            // All steps completed, show success
            setProcessing(false)
            
            // Start countdown
            const countdownTimer = setInterval(() => {
              setCountdown(prev => {
                if (prev <= 1) {
                  clearInterval(countdownTimer)
                  navigate('/payment-success', {
                    state: {
                      bookingId,
                      flight,
                      passengerInfo,
                      selectedSeat,
                      paymentMethod,
                      departureAirport,
                      arrivalAirport,
                      totalAmount,
                      bookingDate: new Date().toISOString()
                    }
                  })
                  return 0
                }
                return prev - 1
              })
            }, 1000)
          }
        }, currentStep.duration)
      }
    }

    runNextStep()
  }, [flight, passengerInfo, navigate, bookingId, selectedSeat, paymentMethod, departureAirport, arrivalAirport, totalAmount])

  const getPaymentMethodName = (method) => {
    const methods = {
      'vnpay': 'VNPay',
      'credit-card': 'Thẻ tín dụng',
      'momo': 'MoMo',
      'zalopay': 'ZaloPay',
      'bank-transfer': 'Chuyển khoản ngân hàng',
      'paypal': 'PayPal'
    }
    return methods[method] || method
  }

  const getStepText = () => {
    const steps = [
      'Đang xử lý thanh toán...',
      'Đang xác thực giao dịch...',
      'Đang xác nhận đặt vé...',
      'Hoàn thành!'
    ]
    return steps[animationStep] || steps[0]
  }

  const getStepIcon = () => {
    if (animationStep < 3) {
      return (
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent mx-auto"></div>
      )
    }
    return (
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <Card.Body className="text-center py-16">
              {processing ? (
                <div className="animate-fadeIn">
                  <div className="mb-8">
                    {getStepIcon()}
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {getStepText()}
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Vui lòng đợi trong giây lát. Đừng đóng trang web này.
                  </p>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${((animationStep + 1) / 4) * 100}%` }}
                    ></div>
                  </div>

                  {/* Simple payment info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 inline-block">
                    <div className="flex items-center justify-center space-x-6 text-sm text-blue-800">
                      <div className="text-center">
                        <div className="font-mono text-lg">{bookingId}</div>
                        <div className="text-xs text-blue-600">Mã đặt vé</div>
                      </div>
                      <div className="w-px h-8 bg-blue-300"></div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{totalAmount?.toLocaleString('vi-VN')}đ</div>
                        <div className="text-xs text-blue-600">Tổng tiền</div>
                      </div>
                      <div className="w-px h-8 bg-blue-300"></div>
                      <div className="text-center">
                        <div className="text-lg">{getPaymentMethodName(paymentMethod)}</div>
                        <div className="text-xs text-blue-600">Phương thức</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <div className="mb-8">
                    {getStepIcon()}
                  </div>
                  <h2 className="text-3xl font-bold text-green-600 mb-4">
                    Thanh toán thành công! 🎉
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Vé máy bay đã được đặt thành công.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 inline-block">
                    <p className="text-green-800 text-sm font-medium">
                      Bạn sẽ được chuyển đến trang thành công trong {countdown} giây...
                    </p>
                  </div>
                  <Button 
                    onClick={() => navigate('/payment-success', {
                      state: {
                        bookingId,
                        flight,
                        passengerInfo,
                        selectedSeat,
                        paymentMethod,
                        departureAirport,
                        arrivalAirport,
                        totalAmount,
                        bookingDate: new Date().toISOString()
                      }
                    })}
                    className="w-full max-w-xs animate-pulse"
                  >
                    Xem vé máy bay ngay
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
} 