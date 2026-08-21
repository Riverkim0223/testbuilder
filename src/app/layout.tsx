import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const inter = Inter({ subsets: ['latin'] });

// 👇 여기부터 메타 태그 설정 부분입니다!
export const metadata: Metadata = {
metadataBase: new URL('https://reels-fit-test.vercel.app'), // 💡 나중에 Vercel 배포 후 발급받은 링크로 수정해주세요!

  title: '나만의 릴스 성향 테스트 🎬',
  description: '내 찰떡 인스타 릴스 챌린지는 무엇일까? 지금 바로 확인해보세요!',
  openGraph: {
    title: '나만의 릴스 성향 테스트 🎬',
    description: '내 찰떡 릴스 챌린지는 무엇일까? 지금 바로 확인해보세요!',
    url: 'https://배포될-내-사이트-주소.vercel.app', // 💡 나중에 Vercel 배포 후 발급받은 링크로 수정해주세요!
    siteName: '릴스 성향 테스트',
    images: [
      {
        url: '/og-image.png', // public 폴더에 넣은 이미지 파일명
        width: 1200,
        height: 630,
        alt: '릴스 성향 테스트 썸네일',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
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