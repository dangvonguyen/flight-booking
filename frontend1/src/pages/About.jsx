import { useState } from 'react'

const teamMembers = [
  {
    name: 'Nguyễn Văn A',
    position: 'Giám đốc điều hành',
    image: '/images/team/ceo.jpg',
    bio: 'Với hơn 15 năm kinh nghiệm trong ngành hàng không, ông A đã dẫn dắt công ty phát triển vượt bậc trong những năm qua.'
  },
  {
    name: 'Trần Thị B',
    position: 'Giám đốc kinh doanh',
    image: '/images/team/cmo.jpg',
    bio: 'Bà B có hơn 10 năm kinh nghiệm trong lĩnh vực marketing và phát triển kinh doanh.'
  },
  {
    name: 'Lê Văn C',
    position: 'Giám đốc kỹ thuật',
    image: '/images/team/cto.jpg',
    bio: 'Ông C là chuyên gia trong lĩnh vực công nghệ hàng không và đã đóng góp nhiều sáng kiến cho ngành.'
  }
]

const milestones = [
  {
    year: '2010',
    title: 'Thành lập công ty',
    description: 'Công ty được thành lập với sứ mệnh cung cấp dịch vụ đặt vé máy bay trực tuyến chất lượng cao.'
  },
  {
    year: '2015',
    title: 'Mở rộng thị trường',
    description: 'Mở rộng hoạt động kinh doanh ra toàn quốc và các nước trong khu vực Đông Nam Á.'
  },
  {
    year: '2018',
    title: 'Đổi mới công nghệ',
    description: 'Ứng dụng công nghệ mới vào hệ thống đặt vé, mang lại trải nghiệm tốt hơn cho khách hàng.'
  },
  {
    year: '2020',
    title: 'Đạt chứng nhận ISO',
    description: 'Đạt chứng nhận ISO 9001:2015 về quản lý chất lượng dịch vụ.'
  },
  {
    year: '2023',
    title: 'Phát triển bền vững',
    description: 'Triển khai các chương trình bảo vệ môi trường và phát triển bền vững.'
  }
]

export default function About() {
  const [activeTab, setActiveTab] = useState('about')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-primary-600">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/images/about-hero.jpg"
            alt="About Us"
          />
          <div className="absolute inset-0 bg-primary-600 mix-blend-multiply"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Về chúng tôi
          </h1>
          <p className="mt-6 text-xl text-primary-100 max-w-3xl">
            Chúng tôi là đơn vị hàng đầu trong lĩnh vực đặt vé máy bay trực tuyến,
            cam kết mang đến trải nghiệm đặt vé nhanh chóng, an toàn và tiện lợi cho khách hàng.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('about')}
              className={`${
                activeTab === 'about'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Giới thiệu
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`${
                activeTab === 'team'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Đội ngũ
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`${
                activeTab === 'milestones'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Cột mốc phát triển
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'about' && (
            <div className="prose prose-lg max-w-none">
              <h2>Sứ mệnh của chúng tôi</h2>
              <p>
                Chúng tôi cam kết mang đến dịch vụ đặt vé máy bay trực tuyến chất lượng cao,
                giúp khách hàng dễ dàng tìm kiếm và đặt vé với giá tốt nhất. Chúng tôi luôn
                nỗ lực cải thiện trải nghiệm người dùng và cung cấp dịch vụ chăm sóc khách
                hàng xuất sắc.
              </p>

              <h2>Tầm nhìn</h2>
              <p>
                Trở thành nền tảng đặt vé máy bay trực tuyến hàng đầu tại Việt Nam và khu vực
                Đông Nam Á, được khách hàng tin tưởng và lựa chọn.
              </p>

              <h2>Giá trị cốt lõi</h2>
              <ul>
                <li>
                  <strong>Chất lượng:</strong> Cam kết cung cấp dịch vụ chất lượng cao nhất
                </li>
                <li>
                  <strong>Đổi mới:</strong> Không ngừng cải tiến và áp dụng công nghệ mới
                </li>
                <li>
                  <strong>Tin cậy:</strong> Xây dựng niềm tin với khách hàng thông qua sự
                  minh bạch và trách nhiệm
                </li>
                <li>
                  <strong>Phát triển bền vững:</strong> Đóng góp tích cực cho cộng đồng và
                  môi trường
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-center">
                  <img
                    className="mx-auto h-40 w-40 rounded-full"
                    src={member.image}
                    alt={member.name}
                  />
                  <h3 className="mt-6 text-lg font-medium text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary-600">{member.position}</p>
                  <p className="mt-2 text-base text-gray-500">{member.bio}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'milestones' && (
            <div className="flow-root">
              <ul className="-mb-8">
                {milestones.map((milestone, index) => (
                  <li key={milestone.year}>
                    <div className="relative pb-8">
                      {index !== milestones.length - 1 && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center ring-8 ring-white">
                            <span className="text-white text-sm font-medium">
                              {milestone.year}
                            </span>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              {milestone.title}
                            </p>
                            <p className="mt-0.5 text-sm text-gray-900">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 