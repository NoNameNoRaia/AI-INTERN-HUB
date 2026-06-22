export default function sitemap() {
  const baseUrl = "https://aiinternhub.27netteam.top";
  
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/auth`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ai-phong-van`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tao-cv-chuyen-nghiep`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/thuc-tap-sinh-vien`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tuyen-dung-doanh-nghiep`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ];
}
