import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://aiinternhub.27netteam.top"),
  title: "AI INTERN HUB - Nền tảng kết nối Sinh viên – Doanh nghiệp – AI Phỏng vấn",
  description: "Nền tảng kết nối Sinh viên – Doanh nghiệp – AI Phỏng vấn, giúp sinh viên tìm thực tập, tạo CV và phỏng vấn thử bằng Trí Tuệ Nhân Tạo.",
  keywords: ["thực tập", "sinh viên", "doanh nghiệp", "AI phỏng vấn", "tạo CV", "việc làm", "AI Intern Hub"],
  authors: [{ name: "AI Intern Hub" }],
  openGraph: {
    title: "AI INTERN HUB - Nền tảng kết nối Sinh viên – Doanh nghiệp – AI Phỏng vấn",
    description: "Nền tảng giúp sinh viên tìm kiếm cơ hội thực tập, tạo CV chuyên nghiệp và trải nghiệm hệ thống phỏng vấn giả lập bằng AI tiên tiến nhất.",
    url: "https://aiinternhub.27netteam.top",
    siteName: "AI Intern Hub",
    images: [
      {
        url: "/images/thurm.png",
        width: 1200,
        height: 630,
        alt: "AI INTERN HUB Thumbnail",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI INTERN HUB - Nền tảng kết nối Sinh viên – Doanh nghiệp – AI Phỏng vấn",
    description: "Khám phá cơ hội thực tập và chuẩn bị tương lai nghề nghiệp cùng AI Intern Hub.",
    images: ["/images/thurm.png"],
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&family=JetBrains+Mono:wght@400&family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
