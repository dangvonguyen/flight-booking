import { Link } from 'react-router-dom'

const offers = [
  {
    id: 1,
    title: 'Ưu đãi mùa hè',
    description: 'Giảm giá lên đến 50% cho các chuyến bay nội địa',
    image: '/images/offers/summer.jpg',
    validUntil: '31/08/2024',
    code: 'SUMMER2024',
  },
  {
    id: 2,
    title: 'Combo gia đình',
    description: 'Mua 2 tặng 1 cho nhóm từ 3 người trở lên',
    image: '/images/offers/family.jpg',
    validUntil: '30/09/2024',
    code: 'FAMILY2024',
  },
  {
    id: 3,
    title: 'Ưu đãi sinh nhật',
    description: 'Giảm 20% cho chuyến bay trong tháng sinh nhật',
    image: '/images/offers/birthday.jpg',
    validUntil: '31/12/2024',
    code: 'BIRTHDAY2024',
  },
]

export default function SpecialOffers() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ưu đãi đặc biệt
          </h2>
          <p className="text-lg text-gray-600">
            Khám phá các chương trình khuyến mãi hấp dẫn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                  Mã: {offer.code}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Áp dụng đến: {offer.validUntil}
                  </span>
                  <Link
                    to="/search"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Xem chi tiết →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 