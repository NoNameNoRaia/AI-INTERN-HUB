export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'], // Chặn index các trang nội bộ hoặc api
    },
    sitemap: 'https://aiinternhub.27netteam.top/sitemap.xml',
  }
}
