import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const cities = [
  { code: 'HAN', name: 'Hà Nội' },
  { code: 'SGN', name: 'TP. Hồ Chí Minh' },
  { code: 'DAD', name: 'Đà Nẵng' },
  { code: 'CXR', name: 'Nha Trang' },
]

export default function Search() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
    type: 'one-way',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/search/results', {
      state: { searchParams },
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Tìm kiếm chuyến bay
          </h1>

          <Card>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Loại chuyến bay
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <button
                          type="button"
                          className={`flex-1 px-4 py-2 text-sm font-medium rounded-l-md ${
                            searchParams.type === 'one-way'
                              ? 'bg-primary-600 text-white'
                              : 'bg-white text-gray-700 border border-gray-300'
                          }`}
                          onClick={() =>
                            setSearchParams({ ...searchParams, type: 'one-way' })
                          }
                        >
                          Một chiều
                        </button>
                        <button
                          type="button"
                          className={`flex-1 px-4 py-2 text-sm font-medium rounded-r-md ${
                            searchParams.type === 'round-trip'
                              ? 'bg-primary-600 text-white'
                              : 'bg-white text-gray-700 border border-gray-300'
                          }`}
                          onClick={() =>
                            setSearchParams({ ...searchParams, type: 'round-trip' })
                          }
                        >
                          Khứ hồi
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Điểm đi
                      </label>
                      <select
                        value={searchParams.from}
                        onChange={(e) =>
                          setSearchParams({ ...searchParams, from: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        required
                      >
                        <option value="">Chọn thành phố</option>
                        {cities.map((city) => (
                          <option key={city.code} value={city.code}>
                            {city.name} ({city.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Điểm đến
                      </label>
                      <select
                        value={searchParams.to}
                        onChange={(e) =>
                          setSearchParams({ ...searchParams, to: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        required
                      >
                        <option value="">Chọn thành phố</option>
                        {cities
                          .filter((city) => city.code !== searchParams.from)
                          .map((city) => (
                            <option key={city.code} value={city.code}>
                              {city.name} ({city.code})
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Ngày đi
                      </label>
                      <Input
                        type="date"
                        value={searchParams.date}
                        onChange={(e) =>
                          setSearchParams({ ...searchParams, date: e.target.value })
                        }
                        required
                      />
                    </div>

                    {searchParams.type === 'round-trip' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Ngày về
                        </label>
                        <Input
                          type="date"
                          value={searchParams.returnDate}
                          onChange={(e) =>
                            setSearchParams({
                              ...searchParams,
                              returnDate: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Số hành khách
                    </label>
                    <select
                      value={searchParams.passengers}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          passengers: parseInt(e.target.value),
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <option key={num} value={num}>
                          {num} hành khách
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Button type="submit" className="w-full">
                      Tìm kiếm
                    </Button>
                  </div>
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
} 