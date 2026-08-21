/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static Export 설정 (서버 트래픽 과부하 방지)
  images: {
    unoptimized: true, // Static Export 시 이미지 최적화 경고 방지
  },
};

module.exports = nextConfig;