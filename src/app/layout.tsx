import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const siteUrl = 'https://reels-fit.vercel.app';
export const ogImageUrl = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '나만의 릴스 성향 테스트 🎬',
  description: '12개 질문으로 나의 숏폼 성향을 분석하고, 찰떡 릴스 챌린지를 추천받아보세요!',
  keywords: ['릴스', '인스타그램', '챌린지', '성향 테스트', '숏폼', '릴스 추천'],
  openGraph: {
    title: '나만의 릴스 성향 테스트 🎬',
    description: '12개 질문으로 나의 숏폼 성향을 분석하고, 찰떡 릴스 챌린지를 추천받아보세요!',
    url: siteUrl,
    siteName: '릴스 성향 테스트',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: '릴스 성향 테스트 — 찰떡 챌린지 추천',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '나만의 릴스 성향 테스트 🎬',
    description: '12개 질문으로 찰떡 릴스 챌린지를 찾아보세요!',
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
