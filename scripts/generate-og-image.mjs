import sharp from 'sharp';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../public/og-image.png');

const W = 1200;
const H = 630;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff8fc"/>
      <stop offset="55%" stop-color="#faf5ff"/>
      <stop offset="100%" stop-color="#f4fbff"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff6eb4"/>
      <stop offset="100%" stop-color="#9b7bff"/>
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff8ec8"/>
      <stop offset="100%" stop-color="#7c6cf0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- soft blobs -->
  <circle cx="150" cy="120" r="180" fill="#ffd6eb" opacity="0.45"/>
  <circle cx="1050" cy="520" r="200" fill="#d6ebff" opacity="0.5"/>
  <circle cx="900" cy="100" r="120" fill="#ede4ff" opacity="0.55"/>

  <!-- left copy -->
  <rect x="72" y="68" width="188" height="40" rx="20" fill="#ffe8f3" stroke="#ffcce5" stroke-width="2"/>
  <text x="166" y="94" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="14" font-weight="900" fill="#e85aab" letter-spacing="1.5">REELS FIT TEST</text>

  <text x="72" y="175" font-family="Malgun Gothic, Apple SD Gothic Neo, sans-serif" font-size="56" font-weight="800" fill="#4a3560">나만의 릴스</text>
  <text x="72" y="245" font-family="Malgun Gothic, Apple SD Gothic Neo, sans-serif" font-size="56" font-weight="800" fill="#4a3560">성향 테스트</text>

  <text x="72" y="300" font-family="Malgun Gothic, sans-serif" font-size="24" font-weight="600" fill="#7a7190">12문항 · 8가지 유형 · 찰떡 챌린지 추천</text>

  <!-- 8 types row -->
  <g font-size="36">
    <circle cx="108" cy="380" r="34" fill="#ffe8f3" stroke="#ffcce5" stroke-width="2"/>
    <text x="108" y="392" text-anchor="middle">🐾</text>
    <circle cx="188" cy="380" r="34" fill="#ffe5e5" stroke="#ffcccc" stroke-width="2"/>
    <text x="188" y="392" text-anchor="middle">🔥</text>
    <circle cx="268" cy="380" r="34" fill="#fff8d6" stroke="#ffeeb8" stroke-width="2"/>
    <text x="268" y="392" text-anchor="middle">😎</text>
    <circle cx="348" cy="380" r="34" fill="#e5faf2" stroke="#c8f0de" stroke-width="2"/>
    <text x="348" y="392" text-anchor="middle">🎬</text>
    <circle cx="428" cy="380" r="34" fill="#f0ebff" stroke="#ddd4ff" stroke-width="2"/>
    <text x="428" y="392" text-anchor="middle">🎭</text>
    <circle cx="508" cy="380" r="34" fill="#e8f4ff" stroke="#c8e4ff" stroke-width="2"/>
    <text x="508" y="392" text-anchor="middle">🎧</text>
    <circle cx="588" cy="380" r="34" fill="#fff0e8" stroke="#ffdcc8" stroke-width="2"/>
    <text x="588" y="392" text-anchor="middle">🎉</text>
    <circle cx="668" cy="380" r="34" fill="#f5f5ee" stroke="#e8e8dc" stroke-width="2"/>
    <text x="668" y="392" text-anchor="middle">🌿</text>
  </g>
  <text x="72" y="445" font-family="Malgun Gothic, sans-serif" font-size="15" font-weight="600" fill="#9b93ad">8가지 릴스 성향 유형 중 나의 찰떡 타입을 찾아보세요</text>

  <text x="72" y="580" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#b0a8c0">reels-fit.vercel.app</text>

  <!-- right: result card (not phone UI) -->
  <rect x="760" y="90" width="360" height="450" rx="32" fill="#ffffff" stroke="#f0e6f5" stroke-width="3"/>
  <rect x="760" y="90" width="360" height="130" rx="32" fill="url(#card)"/>
  <rect x="760" y="188" width="360" height="32" fill="url(#card)"/>

  <text x="940" y="155" text-anchor="middle" font-size="64">💃</text>
  <text x="940" y="210" text-anchor="middle" font-family="Malgun Gothic, sans-serif" font-size="22" font-weight="800" fill="#ffffff">파워 퍼포머형</text>

  <text x="940" y="280" text-anchor="middle" font-family="Malgun Gothic, sans-serif" font-size="16" font-weight="700" fill="#7a7190">나의 릴스 성향 유형</text>
  <text x="940" y="315" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="42" font-weight="900" fill="#e85aab">92%</text>
  <text x="940" y="345" text-anchor="middle" font-family="Malgun Gothic, sans-serif" font-size="14" font-weight="600" fill="#9b93ad">매칭</text>

  <rect x="810" y="375" width="260" height="56" rx="16" fill="#fff8fc" stroke="#ffd9eb" stroke-width="2"/>
  <text x="830" y="410" font-family="Malgun Gothic, sans-serif" font-size="28">🦁</text>
  <text x="870" y="395" font-family="Malgun Gothic, sans-serif" font-size="14" font-weight="700" fill="#5c5470">Animal 댄스 챌린지</text>
  <text x="870" y="418" font-family="Malgun Gothic, sans-serif" font-size="12" font-weight="600" fill="#e85aab">찰떡 추천 · 88% 매칭</text>

  <rect x="810" y="450" width="260" height="44" rx="22" fill="url(#accent)"/>
  <text x="940" y="478" text-anchor="middle" font-family="Malgun Gothic, sans-serif" font-size="15" font-weight="800" fill="#ffffff">지금 바로 테스트하기 →</text>

  <!-- decorative -->
  <text x="730" y="130" font-size="40" opacity="0.9">✨</text>
  <text x="1140" y="480" font-size="36" opacity="0.85">🎵</text>
  <text x="1120" y="140" font-size="32" opacity="0.8">🎬</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, quality: 90 })
  .toFile(outPath);

console.log(`OG image saved: ${outPath}`);
