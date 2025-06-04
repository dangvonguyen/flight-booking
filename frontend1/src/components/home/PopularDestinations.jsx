import { Link } from 'react-router-dom'

const destinations = [
  {
    id: 1,
    name: 'Hà Nội',
    image: '/images/destinations/hanoi.jpg',
    description: 'Thủ đô nghìn năm văn hiến',
    price: '1.200.000',
  },
  {
    id: 2,
    name: 'TP. Hồ Chí Minh',
    image: '/images/destinations/hcm.jpg',
    description: 'Thành phố không ngủ',
    price: '1.500.000',
  },
  {
    id: 3,
    name: 'Đà Nẵng',
    image: '/images/destinations/danang.jpg',
    description: 'Thành phố đáng sống',
    price: '1.800.000',
  },
  {
    id: 4,
    name: 'Nha Trang',
    image: '/images/destinations/nhatrang.jpg',
    description: 'Thiên đường biển đảo',
    price: '2.000.000',
  },
]

export default function PopularDestinations() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Điểm đến phổ biến
          </h2>
          <p className="text-lg text-gray-600">
            Khám phá những điểm đến hấp dẫn nhất Việt Nam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              to={`/search?to=${destination.name}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {destination.name}
                    </h3>
                    <p className="text-gray-200 mb-2">{destination.description}</p>
                    <p className="text-white font-semibold">
                      Từ {destination.price}đ
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 