export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'], // Chặn index các trang nội bộ hoặc api
    },
    sitemap: 'https://ai-intern-hub.com/sitemap.xml',
  }
}
