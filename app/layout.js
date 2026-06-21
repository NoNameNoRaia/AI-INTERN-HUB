import "./globals.css";

export const metadata = {
  title: "AI INTERN HUB - Nền tảng kết nối Sinh viên – Doanh nghiệp – AI Phỏng vấn",
  description: "Nền tảng kết nối Sinh viên – Doanh nghiệp – AI Phỏng vấn, giúp sinh viên tìm thực tập, tạo CV và phỏng vấn thử bằng Trí Tuệ Nhân Tạo.",
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
