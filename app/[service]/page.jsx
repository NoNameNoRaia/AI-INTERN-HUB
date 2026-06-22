import { notFound } from 'next/navigation';
import Home from '../page'; // The main client component

const seoData = {
  'ai-phong-van': {
    title: 'Phỏng vấn thử cùng AI - Đánh giá năng lực chuẩn xác | AI Intern Hub',
    description: 'Trải nghiệm hệ thống AI phỏng vấn độc quyền. Đánh giá năng lực thực tế, nhận phản hồi ngay lập tức để tự tin chinh phục nhà tuyển dụng.',
  },
  'tao-cv-chuyen-nghiep': {
    title: 'Tạo CV Chuyên Nghiệp bằng AI - Nổi bật hồ sơ của bạn | AI Intern Hub',
    description: 'Công cụ tạo CV thông minh bằng Trí tuệ nhân tạo. Tự động gợi ý kỹ năng, chuẩn hóa định dạng giúp bạn vượt qua vòng lọc hồ sơ (ATS) dễ dàng.',
  },
  'thuc-tap-sinh-vien': {
    title: 'Tìm Kiếm Cơ Hội Thực Tập Cho Sinh Viên | AI Intern Hub',
    description: 'Hàng ngàn cơ hội thực tập hấp dẫn từ các doanh nghiệp hàng đầu. Kết nối trực tiếp, ứng tuyển nhanh chóng thông qua AI Intern Hub.',
  },
  'tuyen-dung-doanh-nghiep': {
    title: 'Tuyển Dụng Nhân Sự & Sinh Viên Thực Tập | AI Intern Hub',
    description: 'Giải pháp tuyển dụng tối ưu cho doanh nghiệp. Hệ thống AI matching giúp tìm kiếm và sàng lọc ứng viên phù hợp nhất với yêu cầu công việc.',
  }
};

// Generate dynamic metadata for SEO
export function generateMetadata({ params }) {
  const service = params.service;
  const data = seoData[service];
  
  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://aiinternhub.27netteam.top/${service}`,
    }
  };
}

export default function ServicePage({ params }) {
  const service = params.service;
  
  // If the URL slug doesn't match our specific SEO targets, throw 404
  if (!seoData[service]) {
    notFound();
  }

  // Render the exact same Home component but with boosted SEO context
  return <Home />;
}
