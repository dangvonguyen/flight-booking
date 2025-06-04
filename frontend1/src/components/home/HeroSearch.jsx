import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaUserFriends, FaExchangeAlt } from 'react-icons/fa'
import Button from '../ui/Button'
import { mockFlights } from '../../mocks/flightData'

// Lấy danh sách unique thành phố (city + code) từ mockFlights
const cityOptions = Array.from(
  new Map(
    [
      ...mockFlights.map(f => ({ city: f.from.city, code: f.from.code })),
      ...mockFlights.map(f => ({ city: f.to.city, code: f.to.code }))
    ].map(item => [item.code, item])
  ).values()
)

export default function HeroSearch() {
  const navigate = useNavigate()
  const [searchType, setSearchType] = useState('round-trip')
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/search-results', {
      state: {
        searchParams: {
          ...formData,
          type: searchType
        }
      }
    })
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-500 via-primary-600 to-purple-600 py-20 px-2">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow mb-4">
          Đặt vé máy bay <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">giá tốt</span> nhất
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-medium mb-2">
          So sánh, săn vé rẻ từ hàng trăm hãng hàng không chỉ với 1 lần tìm kiếm
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative z-10 max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col gap-6"
      >
        <div className="flex justify-center gap-4 mb-2">
          <button
            type="button"
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-base transition shadow-sm border-2 ${
              searchType === 'round-trip'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-primary-700 border-gray-200 hover:border-primary-400'
            }`}
            onClick={() => setSearchType('round-trip')}
          >
            <FaExchangeAlt /> Khứ hồi
          </button>
          <button
            type="button"
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-base transition shadow-sm border-2 ${
              searchType === 'one-way'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-primary-700 border-gray-200 hover:border-primary-400'
            }`}
            onClick={() => setSearchType('one-way')}
          >
            <FaPlaneDeparture /> Một chiều
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <FaPlaneDeparture className="text-primary-500" /> Điểm đi
            </label>
            <input
              type="text"
              list="from-cities"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition shadow-sm"
              placeholder="Chọn thành phố đi"
              value={formData.from}
              onChange={e => setFormData({ ...formData, from: e.target.value })}
              required
            />
            <datalist id="from-cities">
              {cityOptions.map(opt => (
                <option key={opt.code} value={opt.code}>
                  {opt.city} ({opt.code})
                </option>
              ))}
            </datalist>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <FaPlaneArrival className="text-primary-500" /> Điểm đến
            </label>
            <input
              type="text"
              list="to-cities"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition shadow-sm"
              placeholder="Chọn thành phố đến"
              value={formData.to}
              onChange={e => setFormData({ ...formData, to: e.target.value })}
              required
            />
            <datalist id="to-cities">
              {cityOptions.map(opt => (
                <option key={opt.code} value={opt.code}>
                  {opt.city} ({opt.code})
                </option>
              ))}
            </datalist>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <FaCalendarAlt className="text-primary-500" /> Ngày đi
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition shadow-sm"
              value={formData.departureDate}
              onChange={e => setFormData({ ...formData, departureDate: e.target.value })}
              required
            />
          </div>
          {searchType === 'round-trip' && (
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700 flex items-center gap-2">
                <FaCalendarAlt className="text-primary-500" /> Ngày về
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition shadow-sm"
                value={formData.returnDate}
                onChange={e => setFormData({ ...formData, returnDate: e.target.value })}
                required
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <FaUserFriends className="text-primary-500" /> Số hành khách
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition shadow-sm"
              value={formData.passengers}
              onChange={e => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <option key={num} value={num}>{num} hành khách</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700 flex items-center gap-2">
              Hạng ghế
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition shadow-sm"
              value={formData.class}
              onChange={e => setFormData({ ...formData, class: e.target.value })}
            >
              <option value="economy">Phổ thông</option>
              <option value="business">Thương gia</option>
              <option value="first">Hạng nhất</option>
            </select>
          </div>
        </div>
        <div className="pt-4 flex justify-center">
          <Button
            type="submit"
            className="w-full md:w-auto px-10 py-3 text-lg rounded-full font-bold shadow-lg bg-gradient-to-r from-primary-600 to-blue-500 hover:from-blue-600 hover:to-primary-700 transition"
          >
            Tìm chuyến bay
          </Button>
        </div>
      </form>
    </section>
  )
} 