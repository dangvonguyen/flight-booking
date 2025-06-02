# Flight Booking Frontend

Ứng dụng đặt vé máy bay được xây dựng bằng React, TypeScript và Tailwind CSS.

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd flight-booking/frontend
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file .env và cấu hình các biến môi trường:
```bash
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_VNPAY_RETURN_URL=http://localhost:3000/payment/callback
REACT_APP_VNPAY_TMN_CODE=YOUR_VNPAY_TMN_CODE
REACT_APP_VNPAY_HASH_SECRET=YOUR_VNPAY_HASH_SECRET
```

## Phát triển

Chạy ứng dụng ở môi trường development:

```bash
npm run dev
```

## Build

Build ứng dụng cho production:

```bash
npm run build
```

## Cấu trúc thư mục

```
src/
  ├── components/     # Các components tái sử dụng
  ├── pages/         # Các trang của ứng dụng
  ├── services/      # Các service gọi API
  ├── types/         # TypeScript types và interfaces
  ├── utils/         # Các hàm tiện ích
  ├── App.tsx        # Component gốc
  └── main.tsx       # Entry point
```

## Tính năng

- Tìm kiếm chuyến bay
- Đặt vé
- Thanh toán qua VNPay
- Quản lý vé đã đặt
- Xem và tải vé PDF
- Responsive design
- Form validation
- Loading và error states
- Authentication

## Công nghệ sử dụng

- React 18
- TypeScript
- Tailwind CSS
- React Router
- React Hook Form
- Axios
- React-PDF
- QRCode.react
